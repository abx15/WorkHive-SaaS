import { Badge } from '@/components/ui/badge';
import { Role } from '@prisma/client';
import { getRoleDisplayName, getRoleBadgeVariant } from '@/lib/rbac';

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const displayName = getRoleDisplayName(role);
  const variant = getRoleBadgeVariant(role);

  return (
    <Badge variant={variant} className={className}>
      {displayName}
    </Badge>
  );
}
