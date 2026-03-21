import prisma from './db';

export const CREDIT_COSTS = {
  TASK_CREATE: 1,
  PROJECT_CREATE: 2,
  AI_USAGE: 5,
  WORKSPACE_CREATE: 3,
} as const;

export const PLAN_LIMITS = {
  FREE: {
    monthlyCredits: 100,
    dailyLimit: 5,
  },
  PRO: {
    monthlyCredits: 1000,
    dailyLimit: 50,
  },
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;
export type Plan = keyof typeof PLAN_LIMITS;

export async function checkAndResetCredits(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const needsDailyReset = new Date(user.lastDailyReset) < today;
  const needsMonthlyReset = new Date(user.lastMonthlyReset) < thisMonth;

  if (needsDailyReset) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        dailyUsage: 0,
        lastDailyReset: today,
      },
    });
  }

  if (needsMonthlyReset) {
    const planCredits = PLAN_LIMITS[user.plan as Plan].monthlyCredits;
    await prisma.user.update({
      where: { id: userId },
      data: {
        monthlyCredits: planCredits,
        monthlyUsage: 0,
        lastMonthlyReset: thisMonth,
      },
    });
  }

  return { needsDailyReset, needsMonthlyReset };
}

export async function checkCreditLimit(userId: string, action: CreditAction): Promise<{
  canProceed: boolean;
  reason?: string;
  dailyRemaining: number;
  monthlyRemaining: number;
}> {
  await checkAndResetCredits(userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  const planLimits = PLAN_LIMITS[user.plan as Plan];
  const creditCost = CREDIT_COSTS[action];

  const dailyRemaining = planLimits.dailyLimit - user.dailyUsage;
  const monthlyRemaining = user.monthlyCredits - user.monthlyUsage;

  if (dailyRemaining < creditCost) {
    return {
      canProceed: false,
      reason: 'Daily limit reached',
      dailyRemaining: 0,
      monthlyRemaining,
    };
  }

  if (monthlyRemaining < creditCost) {
    return {
      canProceed: false,
      reason: 'Monthly credits exhausted',
      dailyRemaining,
      monthlyRemaining: 0,
    };
  }

  return {
    canProceed: true,
    dailyRemaining: dailyRemaining - creditCost,
    monthlyRemaining: monthlyRemaining - creditCost,
  };
}

export async function deductCredits(userId: string, action: CreditAction, description?: string) {
  const check = await checkCreditLimit(userId, action);
  
  if (!check.canProceed) {
    throw new Error(check.reason);
  }

  const creditCost = CREDIT_COSTS[action];

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        dailyUsage: {
          increment: creditCost,
        },
        monthlyUsage: {
          increment: creditCost,
        },
      },
    }),
    prisma.creditUsage.create({
      data: {
        userId,
        action,
        creditsUsed: creditCost,
        description,
      },
    }),
  ]);

  return {
    dailyRemaining: check.dailyRemaining,
    monthlyRemaining: check.monthlyRemaining,
  };
}

export async function getUserCreditStatus(userId: string) {
  await checkAndResetCredits(userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      creditUsages: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!user) throw new Error('User not found');

  const planLimits = PLAN_LIMITS[user.plan as Plan];

  return {
    plan: user.plan,
    monthlyCredits: user.monthlyCredits,
    monthlyUsage: user.monthlyUsage,
    dailyUsage: user.dailyUsage,
    monthlyLimit: planLimits.monthlyCredits,
    dailyLimit: planLimits.dailyLimit,
    monthlyRemaining: user.monthlyCredits - user.monthlyUsage,
    dailyRemaining: planLimits.dailyLimit - user.dailyUsage,
    recentUsage: user.creditUsages,
  };
}

export async function upgradePlan(userId: string, newPlan: Plan) {
  const planCredits = PLAN_LIMITS[newPlan].monthlyCredits;
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: newPlan,
      monthlyCredits: planCredits,
    },
  });

  return getUserCreditStatus(userId);
}
