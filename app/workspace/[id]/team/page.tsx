"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, Crown, Shield, User, Plus, MoreHorizontal } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { RoleProtectedButton } from "@/components/roles/role-protected-button";
import { RoleBadge } from "@/components/roles/role-badge";
import { PERMISSIONS } from "@/lib/rbac";
import { toast } from "sonner";

interface Member {
  id: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  role: "OWNER" | "ADMIN" | "MEMBER";
  joinedAt: string;
  _count: {
    tasks: number;
  };
}

export default function TeamPage() {
  const params = useParams();
  const { user } = useCurrentUser();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"ADMIN" | "MEMBER">("MEMBER");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchMembers();
    }
  }, [params.id]);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`/api/workspaces/${params.id}/members`);
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;

    setIsInviting(true);
    try {
      const response = await fetch(`/api/workspaces/${params.id}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });

      if (response.ok) {
        toast.success("Invitation sent successfully!");
        setInviteEmail("");
        setInviteDialogOpen(false);
        fetchMembers();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to send invitation");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsInviting(false);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/workspaces/${params.id}/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        toast.success("Role updated successfully!");
        fetchMembers();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update role");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    try {
      const response = await fetch(`/api/workspaces/${params.id}/members/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Member removed successfully!");
        fetchMembers();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to remove member");
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
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">Manage workspace members and their roles</p>
        </div>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <RoleProtectedButton
              userRole={user?.role || 'MEMBER'}
              permission={PERMISSIONS.INVITE_MEMBERS}
            >
              <Plus className="mr-2 h-4 w-4" />
              Invite Member
            </RoleProtectedButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={(value: "ADMIN" | "MEMBER") => setInviteRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleInvite} disabled={isInviting} className="flex-1">
                  {isInviting ? "Sending..." : "Send Invitation"}
                </Button>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.user.image || ""} />
                    <AvatarFallback>
                      {member.user.name?.charAt(0) || member.user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {member.user.name || "Unknown User"}
                      </h3>
                      <RoleBadge role={member.role} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {member.user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {member._count.tasks} tasks
                      </div>
                      <div>
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {user?.role === "OWNER" && member.role !== "OWNER" && (
                    <Select
                      value={member.role}
                      onValueChange={(value) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MEMBER">Member</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  {user?.role === "OWNER" && member.role !== "OWNER" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
