import { NextRequest, NextResponse } from 'next/server';
import { PromptService } from '@/lib/services/promptService';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { buyerAddress, transactionHash } = await request.json();
    
    const purchase = await PromptService.purchasePrompt(buyerAddress, id, transactionHash);
    
    return NextResponse.json(purchase, { status: 201 });
  } catch (error) {
    console.error('Error processing purchase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}