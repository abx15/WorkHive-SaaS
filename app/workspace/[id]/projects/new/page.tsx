"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RoleProtectedButton } from "@/components/roles/role-protected-button";
import { PERMISSIONS } from "@/lib/rbac";
import Link from "next/link";

export default function NewProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useCurrentUser();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/workspaces/${params.id}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const project = await response.json();
        router.push(`/workspace/${params.id}/projects/${project.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-6">
        <Link href={`/workspace/${params.id}/projects`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter project name"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description (optional)"
                disabled={loading}
                rows={4}
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Link href={`/workspace/${params.id}/projects`}>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </Link>
              <RoleProtectedButton
                userRole={user?.role || 'MEMBER'}
                permission={PERMISSIONS.CREATE_PROJECTS}
                type="submit"
                disabled={loading || !formData.name.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </>
                )}
              </RoleProtectedButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
