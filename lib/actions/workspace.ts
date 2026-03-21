"use server";

import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROLES } from "@/lib/rbac";

export async function createWorkspace(data: { name: string }) {
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

  const workspace = await db.workspace.create({
    data: {
      name: data.name,
      members: {
        create: {
          userId: user.id,
          role: ROLES.ADMIN,
        },
      },
    },
  });

  revalidatePath("/dashboard");
  return workspace;
}

export async function getUserWorkspaces() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return [];
  }

  const workspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          user: {
            email: session.user.email
          }
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      members: {
        include: {
          user: true
        }
      }
    }
  });

  return workspaces;
}

export async function getWorkspaceById(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!workspace) return null;

  // Security Verification
  const isMember = workspace.members.some(
    (member: { user: { email: string | null } }) => member.user.email === session.user?.email
  );

  if (!isMember) {
    return null;
  }

  return workspace;
}
