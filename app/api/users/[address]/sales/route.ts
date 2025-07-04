import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Purchase from '@/lib/models/Purchase';
import Prompt from '@/lib/models/Prompt';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    
    await connectToDatabase();
    
    // Calculate date range
    const now = new Date();
    const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    // Get total earnings and sales
    const salesStats = await Purchase.aggregate([
      {
        $match: {
          seller: address.toLowerCase(),
          status: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$amount' },
          totalSales: { $sum: 1 }
        }
      }
    ]);
    
    // Get total views from user's prompts
    const viewStats = await Prompt.aggregate([
      {
        $match: {
          creator: address.toLowerCase()
        }
      },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$stats.views' },
          avgRating: { $avg: '$stats.rating' }
        }
      }
    ]);
    
    // Get recent sales
    const recentSales = await Purchase.find({
      seller: address.toLowerCase(),
      status: 'completed'
    })
    .populate('prompt', 'title price')
    .sort({ createdAt: -1 })
    .limit(10);
    
    // Get top performing prompts
    const topPrompts = await Prompt.find({
      creator: address.toLowerCase()
    })
    .sort({ 'stats.purchases': -1 })
    .limit(10)
    .select('title stats price');
    
    // Calculate earnings for each prompt
    const topPromptsWithEarnings = await Promise.all(
      topPrompts.map(async (prompt) => {
        const earnings = await Purchase.aggregate([
          {
            $match: {
              prompt: prompt._id,
              status: 'completed'
            }
          },
          {
            $group: {
              _id: null,
              totalEarnings: { $sum: '$amount' }
            }
          }
        ]);
        
        return {
          ...prompt.toObject(),
          earnings: earnings[0]?.totalEarnings || 0
        };
      })
    );
    
    // Get monthly earnings for the last 6 months
    const sixMonthsAgo = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
    const monthlyEarnings = await Purchase.aggregate([
      {
        $match: {
          seller: address.toLowerCase(),
          status: 'completed',
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          earnings: { $sum: '$amount' },
          sales: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    
    // Format monthly data
    const formattedMonthlyEarnings = monthlyEarnings.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      earnings: item.earnings,
      sales: item.sales
    }));
    
    const salesData = {
      totalEarnings: salesStats[0]?.totalEarnings || 0,
      totalSales: salesStats[0]?.totalSales || 0,
      totalViews: viewStats[0]?.totalViews || 0,
      avgRating: viewStats[0]?.avgRating || 0,
      recentSales,
      topPrompts: topPromptsWithEarnings,
      monthlyEarnings: formattedMonthlyEarnings
    };
    
    return NextResponse.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}