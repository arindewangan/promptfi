import { NextRequest, NextResponse } from 'next/server';
import { PromptService } from '@/lib/services/promptService';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const params = await context.params;
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');
    
    if (!userAddress) {
      return NextResponse.json({ error: 'User address required' }, { status: 400 });
    }
    
    const hasPurchased = await PromptService.hasUserPurchased(userAddress, id);
    
    return NextResponse.json({ hasPurchased });
  } catch (error) {
    console.error('Error checking purchase status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}