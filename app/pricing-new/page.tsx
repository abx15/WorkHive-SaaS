import { Metadata } from "next";
import { DollarSign, CheckCircle2, Star, Zap, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | WorkHive",
  description: "Choose the perfect WorkHive plan for your team - Free, Pro, and Enterprise options.",
};

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and small teams getting started",
    icon: Star,
    features: [
      "Up to 5 team members",
      "1 workspace",
      "Basic project management",
      "Task tracking",
      "Community support",
      "Mobile app access"
    ],
    limitations: [
      "Limited storage (1GB)",
      "No custom branding",
      "Basic features only",
      "No API access"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$15",
    priceUnit: "user/month",
    description: "Ideal for growing teams and businesses",
    icon: Zap,
    features: [
      "Unlimited team members",
      "Unlimited workspaces",
      "Advanced project management",
      "Time tracking & reporting",
      "Custom branding",
      "Priority support",
      "API access",
      "Integrations",
      "Advanced analytics"
    ],
    limitations: [
      "Fair usage policy applies",
      "No SLA guarantee"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Complete solution for large organizations",
    icon: Shield,
    features: [
      "Everything in Pro",
      "99.9% uptime SLA",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features",
      "SSO/SAML",
      "Audit logs",
      "Custom contracts",
      "On-premise option"
    ],
    limitations: [
      "Minimum 50 users"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at the next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise customers. All payments are processed securely through Stripe."
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes! We offer a 14-day free trial for our Pro plan. No credit card required to start your trial. You can upgrade to Enterprise anytime."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits. You can either upgrade your plan or purchase additional credits. We never suspend your account without warning."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Absolutely! You can cancel your subscription at any time. Your access will continue until the end of your current billing period, and no future charges will be applied."
  },
  {
    question: "Do you offer discounts?",
    answer: "Yes! We offer 20% discount for annual billing, 50% discount for non-profits and educational institutions, and custom pricing for large teams."
  }
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Pricing
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Choose the perfect plan for your team. Start free and scale as you grow.
        </p>
      </div>

      {/* Pricing Plans */}
      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const PlanIcon = plan.icon;
            return (
              <div key={index} className={`relative bg-card border rounded-xl p-8 hover-lift ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border/50'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <PlanIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.priceUnit && (
                      <span className="text-lg text-muted-foreground">/{plan.priceUnit}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations && plan.limitations.length > 0 && (
                  <div className="mb-8 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Limitations:</h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="text-xs text-muted-foreground">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className={`w-full py-3 px-6 rounded-lg transition-colors font-semibold ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white' 
                    : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                }`}>
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Feature Comparison</h2>
        <div className="bg-card border border-border/50 rounded-xl p-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Pro</th>
                  <th className="text-center py-3 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4">Team Members</td>
                  <td className="text-center py-3 px-4">Up to 5</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4">Workspaces</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4">Storage</td>
                  <td className="text-center py-3 px-4">1GB</td>
                  <td className="text-center py-3 px-4">100GB</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4">Support</td>
                  <td className="text-center py-3 px-4">Community</td>
                  <td className="text-center py-3 px-4">Priority</td>
                  <td className="text-center py-3 px-4">Dedicated</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-3 px-4">API Access</td>
                  <td className="text-center py-3 px-4">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-green-500">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">SLA</td>
                  <td className="text-center py-3 px-4">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-green-500">99.9%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
                <button className="w-full text-left flex items-center justify-between py-2">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ArrowRight className="w-5 h-5 text-muted-foreground transform rotate-90" />
                </button>
                <div className="mt-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-12 text-center">
          <DollarSign className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Not sure which plan is right for you?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our sales team is happy to help you find the perfect solution for your organization's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg transition-colors font-semibold">
              Contact Sales
            </button>
            <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-8 rounded-lg transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
