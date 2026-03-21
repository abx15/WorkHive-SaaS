import { NextRequest, NextResponse } from 'next/server';
import { createAuthenticatedHandler, AuthenticatedUser } from '@/lib/simple-rbac';
import { PERMISSIONS } from '@/lib/rbac';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function handleUpdateTask(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string; taskId: string } }) {
  try {
    const body = await request.json();
    const { title, description, status, priority, dueDate, assigneeId } = body;

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

    // Get the current task to check permissions
    const currentTask = await db.task.findUnique({
      where: { id: params.taskId },
      include: {
        project: true,
      },
    });

    if (!currentTask || currentTask.project.workspaceId !== params.id) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Check if user has permission (MANAGER/ADMIN can edit any task, MEMBER can only edit assigned tasks)
    const userRole = workspace.members[0].role;
    if (userRole === 'MEMBER' && currentTask.assigneeId !== user.id) {
      return NextResponse.json(
        { error: 'You can only edit tasks assigned to you' },
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

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (assigneeId !== undefined) updateData.assigneeId = assigneeId || null;

    const task = await db.task.update({
      where: { id: params.taskId },
      data: updateData,
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
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

async function handleDeleteTask(user: AuthenticatedUser, request: NextRequest, { params }: { params: { id: string; projectId: string; taskId: string } }) {
  try {
    // Verify user is a member of this workspace and has proper permissions
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

    // Get the current task
    const currentTask = await db.task.findUnique({
      where: { id: params.taskId },
      include: {
        project: true,
      },
    });

    if (!currentTask || currentTask.project.workspaceId !== params.id) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Check if user has permission (MANAGER/ADMIN can delete any task, MEMBER can only delete assigned tasks they created)
    const userRole = workspace.members[0].role;
    if (userRole === 'MEMBER' && (currentTask.assigneeId !== user.id || currentTask.createdById !== user.id)) {
      return NextResponse.json(
        { error: 'You can only delete tasks assigned to you or created by you' },
        { status: 403 }
      );
    }

    await db.task.delete({
      where: { id: params.taskId },
    });

    revalidatePath(`/workspace/${params.id}/projects/${params.projectId}`);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}

export const PUT = createAuthenticatedHandler(handleUpdateTask, PERMISSIONS.WORK_ON_TASKS);
export const DELETE = createAuthenticatedHandler(handleDeleteTask, PERMISSIONS.MANAGE_TASKS);
