import { NextRequest, NextResponse } from 'next/server';
import { PromptService } from '@/lib/services/promptService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const sort = searchParams.get('sort');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    const filters: any = {};
    
    if (category) filters.category = category;
    if (type) filters.type = type;
    if (sort) filters.sort = sort;
    if (search) filters.search = search;
    if (minPrice && maxPrice) {
      filters.priceRange = {
        min: parseInt(minPrice),
        max: maxPrice === 'Infinity' ? Infinity : parseInt(maxPrice)
      };
    }
    
    const result = await PromptService.getAllPrompts(page, limit, filters);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const promptData = await request.json();
    const prompt = await PromptService.createPrompt(promptData);
    
    return NextResponse.json(prompt, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}