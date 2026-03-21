"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderOpen, Calendar, Users } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RoleProtectedButton } from "@/components/roles/role-protected-button";
import { PERMISSIONS } from "@/lib/rbac";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count: {
    tasks: number;
  };
}

export default function ProjectsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useCurrentUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id && user) {
      fetchProjects();
    }
  }, [params.id, user]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/workspaces/${params.id}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your workspace projects</p>
        </div>
        <RoleProtectedButton
          userRole={user?.role || 'MEMBER'}
          permission={PERMISSIONS.CREATE_PROJECTS}
          onClick={() => router.push(`/workspace/${params.id}/projects/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </RoleProtectedButton>
      </div>

      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first project to start organizing your tasks
          </p>
          <RoleProtectedButton
            userRole={user?.role || 'MEMBER'}
            permission={PERMISSIONS.CREATE_PROJECTS}
            onClick={() => router.push(`/workspace/${params.id}/projects/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </RoleProtectedButton>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={`/workspace/${params.id}/projects/${project.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant="secondary">{project._count.tasks} tasks</Badge>
                  </div>
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Active
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
