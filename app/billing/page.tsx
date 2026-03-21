import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ExternalLink, RefreshCw } from 'lucide-react';
import { getUserSubscription } from '@/lib/actions/subscriptions';
import { PLANS } from '@/lib/stripe';

export default async function BillingPage() {
  const subscription = await getUserSubscription();

  if (!subscription) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Billing</h1>
        <p>Please log in to manage your billing.</p>
      </div>
    );
  }

  const currentPlan = PLANS[subscription.plan as keyof typeof PLANS];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Billing</h1>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Plan
              <Badge variant="outline">{subscription.plan}</Badge>
            </CardTitle>
            <CardDescription>
              You are currently on the {currentPlan.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Plan Details</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monthly Credits:</span>
                    <span className="font-medium">{currentPlan.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Limit:</span>
                    <span className="font-medium">{currentPlan.dailyLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">
                      {currentPlan.price === 0 ? 'Free' : `$${(currentPlan.price / 100).toFixed(2)}/month`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Usage This Month</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Credits Used:</span>
                    <span className="font-medium">{subscription.monthlyUsage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credits Remaining:</span>
                    <span className="font-medium">
                      {Math.max(0, subscription.monthlyCredits - subscription.monthlyUsage)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Usage:</span>
                    <span className="font-medium">{subscription.dailyUsage}</span>
                  </div>
                </div>
              </div>
            </div>

            {subscription.subscriptionEndsAt && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Subscription renews:</strong>{' '}
                  {new Date(subscription.subscriptionEndsAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          {subscription.plan === 'FREE' && (
            <Button className="w-full" asChild>
              <a href="/pricing">
                Upgrade Plan
                <CreditCard className="h-4 w-4 ml-2" />
              </a>
            </Button>
          )}

          {subscription.plan !== 'FREE' && subscription.stripeSubscriptionId && (
            <>
              <Button variant="outline" className="w-full" asChild>
                <a href="/api/stripe/portal">
                  Manage Subscription
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <a href="/pricing">
                  Change Plan
                  <RefreshCw className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </>
          )}
        </div>

        {/* Payment Method */}
        {subscription.plan !== 'FREE' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href="/api/stripe/portal">
                  Update Payment Method
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Billing History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View your past invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href="/api/stripe/portal">
                View Billing History
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
