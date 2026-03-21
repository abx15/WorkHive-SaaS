'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, CheckCircle, Star } from 'lucide-react';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  currentPlan: string;
  reason?: string;
}

export function UpgradePrompt({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  currentPlan,
  reason = "Upgrade to unlock more features and higher limits"
}: UpgradePromptProps) {
  const features = {
    FREE: {
      name: 'Free Plan',
      price: '$0/month',
      credits: '100 credits/month',
      dailyLimit: '5 actions/day',
      features: [
        'Basic task management',
        '1 workspace',
        'Limited projects',
        'Community support'
      ],
      icon: Zap,
      color: 'bg-gray-500'
    },
    PRO: {
      name: 'Pro Plan',
      price: '$9.99/month',
      credits: '1,000 credits/month',
      dailyLimit: '50 actions/day',
      features: [
        'Advanced task management',
        'Unlimited workspaces',
        'Unlimited projects',
        'AI-powered features',
        'Priority support',
        'Advanced analytics'
      ],
      icon: Crown,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  };

  const handleUpgrade = async () => {
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription>
            {reason}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          {/* Current Plan */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <features.FREE.icon className="h-5 w-5" />
                  {features.FREE.name}
                </CardTitle>
                {currentPlan === 'FREE' && (
                  <Badge variant="secondary">Current</Badge>
                )}
              </div>
              <div className="text-2xl font-bold">{features.FREE.price}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Credits:</span>
                  <span className="font-medium">{features.FREE.credits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Limit:</span>
                  <span className="font-medium">{features.FREE.dailyLimit}</span>
                </div>
              </div>
              <div className="space-y-2">
                {features.FREE.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-purple-200 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                RECOMMENDED
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <features.PRO.icon className="h-5 w-5" />
                  {features.PRO.name}
                </CardTitle>
                {currentPlan === 'PRO' && (
                  <Badge variant="secondary">Current</Badge>
                )}
              </div>
              <div className="text-2xl font-bold">{features.PRO.price}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Credits:</span>
                  <span className="font-medium text-purple-600">{features.PRO.credits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Limit:</span>
                  <span className="font-medium text-purple-600">{features.PRO.dailyLimit}</span>
                </div>
              </div>
              <div className="space-y-2">
                {features.PRO.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button 
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Upgrade to Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
