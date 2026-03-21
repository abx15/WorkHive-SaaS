"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Trash2, 
  Save,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

export default function WorkspaceSettingsPage() {
  const params = useParams();
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workspace, setWorkspace] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    domain: "",
    allowInvites: true,
    requireApproval: false
  });

  useEffect(() => {
    if (params.id) {
      fetchWorkspace();
    }
  }, [params.id]);

  const fetchWorkspace = async () => {
    try {
      const response = await fetch(`/api/workspaces/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setWorkspace(data);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          domain: data.domain || "",
          allowInvites: data.allowInvites ?? true,
          requireApproval: data.requireApproval ?? false
        });
      }
    } catch (error) {
      toast.error("Failed to load workspace settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/workspaces/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Settings updated successfully!");
        fetchWorkspace();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update settings");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteWorkspace = async () => {
    if (!confirm("Are you sure you want to delete this workspace? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/workspaces/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Workspace deleted successfully");
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete workspace");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace Settings</h1>
          <p className="text-muted-foreground">Manage your workspace preferences and configuration</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Workspace Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Workspace"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your workspace..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="domain">Custom Domain (Optional)</Label>
            <Input
              id="domain"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              placeholder="workspace.company.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Access Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allowInvites">Allow Member Invites</Label>
              <p className="text-sm text-muted-foreground">
                Members can invite others to join the workspace
              </p>
            </div>
            <Switch
              id="allowInvites"
              checked={formData.allowInvites}
              onCheckedChange={(checked) => setFormData({ ...formData, allowInvites: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="requireApproval">Require Approval</Label>
              <p className="text-sm text-muted-foreground">
                New members require admin approval before joining
              </p>
            </div>
            <Switch
              id="requireApproval"
              checked={formData.requireApproval}
              onCheckedChange={(checked) => setFormData({ ...formData, requireApproval: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Email notifications are enabled by default. You can manage notification preferences in your personal settings.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Deleting a workspace is permanent and cannot be undone. All projects, tasks, and data will be permanently deleted.
            </AlertDescription>
          </Alert>
          <Button 
            variant="destructive" 
            onClick={handleDeleteWorkspace}
            disabled={user?.role !== "OWNER"}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Workspace
          </Button>
          {user?.role !== "OWNER" && (
            <p className="text-sm text-muted-foreground">
              Only workspace owners can delete workspaces.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
