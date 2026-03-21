import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/actions/subscriptions';

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    
    if (!plan || !['FREE', 'PRO', 'ENTERPRISE'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    const session = await createCheckoutSession(plan as any);
    
    return NextResponse.json(session);
  } catch (error: any) {
    console.error('Checkout session creation failed:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
