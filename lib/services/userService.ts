import { connectToDatabase } from '@/lib/mongodb';
import User, { IUser } from '@/lib/models/User';
import Prompt from '@/lib/models/Prompt';
import Purchase from '@/lib/models/Purchase';
import Tip from '@/lib/models/Tip';

export class UserService {
  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    await connectToDatabase();
    
    const user = new User({
      ...userData,
      stats: {
        followers: 0,
        following: 0,
        prompts: 0,
        totalEarnings: 0,
        avgRating: 0,
        totalViews: 0,
        totalPurchases: 0
      }
    });
    
    return await user.save();
  }

  static async getUserByAddress(address: string): Promise<IUser | null> {
    await connectToDatabase();
    return await User.findOne({ address: address.toLowerCase() });
  }

  static async updateUser(address: string, updateData: Partial<IUser>): Promise<IUser | null> {
    await connectToDatabase();
    return await User.findOneAndUpdate(
      { address: address.toLowerCase() },
      updateData,
      { new: true }
    );
  }

  static async followUser(followerAddress: string, followeeAddress: string): Promise<boolean> {
    await connectToDatabase();
    
    const session = await User.startSession();
    session.startTransaction();
    
    try {
      // Add to follower's following list
      await User.updateOne(
        { address: followerAddress.toLowerCase() },
        { 
          $addToSet: { following: followeeAddress.toLowerCase() },
          $inc: { 'stats.following': 1 }
        }
      );
      
      // Add to followee's followers list
      await User.updateOne(
        { address: followeeAddress.toLowerCase() },
        { 
          $addToSet: { followers: followerAddress.toLowerCase() },
          $inc: { 'stats.followers': 1 }
        }
      );
      
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async unfollowUser(followerAddress: string, followeeAddress: string): Promise<boolean> {
    await connectToDatabase();
    
    const session = await User.startSession();
    session.startTransaction();
    
    try {
      // Remove from follower's following list
      await User.updateOne(
        { address: followerAddress.toLowerCase() },
        { 
          $pull: { following: followeeAddress.toLowerCase() },
          $inc: { 'stats.following': -1 }
        }
      );
      
      // Remove from followee's followers list
      await User.updateOne(
        { address: followeeAddress.toLowerCase() },
        { 
          $pull: { followers: followerAddress.toLowerCase() },
          $inc: { 'stats.followers': -1 }
        }
      );
      
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async getUserPurchases(address: string, page: number = 1, limit: number = 10) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    
    const purchases = await Purchase.find({ buyer: address.toLowerCase() })
      .populate('prompt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Purchase.countDocuments({ buyer: address.toLowerCase() });
    
    return {
      purchases,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getUserCreations(address: string, page: number = 1, limit: number = 10) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    
    const prompts = await Prompt.find({ creator: address.toLowerCase() })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Prompt.countDocuments({ creator: address.toLowerCase() });
    
    return {
      prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getUserTips(address: string, type: 'sent' | 'received', page: number = 1, limit: number = 10) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    const query = type === 'sent' ? { from: address.toLowerCase() } : { to: address.toLowerCase() };
    
    const tips = await Tip.find(query)
      .populate('prompt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Tip.countDocuments(query);
    
    return {
      tips,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async updateUserStats(address: string): Promise<void> {
    await connectToDatabase();
    
    const userAddress = address.toLowerCase();
    
    // Get user's prompts count and total views
    const promptStats = await Prompt.aggregate([
      { $match: { creator: userAddress } },
      {
        $group: {
          _id: null,
          totalPrompts: { $sum: 1 },
          totalViews: { $sum: '$stats.views' },
          avgRating: { $avg: '$stats.rating' }
        }
      }
    ]);
    
    // Get total earnings from sales
    const salesStats = await Purchase.aggregate([
      { $match: { seller: userAddress, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$amount' }
        }
      }
    ]);
    
    // Get total purchases made
    const purchaseCount = await Purchase.countDocuments({ 
      buyer: userAddress, 
      status: 'completed' 
    });
    
    const stats = {
      prompts: promptStats[0]?.totalPrompts || 0,
      totalViews: promptStats[0]?.totalViews || 0,
      avgRating: promptStats[0]?.avgRating || 0,
      totalEarnings: salesStats[0]?.totalEarnings || 0,
      totalPurchases: purchaseCount
    };
    
    await User.updateOne(
      { address: userAddress },
      { $set: { 'stats': { ...stats } } }
    );
  }

  static async getTopCreators(limit: number = 10): Promise<IUser[]> {
    await connectToDatabase();
    
    return await User.find()
      .sort({ 'stats.totalEarnings': -1 })
      .limit(limit);
  }

  static async searchUsers(query: string, page: number = 1, limit: number = 10) {
    await connectToDatabase();
    
    const skip = (page - 1) * limit;
    
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } }
      ]
    })
    .sort({ 'stats.totalEarnings': -1 })
    .skip(skip)
    .limit(limit);
    
    const total = await User.countDocuments({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } }
      ]
    });
    
    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}