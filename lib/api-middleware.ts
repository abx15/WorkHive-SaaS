import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { hasPermission, PERMISSIONS } from '@/lib/rbac';
import { Role } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string;
  role: Role;
  workspaceId: string;
}

export async function authenticateUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      memberships: {
        include: {
          workspace: true
        }
      }
    }
  });

  if (!user) {
    return null;
  }

  // For now, we'll use the first workspace. In a real app, you might
  // determine this from subdomain, query params, or user selection
  const membership = user.memberships[0];
  if (!membership) {
    return null;
  }

  return {
    id: user.id,
    email: user.email!,
    name: user.name || undefined,
    role: membership.role,
    workspaceId: membership.workspaceId,
  };
}

export function withAuth<T extends any[]>(
  handler: (user: AuthenticatedUser, request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: { params?: Promise<any> }): Promise<NextResponse> => {
    const user = await authenticateUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Handle Next.js 16+ route handler context
    if (context && context.params) {
      const params = await context.params;
      return handler(user, request, params);
    }

    return handler(user, request);
  };
}

export function withPermission<T extends any[]>(
  permission: keyof typeof PERMISSIONS,
  handler: (user: AuthenticatedUser, request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withAuth(async (user: AuthenticatedUser, request: NextRequest, ...args: T) => {
    if (!hasPermission(user.role, permission)) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(user, request, ...args);
  });
}
