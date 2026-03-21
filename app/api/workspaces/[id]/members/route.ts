import { NextRequest, NextResponse } from 'next/server';
import { withAuth, withPermission, AuthenticatedUser } from '@/lib/api-middleware';
import { PERMISSIONS } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleGetMembers(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is a member of this workspace
    const workspace = await db.workspace.findUnique({
      where: { id: params.id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    const isMember = workspace.members.some(member => member.userId === user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(workspace.members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

async function handleAddMember(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { email, role = 'MEMBER' } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user is an admin of this workspace
    const workspace = await db.workspace.findUnique({
      where: { id: params.id },
      include: {
        members: {
          where: {
            userId: user.id,
            role: 'ADMIN',
          },
        },
      },
    });

    if (!workspace || workspace.members.length === 0) {
      return NextResponse.json(
        { error: 'Access denied. Only admins can add members.' },
        { status: 403 }
      );
    }

    // Find the user to add
    const userToAdd = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!userToAdd) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const existingMember = await db.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: userToAdd.id,
          workspaceId: params.id,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: 'User is already a member of this workspace' },
        { status: 409 }
      );
    }

    // Add the new member
    const newMember = await db.member.create({
      data: {
        userId: userToAdd.id,
        workspaceId: params.id,
        role: role.toUpperCase(),
      },
      include: {
        user: true,
      },
    });

    revalidatePath('/dashboard');
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handleGetMembers);
export const POST = withPermission(PERMISSIONS.MANAGE_USERS, handleAddMember);
