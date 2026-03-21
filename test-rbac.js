// Simple RBAC test without TypeScript compilation
const { ROLES, PERMISSIONS } = require('./lib/rbac.js');

// Test basic role hierarchy
console.log('🧪 Testing RBAC System...\n');

console.log('📊 Role Definitions:');
console.log('ADMIN:', ROLES.ADMIN);
console.log('MANAGER:', ROLES.MANAGER);
console.log('MEMBER:', ROLES.MEMBER);

console.log('\n🔐 Permission Definitions:');
Object.entries(PERMISSIONS).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

console.log('\n✅ Basic RBAC definitions loaded successfully!');
