import { NextRequest, NextResponse } from 'next/server';
import { withPermission, AuthenticatedUser } from '@/lib/api-middleware';
import { PERMISSIONS } from '@/lib/rbac';
import { ROLES } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleUpdateMemberRole(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; memberId: string } }) {
  try {
    const body = await request.json();
    const { role } = body;

    if (!role || !Object.values(ROLES).includes(role.toUpperCase())) {
      return NextResponse.json(
        { error: 'Valid role is required (ADMIN, MANAGER, MEMBER)' },
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
        { error: 'Access denied. Only admins can change member roles.' },
        { status: 403 }
      );
    }

    // Find the member to update
    const memberToUpdate = await db.member.findUnique({
      where: { id: params.memberId },
      include: { user: true },
    });

    if (!memberToUpdate || memberToUpdate.workspaceId !== params.id) {
      return NextResponse.json(
        { error: 'Member not found in this workspace' },
        { status: 404 }
      );
    }

    // Prevent admin from changing their own role (to avoid locking themselves out)
    if (memberToUpdate.userId === user.id) {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 400 }
      );
    }

    // Update the member role
    const updatedMember = await db.member.update({
      where: { id: params.memberId },
      data: { role: role.toUpperCase() },
      include: {
        user: true,
      },
    });

    revalidatePath('/dashboard');
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating member role:', error);
    return NextResponse.json(
      { error: 'Failed to update member role' },
      { status: 500 }
    );
  }
}

async function handleRemoveMember(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; memberId: string } }) {
  try {
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
        { error: 'Access denied. Only admins can remove members.' },
        { status: 403 }
      );
    }

    // Find the member to remove
    const memberToRemove = await db.member.findUnique({
      where: { id: params.memberId },
    });

    if (!memberToRemove || memberToRemove.workspaceId !== params.id) {
      return NextResponse.json(
        { error: 'Member not found in this workspace' },
        { status: 404 }
      );
    }

    // Prevent admin from removing themselves
    if (memberToRemove.userId === user.id) {
      return NextResponse.json(
        { error: 'Cannot remove yourself from the workspace' },
        { status: 400 }
      );
    }

    // Remove the member
    await db.member.delete({
      where: { id: params.memberId },
    });

    revalidatePath('/dashboard');
    return NextResponse.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error removing member:', error);
    return NextResponse.json(
      { error: 'Failed to remove member' },
      { status: 500 }
    );
  }
}

export const PUT = withPermission(PERMISSIONS.MANAGE_USERS, handleUpdateMemberRole);
export const DELETE = withPermission(PERMISSIONS.MANAGE_USERS, handleRemoveMember);
