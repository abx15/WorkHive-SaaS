'use server';

import prisma from '@/lib/db';
import { stripe, PLANS, PlanType } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(plan: PlanType) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Create or retrieve Stripe customer
  let customerId = user.stripeCustomerId;
  
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name || undefined,
      metadata: {
        userId: user.id,
      },
    });
    
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
    
    customerId = customer.id;
  }

  // For enterprise, redirect to contact page
  if (plan === 'ENTERPRISE') {
    redirect('/contact');
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: getStripePriceId(plan),
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: {
      userId: user.id,
      plan,
    },
  });

  return { url: checkoutSession.url };
}

export async function createCustomerPortalSession() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !user.stripeCustomerId) {
    throw new Error('No Stripe customer found');
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
  });

  return { url: portalSession.url };
}

export async function updateSubscriptionPlan(userId: string, plan: PlanType) {
  const planConfig = PLANS[plan];
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan,
      monthlyCredits: planConfig.credits,
    },
  });
}

function getStripePriceId(plan: PlanType): string {
  const priceIds = {
    PRO: process.env.STRIPE_PRO_PRICE_ID,
  };
  
  const priceId = priceIds[plan as keyof typeof priceIds];
  if (!priceId) {
    throw new Error(`No Stripe price ID configured for plan: ${plan}`);
  }
  
  return priceId;
}

export async function getUserSubscription() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      monthlyCredits: true,
      dailyUsage: true,
      monthlyUsage: true,
      subscriptionEndsAt: true,
      stripeSubscriptionId: true,
    },
  });

  if (!user) {
    return null;
  }

  // Check if subscription has expired
  if (user.plan !== 'FREE' && user.subscriptionEndsAt && user.subscriptionEndsAt < new Date()) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        plan: 'FREE',
        monthlyCredits: PLANS.FREE.credits,
        stripeSubscriptionId: null,
        subscriptionEndsAt: null,
      },
    });
    
    return {
      ...user,
      plan: 'FREE',
      monthlyCredits: PLANS.FREE.credits,
      stripeSubscriptionId: null,
      subscriptionEndsAt: null,
    };
  }

  return user;
}
