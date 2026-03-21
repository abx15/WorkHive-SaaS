import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data
  await prisma.creditUsage.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.member.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();
  console.log('🧹 Cleaned existing data');

  // Create demo users
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@workhive.com',
      password: hashedPassword,
      plan: 'ENTERPRISE',
      monthlyCredits: 1000,
      dailyUsage: 15,
      monthlyUsage: 145,
    },
  });

  const managerUser = await prisma.user.create({
    data: {
      name: 'Manager User',
      email: 'manager@workhive.com',
      password: hashedPassword,
      plan: 'PRO',
      monthlyCredits: 500,
      dailyUsage: 8,
      monthlyUsage: 87,
    },
  });

  const memberUser = await prisma.user.create({
    data: {
      name: 'Member User',
      email: 'member@workhive.com',
      password: hashedPassword,
      plan: 'FREE',
      monthlyCredits: 100,
      dailyUsage: 3,
      monthlyUsage: 23,
    },
  });

  const secondMember = await prisma.user.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah@workhive.com',
      password: hashedPassword,
      plan: 'PRO',
      monthlyCredits: 500,
      dailyUsage: 12,
      monthlyUsage: 134,
    },
  });

  console.log('👥 Created demo users');

  // Create workspaces
  const demoWorkspace = await prisma.workspace.create({
    data: {
      name: 'WorkHive Demo Workspace',
    },
  });

  const startupWorkspace = await prisma.workspace.create({
    data: {
      name: 'Startup Team Workspace',
    },
  });

  console.log('🏢 Created workspaces');

  // Create memberships
  await prisma.member.createMany({
    data: [
      {
        userId: adminUser.id,
        workspaceId: demoWorkspace.id,
        role: 'ADMIN',
      },
      {
        userId: managerUser.id,
        workspaceId: demoWorkspace.id,
        role: 'MANAGER',
      },
      {
        userId: memberUser.id,
        workspaceId: demoWorkspace.id,
        role: 'MEMBER',
      },
      {
        userId: secondMember.id,
        workspaceId: demoWorkspace.id,
        role: 'MEMBER',
      },
      {
        userId: adminUser.id,
        workspaceId: startupWorkspace.id,
        role: 'ADMIN',
      },
      {
        userId: managerUser.id,
        workspaceId: startupWorkspace.id,
        role: 'MANAGER',
      },
      {
        userId: secondMember.id,
        workspaceId: startupWorkspace.id,
        role: 'MEMBER',
      },
    ],
  });

  console.log('👋 Created memberships');

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design principles',
      workspaceId: demoWorkspace.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Native mobile app for iOS and Android platforms',
      workspaceId: demoWorkspace.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Marketing Campaign',
      description: 'Q4 marketing campaign for product launch',
      workspaceId: startupWorkspace.id,
    },
  });

  console.log('📁 Created projects');

  // Create tasks
  await prisma.task.createMany({
    data: [
      // Website Redesign tasks
      {
        title: 'Design homepage mockup',
        description: 'Create initial design concepts for the new homepage',
        status: 'DONE',
        priority: 'HIGH',
        projectId: project1.id,
        createdById: adminUser.id,
        assigneeId: secondMember.id,
        dueDate: new Date('2024-01-15'),
      },
      {
        title: 'Implement responsive layout',
        description: 'Convert design to responsive HTML/CSS',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: project1.id,
        createdById: managerUser.id,
        assigneeId: memberUser.id,
        dueDate: new Date('2024-01-20'),
      },
      {
        title: 'Add contact form',
        description: 'Implement functional contact form with validation',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: project1.id,
        createdById: managerUser.id,
        assigneeId: memberUser.id,
        dueDate: new Date('2024-01-25'),
      },
      {
        title: 'Optimize images',
        description: 'Compress and optimize all website images',
        status: 'TODO',
        priority: 'LOW',
        projectId: project1.id,
        createdById: adminUser.id,
        dueDate: new Date('2024-01-30'),
      },
      
      // Mobile App Development tasks
      {
        title: 'Setup development environment',
        description: 'Configure React Native and necessary dependencies',
        status: 'DONE',
        priority: 'HIGH',
        projectId: project2.id,
        createdById: adminUser.id,
        assigneeId: secondMember.id,
        dueDate: new Date('2024-01-10'),
      },
      {
        title: 'Create user authentication',
        description: 'Implement login and registration functionality',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: project2.id,
        createdById: managerUser.id,
        assigneeId: secondMember.id,
        dueDate: new Date('2024-01-22'),
      },
      {
        title: 'Design app navigation',
        description: 'Create intuitive navigation flow for the app',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: project2.id,
        createdById: managerUser.id,
        assigneeId: memberUser.id,
        dueDate: new Date('2024-01-28'),
      },
      
      // Marketing Campaign tasks
      {
        title: 'Market research analysis',
        description: 'Analyze target market and competitor strategies',
        status: 'DONE',
        priority: 'HIGH',
        projectId: project3.id,
        createdById: adminUser.id,
        assigneeId: managerUser.id,
        dueDate: new Date('2024-01-12'),
      },
      {
        title: 'Create social media content',
        description: 'Design and schedule social media posts',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        projectId: project3.id,
        createdById: managerUser.id,
        assigneeId: secondMember.id,
        dueDate: new Date('2024-01-26'),
      },
      {
        title: 'Email campaign setup',
        description: 'Configure email marketing automation',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: project3.id,
        createdById: managerUser.id,
        dueDate: new Date('2024-02-01'),
      },
    ],
  });

  console.log('✅ Created tasks');

  // Create some credit usage records
  await prisma.creditUsage.createMany({
    data: [
      {
        userId: adminUser.id,
        action: 'WORKSPACE_CREATE',
        creditsUsed: 5,
        description: 'Created WorkHive Demo Workspace',
      },
      {
        userId: adminUser.id,
        action: 'PROJECT_CREATE',
        creditsUsed: 3,
        description: 'Created Website Redesign project',
      },
      {
        userId: managerUser.id,
        action: 'TASK_CREATE',
        creditsUsed: 1,
        description: 'Created task: Design homepage mockup',
      },
      {
        userId: memberUser.id,
        action: 'TASK_CREATE',
        creditsUsed: 1,
        description: 'Created task: Implement responsive layout',
      },
      {
        userId: secondMember.id,
        action: 'AI_USAGE',
        creditsUsed: 2,
        description: 'Used AI for design suggestions',
      },
    ],
  });

  console.log('💳 Created credit usage records');

  // Print summary
  const userCount = await prisma.user.count();
  const workspaceCount = await prisma.workspace.count();
  const projectCount = await prisma.project.count();
  const taskCount = await prisma.task.count();

  console.log('\n🎉 Database seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   Users: ${userCount}`);
  console.log(`   Workspaces: ${workspaceCount}`);
  console.log(`   Projects: ${projectCount}`);
  console.log(`   Tasks: ${taskCount}`);
  console.log('\n🔐 Demo Credentials:');
  console.log(`   Admin: admin@workhive.com / 123456`);
  console.log(`   Manager: manager@workhive.com / 123456`);
  console.log(`   Member: member@workhive.com / 123456`);
  console.log(`   Sarah: sarah@workhive.com / 123456`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
