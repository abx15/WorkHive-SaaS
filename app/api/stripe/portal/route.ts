import { NextRequest, NextResponse } from 'next/server';
import { createCustomerPortalSession } from '@/lib/actions/subscriptions';

export async function POST(req: NextRequest) {
  try {
    const session = await createCustomerPortalSession();
    
    return NextResponse.json(session);
  } catch (error: any) {
    console.error('Customer portal session creation failed:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
