import { connectToDatabase } from '@/lib/mongodb';
import Prompt, { IPrompt } from '@/lib/models/Prompt';
import Purchase from '@/lib/models/Purchase';
import Review from '@/lib/models/Review';
import User from '@/lib/models/User';

export class PromptService {
  static async createPrompt(promptData: Partial<IPrompt>): Promise<IPrompt> {
    await connectToDatabase();
    
    const prompt = new Prompt({ ...promptData, status: 'active' });
    const savedPrompt = await prompt.save();
    
    // Update user's prompt count
    await User.updateOne(
      { address: promptData.creator },
      { $inc: { 'stats.prompts': 1 } }
    );
    
    return savedPrompt;
  }

  static async getPromptById(id: string): Promise<IPrompt | null> {
    await connectToDatabase();
    return await Prompt.findById(id).populate('creator');
  }

  static async getAllPrompts(page: number = 1, limit: number = 12, filters: any = {}) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    let query: any = { status: 'active' };
    
    // Apply filters
    if (filters.category && filters.category !== 'All Categories') {
      query.category = filters.category;
    }
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    if (filters.priceRange) {
      query.price = {
        $gte: filters.priceRange.min,
        $lte: filters.priceRange.max === Infinity ? 10000 : filters.priceRange.max
      };
    }
    
    if (filters.search) {
      query.$text = { $search: filters.search };
    }
    
    // Sorting
    let sort: any = {};
    switch (filters.sort) {
      case 'trending':
        sort = { trending: -1, 'stats.purchases': -1 };
        break;
      case 'recent':
        sort = { createdAt: -1 };
        break;
      case 'rating':
        sort = { 'stats.rating': -1 };
        break;
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'popular':
        sort = { 'stats.purchases': -1 };
        break;
      default:
        sort = { trending: -1, 'stats.purchases': -1 };
    }
    
    const prompts = await Prompt.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await Prompt.countDocuments(query);
    
    return {
      prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getTrendingPrompts(limit: number = 10): Promise<IPrompt[]> {
    await connectToDatabase();
    
    return await Prompt.find({ trending: true, status: 'active' })
      .sort({ 'stats.purchases': -1 })
      .limit(limit);
  }

  static async searchPrompts(query: string, page: number = 1, limit: number = 12) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    
    const prompts = await Prompt.find({
      $and: [
        { status: 'active' },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { tags: { $in: [new RegExp(query, 'i')] } }
          ]
        }
      ]
    })
    .sort({ 'stats.rating': -1 })
    .skip(skip)
    .limit(limit);
    
    const total = await Prompt.countDocuments({
      $and: [
        { status: 'active' },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { tags: { $in: [new RegExp(query, 'i')] } }
          ]
        }
      ]
    });
    
    return {
      prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async updatePromptStats(promptId: string, statType: 'views' | 'hearts' | 'purchases', increment: number = 1): Promise<void> {
    await connectToDatabase();
    
    const updateField = `stats.${statType}`;
    await Prompt.updateOne(
      { _id: promptId },
      { $inc: { [updateField]: increment } }
    );
  }

  static async purchasePrompt(buyerAddress: string, promptId: string, transactionHash: string): Promise<any> {
    await connectToDatabase();
    
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      throw new Error('Prompt not found');
    }
    
    const purchase = new Purchase({
      buyer: buyerAddress.toLowerCase(),
      seller: prompt.creator,
      prompt: promptId,
      amount: prompt.price,
      transactionHash,
      status: 'completed'
    });
    
    await purchase.save();
    
    // Update prompt stats
    await this.updatePromptStats(promptId, 'purchases');
    
    // Update seller earnings
    await User.updateOne(
      { address: prompt.creator },
      { $inc: { 'stats.totalEarnings': prompt.price } }
    );
    
    return purchase;
  }

  static async getPromptsByCreator(creatorAddress: string, page: number = 1, limit: number = 12) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    
    const prompts = await Prompt.find({ creator: creatorAddress.toLowerCase() })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Prompt.countDocuments({ creator: creatorAddress.toLowerCase() });
    
    return {
      prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async hasUserPurchased(userAddress: string, promptId: string): Promise<boolean> {
    await connectToDatabase();
    
    const purchase = await Purchase.findOne({
      buyer: userAddress.toLowerCase(),
      prompt: promptId,
      status: 'completed'
    });
    
    return !!purchase;
  }

  static async getPromptReviews(promptId: string, page: number = 1, limit: number = 10) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find({ prompt: promptId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Review.countDocuments({ prompt: promptId });
    
    return {
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async addReview(reviewData: {
    reviewer: string;
    prompt: string;
    rating: number;
    comment: string;
  }): Promise<any> {
    await connectToDatabase();
    
    const review = new Review(reviewData);
    await review.save();
    
    // Update prompt rating
    const reviews = await Review.find({ prompt: reviewData.prompt });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Prompt.updateOne(
      { _id: reviewData.prompt },
      { 
        $set: { 'stats.rating': avgRating },
        $inc: { 'stats.reviews': 1 }
      }
    );
    
    return review;
  }
}