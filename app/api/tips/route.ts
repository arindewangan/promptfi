import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Tip from '@/lib/models/Tip';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    const { from, to, prompt, amount, message, transactionHash } = await request.json();
    
    await connectToDatabase();
    
    const tip = new Tip({
      from: from.toLowerCase(),
      to: to.toLowerCase(),
      prompt,
      amount,
      message,
      transactionHash,
      status: 'completed'
    });
    
    await tip.save();
    
    // Update recipient's earnings
    await User.updateOne(
      { address: to.toLowerCase() },
      { $inc: { 'stats.totalEarnings': amount } }
    );
    
    return NextResponse.json(tip, { status: 201 });
  } catch (error) {
    console.error('Error processing tip:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}