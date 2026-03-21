import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { searchParams } from 'next/navigation';

async function getCheckoutSession(sessionId: string) {
  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching checkout session:', error);
    return null;
  }
}

export default async function BillingSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/pricing');
  }

  const session = await getCheckoutSession(sessionId);

  if (!session || session.payment_status !== 'paid') {
    redirect('/pricing');
  }

  const plan = session.metadata?.plan || 'PRO';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-muted-foreground mb-8">
          Congratulations! You have successfully upgraded to the <span className="font-semibold">{plan}</span> plan.
        </p>

        <div className="bg-card border rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold mb-4">What happens next?</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Your account has been upgraded immediately
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Your new credit limits are now active
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              You will receive a confirmation email shortly
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Your subscription will auto-renew monthly
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full" asChild>
            <Link href="/billing">
              Manage Billing
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Need help? Contact our support team at support@workhive.com
        </p>
      </div>
    </div>
  );
}
