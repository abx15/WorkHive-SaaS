"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowLeft, Calendar, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RoleProtectedButton } from "@/components/roles/role-protected-button";
import { PERMISSIONS } from "@/lib/rbac";
import Link from "next/link";

interface Task {
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
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  tasks: Task[];
}

const TaskPriorityColors = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

const TaskStatusColumns = [
  { id: "TODO", title: "To Do", color: "border-gray-200" },
  { id: "IN_PROGRESS", title: "In Progress", color: "border-blue-200" },
  { id: "DONE", title: "Done", color: "border-green-200" },
];

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useCurrentUser();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (params.id && params.projectId && user) {
      fetchProject();
    }
  }, [params.id, params.projectId, user]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/workspaces/${params.id}/projects/${params.projectId}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTasksByStatus = (status: string) => {
    return project?.tasks.filter(task => task.status === status) || [];
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <Badge className={TaskPriorityColors[task.priority]}>
            {task.priority}
          </Badge>
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
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <Link href={`/workspace/${params.id}/projects`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/workspace/${params.id}/projects`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-muted-foreground">{project.description}</p>
            )}
          </div>
        </div>
        <RoleProtectedButton
          userRole={user?.role || 'MEMBER'}
          permission={PERMISSIONS.MANAGE_TASKS}
          onClick={() => setShowTaskModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </RoleProtectedButton>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {TaskStatusColumns.map((column) => (
          <div key={column.id} className={`border-2 ${column.color} rounded-lg p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="outline">
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>
            <div className="space-y-3 min-h-[200px]">
              {getTasksByStatus(column.id).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Modal Placeholder */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Task creation form will be implemented here.
              </p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setShowTaskModal(false)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
