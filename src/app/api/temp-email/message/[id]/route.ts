import { NextRequest, NextResponse } from 'next/server';

const MAILTM_API_BASE = 'https://api.mail.tm';

export function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export async function POST(
  request: NextRequest,
  { params }
) {
  try {
    const { address, password } = await request.json();
    const { id } = await params;
    const messageId = id;

    if (!address || !password || !messageId) {
      return NextResponse.json(
        { success: false, error: 'Address, password, and message ID are required' },
        { status: 400 }
      );
    }

    // Get JWT token
    const authResponse = await fetch(`${MAILTM_API_BASE}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address,
        password: password,
      }),
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authenticate');
    }

    const authData = await authResponse.json();
    const token = authData.token;

    // Get specific message
    const messageResponse = await fetch(`${MAILTM_API_BASE}/messages/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!messageResponse.ok) {
      throw new Error('Failed to fetch message');
    }

    const messageData = await messageResponse.json();

    return NextResponse.json({
      success: true,
      message: messageData,
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch message' },
      { status: 500 }
    );
  }
}