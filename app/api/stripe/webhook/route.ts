import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return new NextResponse('Webhook signature verification failed', { status: 400 });
  }

  const session = event.data.object;

  switch (event.type) {
    case 'checkout.session.completed': {
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (!userId || !plan) {
        console.error('Missing metadata in checkout session');
        return new NextResponse('Missing metadata', { status: 400 });
      }

      // Update user's subscription
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: plan as any,
          stripeSubscriptionId: session.subscription as string,
          subscriptionEndsAt: new Date(session.subscription_details?.cancel_at_period_end ? 
            session.current_period_end * 1000 : 
            Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          monthlyCredits: plan === 'PRO' ? 1000 : 100,
        },
      });

      console.log(`User ${userId} upgraded to ${plan} plan`);
      break;
    }

    case 'invoice.payment_succeeded': {
      const subscriptionId = session.subscription;
      
      // Get the subscription to find the customer
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      
      // Find user by Stripe customer ID
      const user = await prisma.user.findUnique({
        where: { stripeCustomerId: customer.id },
      });

      if (user) {
        // Update subscription end date
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
            monthlyCredits: user.plan === 'PRO' ? 1000 : 100,
            monthlyUsage: 0, // Reset monthly usage on renewal
          },
        });

        console.log(`Subscription renewed for user ${user.id}`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscriptionId = session.id;
      
      // Find user by subscription ID
      const user = await prisma.user.findUnique({
        where: { stripeSubscriptionId: subscriptionId },
      });

      if (user) {
        // Downgrade to free plan
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: 'FREE',
            stripeSubscriptionId: null,
            subscriptionEndsAt: null,
            monthlyCredits: 100,
          },
        });

        console.log(`User ${user.id} downgraded to FREE plan`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse('Webhook received', { status: 200 });
}
