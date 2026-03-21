import { stripe } from '../lib/stripe';
import { PLANS } from '../lib/stripe';

async function setupStripe() {
  console.log('Setting up Stripe products and prices...');

  try {
    // Create Pro product
    const proProduct = await stripe.products.create({
      name: 'Pro Plan',
      description: 'Professional plan with advanced features and higher limits',
      metadata: {
        plan: 'PRO',
      },
    });

    console.log('✅ Created Pro product:', proProduct.id);

    // Create Pro price (monthly)
    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: PLANS.PRO.price, // $9.99 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'PRO',
        interval: 'month',
      },
    });

    console.log('✅ Created Pro price:', proPrice.id);

    // Create Free product (for reference)
    const freeProduct = await stripe.products.create({
      name: 'Free Plan',
      description: 'Free plan with basic features',
      metadata: {
        plan: 'FREE',
      },
    });

    console.log('✅ Created Free product:', freeProduct.id);

    console.log('\n🎉 Stripe setup completed!');
    console.log('\nAdd these to your .env file:');
    console.log(`STRIPE_PRO_PRICE_ID=${proPrice.id}`);
    console.log(`STRIPE_PRO_PRODUCT_ID=${proProduct.id}`);
    
    console.log('\nWebhook endpoint URL:');
    console.log(`${process.env.NEXTAUTH_URL}/api/stripe/webhook`);
    
  } catch (error) {
    console.error('❌ Error setting up Stripe:', error);
    process.exit(1);
  }
}

// Run the setup
setupStripe();
