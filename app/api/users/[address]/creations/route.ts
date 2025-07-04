import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';

export async function GET(request: NextRequest, context: { params: { address: string } }) {
  try {
    const params = await context.params;
    const { address } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const result = await UserService.getUserCreations(address, page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching user creations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}