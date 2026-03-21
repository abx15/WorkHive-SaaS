import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requirePermission, AuthenticatedUser } from '@/lib/middleware';
import { PERMISSIONS } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleCreateWorkspace(user: AuthenticatedUser, request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Workspace name is required' },
        { status: 400 }
      );
    }

    const workspace = await db.workspace.create({
      data: {
        name: name.trim(),
        members: {
          create: {
            userId: user.id,
            role: 'ADMIN',
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    revalidatePath('/dashboard');
    return NextResponse.json(workspace, { status: 201 });
  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json(
      { error: 'Failed to create workspace' },
      { status: 500 }
    );
  }
}

async function handleGetWorkspaces(user: AuthenticatedUser, request: NextRequest) {
  try {
    const workspaces = await db.workspace.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workspaces' },
      { status: 500 }
    );
  }
}

export const POST = requirePermission(PERMISSIONS.CREATE_PROJECTS)(handleCreateWorkspace);
export const GET = requireAuth(handleGetWorkspaces);
