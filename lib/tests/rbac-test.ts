import { 
  hasPermission, 
  hasMinimumRole, 
  canManageUsers, 
  canCreateProjects,
  canEditProjects,
  canViewProjects,
  canManageTasks,
  canWorkOnTasks,
  ROLES,
  PERMISSIONS 
} from '@/lib/rbac';

// Test RBAC functionality
export function testRBAC() {
  console.log('🧪 Testing RBAC System...\n');

  // Test role hierarchy
  console.log('📊 Testing Role Hierarchy:');
  console.log(`ADMIN > MANAGER: ${hasMinimumRole(ROLES.ADMIN, ROLES.MANAGER)}`);
  console.log(`MANAGER > MEMBER: ${hasMinimumRole(ROLES.MANAGER, ROLES.MEMBER)}`);
  console.log(`ADMIN > MEMBER: ${hasMinimumRole(ROLES.ADMIN, ROLES.MEMBER)}`);
  console.log(`MEMBER > ADMIN: ${hasMinimumRole(ROLES.MEMBER, ROLES.ADMIN)}`);
  console.log(`MANAGER > ADMIN: ${hasMinimumRole(ROLES.MANAGER, ROLES.ADMIN)}`);

  // Test permissions by role
  console.log('\n🔐 Testing Permissions by Role:');
  
  const roles = [ROLES.ADMIN, ROLES.MANAGER, ROLES.MEMBER];
  const permissions = [
    { name: 'MANAGE_USERS', fn: canManageUsers },
    { name: 'CREATE_PROJECTS', fn: canCreateProjects },
    { name: 'EDIT_PROJECTS', fn: canEditProjects },
    { name: 'VIEW_PROJECTS', fn: canViewProjects },
    { name: 'MANAGE_TASKS', fn: canManageTasks },
    { name: 'WORK_ON_TASKS', fn: canWorkOnTasks },
  ];

  roles.forEach(role => {
    console.log(`\n${role}:`);
    permissions.forEach(({ name, fn }) => {
      console.log(`  ${name}: ${fn(role) ? '✅' : '❌'}`);
    });
  });

  // Test specific permission checks
  console.log('\n🎯 Testing Specific Permission Checks:');
  
  // Admin should have all permissions
  const adminPermissions = Object.values(PERMISSIONS);
  const adminHasAllPermissions = adminPermissions.every(permission => 
    hasPermission(ROLES.ADMIN, permission)
  );
  console.log(`Admin has all permissions: ${adminHasAllPermissions ? '✅' : '❌'}`);

  // Manager should not be able to manage users
  const managerCannotManageUsers = !hasPermission(ROLES.MANAGER, PERMISSIONS.MANAGE_USERS);
  console.log(`Manager cannot manage users: ${managerCannotManageUsers ? '✅' : '❌'}`);

  // Member should only be able to view projects and work on tasks
  const memberCanViewProjects = hasPermission(ROLES.MEMBER, PERMISSIONS.VIEW_PROJECTS);
  const memberCanWorkOnTasks = hasPermission(ROLES.MEMBER, PERMISSIONS.WORK_ON_TASKS);
  const memberCannotCreateProjects = !hasPermission(ROLES.MEMBER, PERMISSIONS.CREATE_PROJECTS);
  console.log(`Member can view projects: ${memberCanViewProjects ? '✅' : '❌'}`);
  console.log(`Member can work on tasks: ${memberCanWorkOnTasks ? '✅' : '❌'}`);
  console.log(`Member cannot create projects: ${memberCannotCreateProjects ? '✅' : '❌'}`);

  console.log('\n✅ RBAC System Test Complete!');
}

// Run test if this file is executed directly
if (require.main === module) {
  testRBAC();
}
