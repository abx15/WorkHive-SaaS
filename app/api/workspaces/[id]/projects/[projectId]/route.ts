import { NextRequest, NextResponse } from 'next/server';
import { createAuthenticatedHandler, AuthenticatedUser } from '@/lib/simple-rbac';
import { PERMISSIONS } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleGetProject(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string } }) {
  try {
    // Verify user is a member of this workspace
    const workspace = await db.workspace.findUnique({
      where: { id: params.id },
      include: {
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!workspace || workspace.members.length === 0) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const project = await db.project.findUnique({
      where: { 
        id: params.projectId,
        workspaceId: params.id 
      },
      include: {
        tasks: {
          include: {
            assignee: {
              select: { id: true, name: true, email: true },
            },
            createdBy: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

async function handleUpdateProject(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string } }) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    // Verify user is a member of this workspace
    const workspace = await db.workspace.findUnique({
      where: { id: params.id },
      include: {
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!workspace || workspace.members.length === 0) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const project = await db.project.update({
      where: { 
        id: params.projectId,
        workspaceId: params.id 
      },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
      include: {
        tasks: {
          include: {
            assignee: {
              select: { id: true, name: true, email: true },
            },
            createdBy: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    revalidatePath(`/workspace/${params.id}/projects/${params.projectId}`);
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

async function handleDeleteProject(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string } }) {
  try {
    // Verify user is a member of this workspace
    const workspace = await db.workspace.findUnique({
      where: { id: params.id },
      include: {
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!workspace || workspace.members.length === 0) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    await db.project.delete({
      where: { 
        id: params.projectId,
        workspaceId: params.id 
      },
    });

    revalidatePath(`/workspace/${params.id}/projects`);
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

export const GET = createAuthenticatedHandler(handleGetProject, PERMISSIONS.VIEW_PROJECTS);
export const PUT = createAuthenticatedHandler(handleUpdateProject, PERMISSIONS.EDIT_PROJECTS);
export const DELETE = createAuthenticatedHandler(handleDeleteProject, PERMISSIONS.DELETE_PROJECTS);
