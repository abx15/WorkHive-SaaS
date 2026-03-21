import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { Role, hasPermission, hasMinimumRole, PERMISSIONS, ROLES } from '@/lib/rbac';

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

export function requireAuth(handler: (user: AuthenticatedUser, request: NextRequest, ...args: unknown[]) => Promise<NextResponse>) {
  return async (request: NextRequest, ...args: unknown[]): Promise<NextResponse> => {
    const user = await authenticateUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(user, request, ...args);
  };
}

export function requirePermission(permission: keyof typeof PERMISSIONS) {
  return (handler: (user: AuthenticatedUser, request: NextRequest, ...args: unknown[]) => Promise<NextResponse>) => {
    return requireAuth(async (user: AuthenticatedUser, request: NextRequest, ...args: unknown[]) => {
      if (!hasPermission(user.role, permission)) {
        return NextResponse.json(
          { error: 'Forbidden: Insufficient permissions' },
          { status: 403 }
        );
      }

      return handler(user, request, ...args);
    });
  };
}

export function requireMinimumRole(minimumRole: Role) {
  return (handler: (user: AuthenticatedUser, request: NextRequest) => Promise<NextResponse>) => {
    return requireAuth(async (user: AuthenticatedUser, request: NextRequest) => {
      if (!hasMinimumRole(user.role, minimumRole)) {
        return NextResponse.json(
          { error: 'Forbidden: Insufficient role' },
          { status: 403 }
        );
      }

      return handler(user, request);
    });
  };
}

export function requireAdmin(handler: (user: AuthenticatedUser, request: NextRequest) => Promise<NextResponse>) {
  return requireMinimumRole(ROLES.ADMIN)(handler);
}

export function requireManager(handler: (user: AuthenticatedUser, request: NextRequest) => Promise<NextResponse>) {
  return requireMinimumRole(ROLES.MANAGER)(handler);
}

// Helper function to check if user can access a specific workspace
export async function canAccessWorkspace(userId: string, workspaceId: string): Promise<boolean> {
  const membership = await db.member.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId
      }
    }
  });

  return !!membership;
}

// Helper function to get user's role in a workspace
export async function getUserRoleInWorkspace(userId: string, workspaceId: string): Promise<Role | null> {
  const membership = await db.member.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId
      }
    }
  });

  return membership?.role || null;
}
