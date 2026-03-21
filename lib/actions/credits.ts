"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getUserCreditStatus } from "@/lib/credit-middleware";

export async function getUserCredits() {
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

  try {
    const creditStatus = await getUserCreditStatus(user.id);
    return creditStatus;
  } catch (error) {
    throw new Error("Failed to fetch credit status");
  }
}
