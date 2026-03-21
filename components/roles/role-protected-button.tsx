import { Button } from '@/components/ui/button';
import { Role } from '@prisma/client';
import { hasPermission, PERMISSIONS } from '@/lib/rbac';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RoleProtectedButtonProps {
  userRole: Role;
  permission: keyof typeof PERMISSIONS;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function RoleProtectedButton({
  userRole,
  permission,
  children,
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  onClick,
  type = 'button',
}: RoleProtectedButtonProps) {
  const hasRequiredPermission = hasPermission(userRole, permission);
  const isDisabled = disabled || !hasRequiredPermission;

  const button = (
    <Button
      className={className}
      variant={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );

  if (!hasRequiredPermission) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>You don't have permission to perform this action.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
