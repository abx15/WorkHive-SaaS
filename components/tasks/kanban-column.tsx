"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./task-card";
import { Role } from "@prisma/client";

interface KanbanColumnProps {
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  tasks: any[];
  borderColor: string;
  currentUserRole: Role;
  currentUserId: string;
  onTaskEdit?: (task: any) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, status: string) => void;
}

export function KanbanColumn({
  title,
  status,
  tasks,
  borderColor,
  currentUserRole,
  currentUserId,
  onTaskEdit,
  onTaskDelete,
  onTaskStatusChange,
}: KanbanColumnProps) {
  return (
    <div className={`border-2 ${borderColor} rounded-lg p-4 min-h-[400px]`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Badge variant="outline" className="text-sm">
          {tasks.length}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            currentUserRole={currentUserRole}
            currentUserId={currentUserId}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
            onStatusChange={onTaskStatusChange}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center text-muted-foreground py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-sm">No tasks in {title.toLowerCase()}</p>
            <p className="text-xs mt-1">Drag tasks here to update status</p>
          </div>
        )}
      </div>
    </div>
  );
}
