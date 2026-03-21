# Stripe Payment System Setup

This guide walks you through setting up the complete Stripe payment system for WorkHive SaaS.

## Overview

The payment system includes:
- **Three Plans**: FREE, PRO ($9.99/month), ENTERPRISE (custom)
- **Credit System**: FREE (100 credits/month, 5/day), PRO (1000 credits/month, 50/day)
- **Stripe Integration**: Checkout sessions, webhooks, customer portal
- **UI Components**: Pricing page, billing management, upgrade prompts

## Prerequisites

1. Stripe account (https://dashboard.stripe.com/register)
2. Node.js and npm installed
3. PostgreSQL database running

## Step 1: Environment Variables

Copy the example environment file and add your Stripe credentials:

```bash
cp .env.example .env.local
```

Add your Stripe keys to `.env.local`:

```env
# Stripe (get these from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Other required variables
DATABASE_URL="postgresql://username:password@localhost:5432/workhive"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

## Step 2: Database Schema Update

The Prisma schema has been updated with subscription fields. Apply the migration:

```bash
npx prisma db push
```

Or if you prefer migrations:
```bash
npx prisma migrate dev --name add-subscription-fields
```

## Step 3: Create Stripe Products and Prices

Run the setup script to create products and prices in Stripe:

```bash
npx tsx scripts/setup-stripe.ts
```

This will:
- Create Pro and Free products in Stripe
- Create a monthly price for the Pro plan ($9.99)
- Output the IDs you need to add to your environment

Add the generated IDs to your `.env.local`:
```env
STRIPE_PRO_PRICE_ID=price_...
STRIPE_PRO_PRODUCT_ID=prod_...
```

## Step 4: Set Up Webhook

1. In your Stripe Dashboard, go to **Developers > Webhooks**
2. Add a new webhook endpoint: `http://localhost:3000/api/stripe/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

## Step 5: Test the Payment Flow

### Start the Development Server

```bash
npm run dev
```

### Test the Complete Flow

1. **Visit Pricing Page**: Go to `http://localhost:3000/pricing`
2. **Click "Start Free Trial"**: This should redirect to Stripe Checkout
3. **Complete Test Payment**: Use Stripe's test card number: `4242 4242 4242 4242`
4. **Verify Success**: You should be redirected to the success page
5. **Check Database**: User's plan should be updated to PRO
6. **Test Webhook**: Verify the webhook processed the event correctly

## Step 6: Customer Portal

Users can manage their subscriptions by visiting `/billing`. This provides:
- View current plan and usage
- Upgrade/downgrade plans
- Update payment methods
- View billing history
- Cancel subscriptions

## Features Implemented

### Plans & Credits
- **FREE**: 100 credits/month, 5 credits/day
- **PRO**: 1000 credits/month, 50 credits/day, $9.99/month
- **ENTERPRISE**: Custom pricing (contact sales)

### API Endpoints
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/portal` - Create customer portal session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

### Pages
- `/pricing` - Pricing comparison and upgrade
- `/billing` - Manage subscription
- `/billing/success` - Payment success confirmation

### Components
- `UpgradePrompt` - Modal for plan upgrades
- Billing management UI with usage tracking

### Security
- Webhook signature verification
- Server-side session validation
- Proper error handling

## Testing with Stripe CLI

For local testing, you can use the Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The CLI will give you a webhook signing secret to use in your `.env.local`.

## Production Deployment

For production:

1. **Use Production Keys**: Replace test keys with production keys
2. **Update URLs**: Ensure all URLs point to your production domain
3. **SSL Certificate**: Required for Stripe checkout in production
4. **Environment Variables**: Set all required env vars in your hosting platform
5. **Database Migration**: Run migrations on production database

## Troubleshooting

### Common Issues

1. **Webhook Errors**: Check that the webhook secret matches
2. **Checkout Fails**: Verify Stripe keys and price IDs are correct
3. **Database Errors**: Ensure Prisma client is generated and schema is updated
4. **CORS Issues**: Make sure your domain is added to Stripe's allowed origins

### Debug Mode

Add this to your environment for debugging:
```env
STRIPE_LOG_LEVEL=debug
```

### Test Cards

Use these Stripe test cards for testing:
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`

## Support

If you encounter issues:
1. Check Stripe Dashboard logs
2. Review server logs for webhook errors  
3. Verify environment variables are set correctly
4. Ensure database schema is up to date

## Next Steps

After setup is complete:
1. Customize the pricing page design
2. Add more billing analytics
3. Implement annual billing options
4. Add team/organization billing
5. Set up dunning emails for failed payments
