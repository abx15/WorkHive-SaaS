import { checkCreditLimit, deductCredits, getUserCreditStatus, CREDIT_COSTS, PLAN_LIMITS } from './credit-middleware';

// Test function to verify credit system
export async function testCreditSystem(userId: string) {
  console.log('Testing Credit System...');
  
  try {
    // Test 1: Check initial credit status
    console.log('\n1. Checking initial credit status...');
    const initialStatus = await getUserCreditStatus(userId);
    console.log('Initial status:', initialStatus);
    
    // Test 2: Check credit limits for different actions
    console.log('\n2. Testing credit limit checks...');
    const taskCheck = await checkCreditLimit(userId, 'TASK_CREATE');
    console.log('Task creation check:', taskCheck);
    
    const projectCheck = await checkCreditLimit(userId, 'PROJECT_CREATE');
    console.log('Project creation check:', projectCheck);
    
    const workspaceCheck = await checkCreditLimit(userId, 'WORKSPACE_CREATE');
    console.log('Workspace creation check:', workspaceCheck);
    
    // Test 3: Try to deduct credits
    console.log('\n3. Testing credit deduction...');
    if (taskCheck.canProceed) {
      const deduction = await deductCredits(userId, 'TASK_CREATE', 'Test task creation');
      console.log('Credits deducted:', deduction);
    }
    
    // Test 4: Check status after deduction
    console.log('\n4. Checking status after deduction...');
    const finalStatus = await getUserCreditStatus(userId);
    console.log('Final status:', finalStatus);
    
    // Test 5: Display credit costs and plan limits
    console.log('\n5. Credit costs:');
    console.log(CREDIT_COSTS);
    
    console.log('\n6. Plan limits:');
    console.log(PLAN_LIMITS);
    
    console.log('\n✅ Credit system test completed successfully!');
    return {
      success: true,
      initialStatus,
      finalStatus,
      creditCosts: CREDIT_COSTS,
      planLimits: PLAN_LIMITS
    };
    
  } catch (error) {
    console.error('❌ Credit system test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Usage example (this would be called from a test route or API endpoint)
export async function runCreditTest() {
  // This would need a real user ID to test
  // For now, it's just a demonstration of the test structure
  console.log('Credit test function ready - requires valid user ID');
}
