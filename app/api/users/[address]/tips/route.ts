import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'sent' | 'received' || 'received';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const result = await UserService.getUserTips(address, type, page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching user tips:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}