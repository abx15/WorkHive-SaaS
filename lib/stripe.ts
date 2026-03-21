import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    credits: 100,
    dailyLimit: 5,
    features: [
      '100 credits per month',
      '5 credits per day',
      'Basic task management',
      'Up to 3 projects',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 999, // $9.99 in cents
    credits: 1000,
    dailyLimit: 50,
    features: [
      '1000 credits per month',
      '50 credits per day',
      'Advanced task management',
      'Unlimited projects',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 0, // Custom pricing
    credits: 0, // Custom limits
    dailyLimit: 0, // Custom limits
    features: [
      'Custom credit limits',
      'Custom daily limits',
      'Advanced analytics',
      'Dedicated support',
      'Custom integrations',
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;

export const STRIPE_PRODUCTS = {
  PRO: 'prod_pro_monthly',
} as const;

export const STRIPE_PRICES = {
  PRO_MONTHLY: 'price_pro_monthly',
} as const;
