"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Role } from "@prisma/client";

interface CurrentUser {
  id: string;
  email: string;
  name?: string;
  role?: Role;
  workspaceId?: string;
}

export function useCurrentUser() {
  const { data: session } = useSession();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      if (!session?.user?.email) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/current');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, [session]);

  return { user, loading };
}
