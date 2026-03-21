"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { BuildingIcon, ChevronsUpDown, Check, PlusCircle } from "lucide-react";
import { getUserWorkspaces } from "@/lib/actions/workspace";
import { CreateWorkspaceModal } from "./CreateWorkspaceModal";

export function WorkspaceSwitcher() {
  const router = useRouter();
  const params = useParams();
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const activeWorkspaceId = params?.id as string | undefined;

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const data = await getUserWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error("Failed to load workspaces", error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkspaces();
  }, [activeWorkspaceId]); // Reload if we switch workspace to sync list

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  if (loading) {
    return (
      <Button variant="outline" className="w-[200px] justify-between" disabled>
        Loading... <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "outline", className: "w-[200px] justify-between font-normal" })}>
        <div className="flex items-center truncate">
          <BuildingIcon className="mr-2 size-4 shrink-0" />
          <span className="truncate">
            {activeWorkspace ? activeWorkspace.name : "Select Workspace"}
          </span>
        </div>
        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onSelect={() => router.push(`/workspace/${workspace.id}`)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="truncate">{workspace.name}</span>
            {activeWorkspaceId === workspace.id && (
              <Check className="size-4 opacity-50" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push("/dashboard")} className="cursor-pointer">
          <PlusCircle className="mr-2 size-4" />
          <span>Manage / Create New</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
