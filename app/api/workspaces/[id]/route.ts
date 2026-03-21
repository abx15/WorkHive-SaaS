import { NextRequest, NextResponse } from 'next/server';
import { createAuthenticatedHandler, AuthenticatedUser } from '@/lib/simple-rbac';
import { PERMISSIONS } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleGetWorkspace(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string } }) {
  try {
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

    // Check if user is a member of this workspace
    const isMember = workspace.members.some(member => member.userId === user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(workspace);
  } catch (error) {
    console.error('Error fetching workspace:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workspace' },
      { status: 500 }
    );
  }
}

async function handleUpdateWorkspace(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Workspace name is required' },
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
        { error: 'Access denied. Only admins can update workspaces.' },
        { status: 403 }
      );
    }

    const updatedWorkspace = await db.workspace.update({
      where: { id: params.id },
      data: { name: name.trim() },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    revalidatePath('/dashboard');
    return NextResponse.json(updatedWorkspace);
  } catch (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json(
      { error: 'Failed to update workspace' },
      { status: 500 }
    );
  }
}

async function handleDeleteWorkspace(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string } }) {
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
        { error: 'Access denied. Only admins can delete workspaces.' },
        { status: 403 }
      );
    }

    await db.workspace.delete({
      where: { id: params.id },
    });

    revalidatePath('/dashboard');
    return NextResponse.json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    console.error('Error deleting workspace:', error);
    return NextResponse.json(
      { error: 'Failed to delete workspace' },
      { status: 500 }
    );
  }
}

export const GET = createAuthenticatedHandler(handleGetWorkspace);
export const PUT = createAuthenticatedHandler(handleUpdateWorkspace, PERMISSIONS.EDIT_PROJECTS);
export const DELETE = createAuthenticatedHandler(handleDeleteWorkspace, PERMISSIONS.DELETE_WORKSPACE);
