import { NextRequest, NextResponse } from 'next/server';
import { PromptService } from '@/lib/services/promptService';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const params = await context.params;
    const { id } = params;
    const prompt = await PromptService.getPromptById(id);
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }
    
    // Increment view count
    await PromptService.updatePromptStats(id, 'views');
    
    return NextResponse.json(prompt);
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}