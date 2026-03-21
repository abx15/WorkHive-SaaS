'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Calendar, Zap } from 'lucide-react';

interface CreditStatus {
  plan: string;
  monthlyCredits: number;
  monthlyUsage: number;
  dailyUsage: number;
  monthlyLimit: number;
  dailyLimit: number;
  monthlyRemaining: number;
  dailyRemaining: number;
  recentUsage: Array<{
    action: string;
    creditsUsed: number;
    description?: string;
    createdAt: Date;
  }>;
}

interface CreditUsageDisplayProps {
  creditStatus: CreditStatus;
  onUpgrade?: () => void;
}

export function CreditUsageDisplay({ creditStatus, onUpgrade }: CreditUsageDisplayProps) {
  const monthlyPercentage = (creditStatus.monthlyUsage / creditStatus.monthlyLimit) * 100;
  const dailyPercentage = (creditStatus.dailyUsage / creditStatus.dailyLimit) * 100;
  
  const isLowOnCredits = creditStatus.monthlyRemaining < 10;
  const isDailyLimitReached = creditStatus.dailyRemaining === 0;
  const isMonthlyExhausted = creditStatus.monthlyRemaining === 0;

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'TASK_CREATE': return 'Task Created';
      case 'PROJECT_CREATE': return 'Project Created';
      case 'AI_USAGE': return 'AI Feature Used';
      case 'WORKSPACE_CREATE': return 'Workspace Created';
      default: return action;
    }
  };

  return (
    <div className="space-y-4">
      {/* Plan Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {creditStatus.plan} Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Daily Usage
                </span>
                <span className={isDailyLimitReached ? 'text-red-600 font-medium' : ''}>
                  {creditStatus.dailyUsage}/{creditStatus.dailyLimit}
                </span>
              </div>
              <Progress value={dailyPercentage} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Monthly Credits
                </span>
                <span className={isMonthlyExhausted ? 'text-red-600 font-medium' : ''}>
                  {creditStatus.monthlyUsage}/{creditStatus.monthlyLimit}
                </span>
              </div>
              <Progress value={monthlyPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {(isLowOnCredits || isDailyLimitReached || isMonthlyExhausted) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800">Credit Limit Warning</h4>
                <p className="text-sm text-orange-700 mt-1">
                  {isMonthlyExhausted && "You've used all your monthly credits!"}
                  {isDailyLimitReached && !isMonthlyExhausted && "Daily limit reached. Credits will reset tomorrow."}
                  {isLowOnCredits && !isMonthlyExhausted && !isDailyLimitReached && 
                    `Only ${creditStatus.monthlyRemaining} credits remaining this month.`}
                </p>
                {onUpgrade && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                    onClick={onUpgrade}
                  >
                    Upgrade to Pro
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Usage */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {creditStatus.recentUsage.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              creditStatus.recentUsage.map((usage, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{getActionLabel(usage.action)}</span>
                    {usage.description && (
                      <span className="text-muted-foreground ml-2">{usage.description}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">-{usage.creditsUsed}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(usage.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
