import { NextRequest, NextResponse } from 'next/server';

const MAILTM_API_BASE = 'https://api.mail.tm';

export async function POST(request: NextRequest) {
  try {
    const { address, password } = await request.json();

    if (!address || !password) {
      return NextResponse.json(
        { success: false, error: 'Address and password are required' },
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

    // Get messages
    const messagesResponse = await fetch(`${MAILTM_API_BASE}/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!messagesResponse.ok) {
      throw new Error('Failed to fetch messages');
    }

    const messagesData = await messagesResponse.json();
    const messages = messagesData['hydra:member'] || [];

    // Transform messages to match our interface
    const transformedMessages = messages.map((msg: any) => ({
      id: msg.id,
      from: {
        address: msg.from.address,
        name: msg.from.name || msg.from.address,
      },
      subject: msg.subject,
      intro: msg.intro || msg.text?.substring(0, 150) + '...' || 'No preview available',
      date: msg.createdAt,
      seen: msg.seen || false,
    }));

    return NextResponse.json({
      success: true,
      messages: transformedMessages,
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}