import { NextRequest, NextResponse } from 'next/server';

const MAILTM_API_BASE = 'https://api.mail.tm';

export async function POST() {
  try {
    // Get available domains
    const domainsResponse = await fetch(`${MAILTM_API_BASE}/domains`);
    
    if (!domainsResponse.ok) {
      throw new Error('Failed to fetch domains');
    }
    
    const domainsData = await domainsResponse.json();
    const domains = domainsData['hydra:member'];
    
    if (!domains || domains.length === 0) {
      throw new Error('No available domains');
    }

    // Select a random domain
    const randomDomain = domains[Math.floor(Math.random() * domains.length)].domain;
    
    // Generate a random username
    const username = Math.random().toString(36).substring(2, 10);
    const email = `${username}@${randomDomain}`;
    const password = Math.random().toString(36).substring(2, 12);

    // Create account
    const createAccountResponse = await fetch(`${MAILTM_API_BASE}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: email,
        password: password,
      }),
    });

    if (!createAccountResponse.ok) {
      const errorData = await createAccountResponse.text();
      console.error('Create account error:', errorData);
      throw new Error('Failed to create account');
    }

    const accountData = await createAccountResponse.json();

    // Get JWT token
    const authResponse = await fetch(`${MAILTM_API_BASE}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: email,
        password: password,
      }),
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.text();
      console.error('Auth error:', errorData);
      throw new Error('Failed to authenticate');
    }

    const authData = await authResponse.json();

    const result = {
      success: true,
      address: email,
      password: password,
      token: authData.token,
      accountId: accountData.id,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error creating temporary email:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create temporary email' },
      { status: 500 }
    );
  }
}