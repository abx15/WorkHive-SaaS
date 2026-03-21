import { Role } from '@prisma/client';

export const ROLES = {
  ADMIN: 'ADMIN' as Role,
  MANAGER: 'MANAGER' as Role,
  MEMBER: 'MEMBER' as Role,
} as const;

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.MANAGER]: 2,
  [ROLES.MEMBER]: 1,
} as const;

export const PERMISSIONS = {
  // Workspace permissions
  MANAGE_USERS: 'MANAGE_USERS',
  DELETE_WORKSPACE: 'DELETE_WORKSPACE',
  MANAGE_BILLING: 'MANAGE_BILLING',
  
  // Project permissions
  CREATE_PROJECTS: 'CREATE_PROJECTS',
  EDIT_PROJECTS: 'EDIT_PROJECTS',
  VIEW_PROJECTS: 'VIEW_PROJECTS',
  
  // Task permissions
  MANAGE_TASKS: 'MANAGE_TASKS',
  VIEW_ASSIGNED_TASKS: 'VIEW_ASSIGNED_TASKS',
  WORK_ON_TASKS: 'WORK_ON_TASKS',
} as const;

type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.DELETE_WORKSPACE,
    PERMISSIONS.MANAGE_BILLING,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_ASSIGNED_TASKS,
    PERMISSIONS.WORK_ON_TASKS,
  ],
  MANAGER: [
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.MANAGE_TASKS,
    PERMISSIONS.VIEW_ASSIGNED_TASKS,
    PERMISSIONS.WORK_ON_TASKS,
  ],
  MEMBER: [
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.VIEW_ASSIGNED_TASKS,
    PERMISSIONS.WORK_ON_TASKS,
  ],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  return rolePermissions?.includes(permission) || false;
}

export function hasMinimumRole(userRole: Role, minimumRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}

export function canManageUsers(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.MANAGE_USERS);
}

export function canChangeRoles(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.MANAGE_USERS);
}

export function canDeleteWorkspace(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.DELETE_WORKSPACE);
}

export function canManageBilling(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.MANAGE_BILLING);
}

export function canCreateProjects(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.CREATE_PROJECTS);
}

export function canEditProjects(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.EDIT_PROJECTS);
}

export function canViewProjects(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.VIEW_PROJECTS);
}

export function canManageTasks(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.MANAGE_TASKS);
}

export function canViewAssignedTasks(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.VIEW_ASSIGNED_TASKS);
}

export function canWorkOnTasks(userRole: Role): boolean {
  return hasPermission(userRole, PERMISSIONS.WORK_ON_TASKS);
}

export function getRoleDisplayName(role: Role): string {
  switch (role) {
    case ROLES.ADMIN:
      return 'Admin';
    case ROLES.MANAGER:
      return 'Manager';
    case ROLES.MEMBER:
      return 'Member';
    default:
      return 'Unknown';
  }
}

export function getRoleBadgeVariant(role: Role): 'default' | 'secondary' | 'destructive' {
  switch (role) {
    case ROLES.ADMIN:
      return 'destructive';
    case ROLES.MANAGER:
      return 'default';
    case ROLES.MEMBER:
      return 'secondary';
    default:
      return 'secondary';
  }
}
