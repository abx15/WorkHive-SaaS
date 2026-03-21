"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { WorkspaceSwitcher } from "./workspace/WorkspaceSwitcher";

export function Navbar({ showSwitcher }: { showSwitcher?: boolean }) {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-md flex items-center justify-center font-bold text-primary-foreground">
              W
            </div>
            <span className="font-bold text-xl tracking-tight hidden md:inline">WorkHive</span>
          </Link>
          {showSwitcher && <WorkspaceSwitcher />}
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>Dashboard</Link>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>Log in</Link>
              <Link href="/register" className={buttonVariants({ variant: "default" })}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
