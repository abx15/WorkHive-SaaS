"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { BuildingIcon, ArrowRight, Users } from "lucide-react";
import { RoleBadge } from "@/components/roles/role-badge";
import { RoleGuard } from "@/components/roles/role-guard";

interface WorkspaceProps {
  workspace: {
    id: string;
    name: string;
    members: {
      id: string;
      role: string;
      user: {
        id: string;
        name: string | null;
        email: string | null;
      };
    }[];
    createdAt: Date;
  };
  currentUserId?: string;
}

export function WorkspaceCard({ workspace, currentUserId }: WorkspaceProps) {
  const currentUserMembership = workspace.members.find(member => member.user.id === currentUserId);
  const userRole = currentUserMembership?.role;

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BuildingIcon className="size-5 text-muted-foreground" />
            {workspace.name}
          </CardTitle>
          {userRole && <RoleBadge role={userRole as any} />}
        </div>
        <CardDescription>
          Created {new Date(workspace.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4" />
          {workspace.members.length} {workspace.members.length === 1 ? 'member' : 'members'}
        </div>
        <Link href={`/workspace/${workspace.id}`} className={buttonVariants({ className: "w-full" })}>
          Enter Workspace <ArrowRight className="ml-2 size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
