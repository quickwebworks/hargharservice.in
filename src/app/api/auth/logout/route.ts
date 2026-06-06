import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Clear all auth cookies - cookies() returns a Promise in Next.js 16
    const cookieStore = await cookies();

    // Clear NextAuth session token
    cookieStore.delete('next-auth.session-token');
    cookieStore.delete('next-auth.csrf-token');
    cookieStore.delete('next-auth.callback-url');

    // Clear any custom auth cookies
    cookieStore.delete('auth_token');
    cookieStore.delete('user_id');

    return NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}