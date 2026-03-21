import { Role } from '@prisma/client';
import { hasPermission, hasMinimumRole, PERMISSIONS, ROLES } from '@/lib/rbac';
import { ReactNode } from 'react';

interface RoleGuardProps {
  userRole: Role;
  permission?: keyof typeof PERMISSIONS;
  minimumRole?: Role;
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({ 
  userRole, 
  permission, 
  minimumRole, 
  children, 
  fallback = null 
}: RoleGuardProps) {
  let hasAccess = true;

  if (permission) {
    hasAccess = hasPermission(userRole, permission);
  } else if (minimumRole) {
    hasAccess = hasMinimumRole(userRole, minimumRole);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

interface AdminOnlyProps {
  userRole: Role;
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminOnly({ userRole, children, fallback = null }: AdminOnlyProps) {
  return (
    <RoleGuard userRole={userRole} minimumRole={ROLES.ADMIN} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

interface ManagerOnlyProps {
  userRole: Role;
  children: ReactNode;
  fallback?: ReactNode;
}

export function ManagerOnly({ userRole, children, fallback = null }: ManagerOnlyProps) {
  return (
    <RoleGuard userRole={userRole} minimumRole={ROLES.MANAGER} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
