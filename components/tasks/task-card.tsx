"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleGuard } from "@/components/roles/role-guard";
import { Role } from "@prisma/client";
import { PERMISSIONS } from "@/lib/rbac";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate: string | null;
    assignee: {
      id: string;
      name: string | null;
      email: string | null;
    } | null;
    createdBy: {
      id: string;
      name: string | null;
      email: string | null;
    };
    createdAt: string;
  };
  currentUserRole: Role;
  currentUserId: string;
  onEdit?: (task: any) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: string) => void;
}

const TaskPriorityColors = {
  LOW: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  MEDIUM: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  HIGH: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  URGENT: "bg-red-100 text-red-800 hover:bg-red-200",
};

const TaskStatusColors = {
  TODO: "border-gray-200",
  IN_PROGRESS: "border-blue-200",
  DONE: "border-green-200",
};

export function TaskCard({ 
  task, 
  currentUserRole, 
  currentUserId, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: TaskCardProps) {
  const canEditTask = currentUserRole !== 'MEMBER' || 
    (task.assignee?.id === currentUserId || task.createdBy.id === currentUserId);

  const canDeleteTask = currentUserRole !== 'MEMBER' || 
    (task.assignee?.id === currentUserId && task.createdBy.id === currentUserId);

  return (
    <Card className={`mb-3 hover:shadow-md transition-all cursor-move border-2 ${TaskStatusColors[task.status]}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm flex-1">{task.title}</h4>
          <div className="flex items-center gap-2">
            <Badge className={TaskPriorityColors[task.priority]}>
              {task.priority}
            </Badge>
            {canEditTask && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(task)}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </DropdownMenuItem>
                  {canDeleteTask && (
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(task.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {task.assignee?.name || task.createdBy.name}
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Status Change Buttons */}
        <RoleGuard userRole={currentUserRole} permission={PERMISSIONS.WORK_ON_TASKS}>
          <div className="flex gap-1 mt-3 pt-3 border-t">
            {task.status !== 'TODO' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => onStatusChange?.(task.id, 'TODO')}
              >
                Todo
              </Button>
            )}
            {task.status !== 'IN_PROGRESS' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => onStatusChange?.(task.id, 'IN_PROGRESS')}
              >
                In Progress
              </Button>
            )}
            {task.status !== 'DONE' && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => onStatusChange?.(task.id, 'DONE')}
              >
                Done
              </Button>
            )}
          </div>
        </RoleGuard>
      </CardContent>
    </Card>
  );
}
