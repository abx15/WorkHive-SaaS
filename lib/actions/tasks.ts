"use server";

import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { checkCreditLimit, deductCredits } from "@/lib/credit-middleware";

export async function createTask(data: {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date;
  assigneeId?: string;
  projectId: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  // Get user by email to ensure we have the correct DB id
  const user = await db.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check credit limit
  const creditCheck = await checkCreditLimit(user.id, "TASK_CREATE");
  if (!creditCheck.canProceed) {
    throw new Error(creditCheck.reason || "Insufficient credits");
  }

  // Verify project access
  const project = await db.project.findUnique({
    where: { id: data.projectId },
    include: {
      workspace: {
        include: {
          members: {
            where: { userId: user.id }
          }
        }
      }
    }
  });

  if (!project || project.workspace.members.length === 0) {
    throw new Error("Project not found or access denied");
  }

  try {
    // Create task and deduct credits in a transaction
    const result = await db.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate,
          assigneeId: data.assigneeId,
          projectId: data.projectId,
          createdById: user.id,
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          project: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      });

      // Deduct credits
      await deductCredits(user.id, "TASK_CREATE", `Created task: ${data.title}`);

      return task;
    });

    revalidatePath(`/dashboard/workspace/${project.workspace.id}/project/${data.projectId}`);
    return result;
  } catch (error) {
    throw new Error("Failed to create task");
  }
}

export async function updateTask(data: {
  id: string;
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date;
  assigneeId?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingTask = await db.task.findUnique({
    where: { id: data.id },
    include: {
      project: {
        include: {
          workspace: {
            include: {
              members: {
                where: { userId: user.id }
              }
            }
          }
        }
      }
    }
  });

  if (!existingTask || existingTask.project.workspace.members.length === 0) {
    throw new Error("Task not found or access denied");
  }

  const task = await db.task.update({
    where: { id: data.id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.priority && { priority: data.priority }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
      ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId }),
      ...(data.status && { status: data.status }),
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      project: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });

  revalidatePath(`/dashboard/workspace/${existingTask.project.workspace.id}/project/${existingTask.projectId}`);
  return task;
}

export async function deleteTask(taskId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const task = await db.task.findUnique({
    where: { id: taskId },
    include: {
      project: {
        include: {
          workspace: {
            include: {
              members: {
                where: { userId: user.id }
              }
            }
          }
        }
      }
    }
  });

  if (!task || task.project.workspace.members.length === 0) {
    throw new Error("Task not found or access denied");
  }

  await db.task.delete({
    where: { id: taskId }
  });

  revalidatePath(`/dashboard/workspace/${task.project.workspace.id}/project/${task.projectId}`);
  return { success: true };
}

export async function getTasksByProject(projectId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return [];
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    return [];
  }

  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      workspace: {
        include: {
          members: {
            where: { userId: user.id }
          }
        }
      }
    }
  });

  if (!project || project.workspace.members.length === 0) {
    return [];
  }

  const tasks = await db.task.findMany({
    where: { projectId },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return tasks;
}
