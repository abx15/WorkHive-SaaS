"use server";

import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { checkCreditLimit, deductCredits } from "@/lib/credit-middleware";

export async function createProject(data: {
  name: string;
  description?: string;
  workspaceId: string;
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
  const creditCheck = await checkCreditLimit(user.id, "PROJECT_CREATE");
  if (!creditCheck.canProceed) {
    throw new Error(creditCheck.reason || "Insufficient credits");
  }

  // Verify workspace access
  const workspace = await db.workspace.findUnique({
    where: { id: data.workspaceId },
    include: {
      members: {
        where: { userId: user.id }
      }
    }
  });

  if (!workspace || workspace.members.length === 0) {
    throw new Error("Workspace not found or access denied");
  }

  try {
    // Create project and deduct credits in a transaction
    const result = await db.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name: data.name,
          description: data.description,
          workspaceId: data.workspaceId,
        },
        include: {
          tasks: {
            select: {
              id: true,
              title: true,
              status: true,
              priority: true,
            }
          },
          _count: {
            select: {
              tasks: true,
            }
          }
        }
      });

      // Deduct credits
      await deductCredits(user.id, "PROJECT_CREATE", `Created project: ${data.name}`);

      return project;
    });

    revalidatePath(`/dashboard/workspace/${data.workspaceId}`);
    return result;
  } catch (error) {
    throw new Error("Failed to create project");
  }
}

export async function updateProject(data: {
  id: string;
  name?: string;
  description?: string;
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

  const existingProject = await db.project.findUnique({
    where: { id: data.id },
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

  if (!existingProject || existingProject.workspace.members.length === 0) {
    throw new Error("Project not found or access denied");
  }

  const project = await db.project.update({
    where: { id: data.id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
    },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
        }
      },
      _count: {
        select: {
          tasks: true,
        }
      }
    }
  });

  revalidatePath(`/dashboard/workspace/${existingProject.workspaceId}`);
  return project;
}

export async function deleteProject(projectId: string) {
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
    throw new Error("Project not found or access denied");
  }

  await db.project.delete({
    where: { id: projectId }
  });

  revalidatePath(`/dashboard/workspace/${project.workspaceId}`);
  return { success: true };
}

export async function getProjectsByWorkspace(workspaceId: string) {
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

  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      members: {
        where: { userId: user.id }
      }
    }
  });

  if (!workspace || workspace.members.length === 0) {
    return [];
  }

  const projects = await db.project.findMany({
    where: { workspaceId },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
        }
      },
      _count: {
        select: {
          tasks: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return projects;
}
