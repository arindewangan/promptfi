import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';

export async function POST(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    const { followerAddress } = await request.json();
    
    await UserService.followUser(followerAddress, address);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error following user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;
    const { followerAddress } = await request.json();
    
    await UserService.unfollowUser(followerAddress, address);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}