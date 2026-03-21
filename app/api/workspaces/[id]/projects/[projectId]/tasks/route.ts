import { NextRequest, NextResponse } from 'next/server';
import { createAuthenticatedHandler, AuthenticatedUser } from '@/lib/simple-rbac';
import { PERMISSIONS } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleGetTasks(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string } }) {
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

    const tasks = await db.task.findMany({
      where: { 
        projectId: params.projectId,
        project: {
          workspaceId: params.id
        }
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

async function handleCreateTask(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string } }) {
  try {
    const body = await request.json();
    const { title, description, priority, dueDate, assigneeId } = body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Task title is required' },
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

    // If assigneeId is provided, verify they are a workspace member
    if (assigneeId) {
      const assigneeMember = await db.member.findUnique({
        where: {
          userId_workspaceId: {
            userId: assigneeId,
            workspaceId: params.id,
          },
        },
      });

      if (!assigneeMember) {
        return NextResponse.json(
          { error: 'Assignee must be a workspace member' },
          { status: 400 }
        );
      }
    }

    const task = await db.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: params.projectId,
        assigneeId: assigneeId || null,
        createdById: user.id,
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    revalidatePath(`/workspace/${params.id}/projects/${params.projectId}`);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export const GET = createAuthenticatedHandler(handleGetTasks, PERMISSIONS.VIEW_PROJECTS);
export const POST = createAuthenticatedHandler(handleCreateTask, PERMISSIONS.MANAGE_TASKS);
