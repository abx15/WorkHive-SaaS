import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Building } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    icon: Star,
    price: '$0',
    description: 'Perfect for individuals getting started',
    features: [
      '100 credits per month',
      '5 credits per day',
      'Basic task management',
      'Up to 3 projects',
      'Community support',
    ],
    cta: 'Get Started',
    ctaLink: '/register',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '$9.99',
    description: 'For professionals and growing teams',
    features: [
      '1000 credits per month',
      '50 credits per day',
      'Advanced task management',
      'Unlimited projects',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    ctaLink: '#',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Building,
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      'Custom credit limits',
      'Custom daily limits',
      'Advanced analytics',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-lg border ${
                  plan.popular
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border'
                } bg-card p-8`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    {plan.name === 'Pro' && <span className="text-lg font-normal">/month</span>}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.name === 'Pro' ? (
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={handleProCheckout}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={plan.ctaLink}>{plan.cta}</Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">What are credits?</h3>
              <p className="text-muted-foreground">
                Credits are used for various actions in WorkHive, such as creating tasks, projects, 
                and using AI features. Each action consumes a certain number of credits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Can I change my plan anytime?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. When upgrading, 
                you'll be charged a prorated amount. When downgrading, the change takes effect 
                at the next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Do credits reset?</h3>
              <p className="text-muted-foreground">
                Monthly credits reset on the first day of each month. Daily credits reset every 
                day at midnight. Unused credits don't roll over to the next period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, and PayPal through our secure 
                payment processor, Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function handleProCheckout(e: React.MouseEvent) {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan: 'PRO' }),
    });

    const data = await response.json();
    
    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error('Failed to create checkout session:', data.error);
    }
  } catch (error) {
    console.error('Error during checkout:', error);
  }
}
