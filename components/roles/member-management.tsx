"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleBadge } from "@/components/roles/role-badge";
import { RoleProtectedButton } from "@/components/roles/role-protected-button";
import { RoleGuard } from "@/components/roles/role-guard";
import { Role } from "@prisma/client";
import { PERMISSIONS } from "@/lib/rbac";
import { Users, UserPlus, Crown, Shield, User } from "lucide-react";

interface Member {
  id: string;
  role: Role;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

interface MemberManagementProps {
  workspaceId: string;
  members: Member[];
  currentUserRole: Role;
  currentUserId: string;
  onAddMember: (email: string, role: Role) => Promise<void>;
  onUpdateRole: (memberId: string, role: Role) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
}

export function MemberManagement({
  workspaceId,
  members,
  currentUserRole,
  currentUserId,
  onAddMember,
  onUpdateRole,
  onRemoveMember,
}: MemberManagementProps) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<Role>('MEMBER');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) return;

    setIsLoading(true);
    try {
      await onAddMember(newMemberEmail.trim(), newMemberRole);
      setNewMemberEmail("");
      setNewMemberRole('MEMBER');
      setShowAddMember(false);
    } catch (error) {
      console.error('Failed to add member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return <Crown className="size-4" />;
      case 'MANAGER':
        return <Shield className="size-4" />;
      case 'MEMBER':
        return <User className="size-4" />;
      default:
        return <User className="size-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Members ({members.length})
          </CardTitle>
          <RoleGuard userRole={currentUserRole} permission={PERMISSIONS.MANAGE_USERS}>
            <Button
              onClick={() => setShowAddMember(!showAddMember)}
              size="sm"
            >
              <UserPlus className="mr-2 size-4" />
              Add Member
            </Button>
          </RoleGuard>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddMember && (
          <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
            <Input
              placeholder="Enter email address"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="flex-1"
            />
            <Select value={newMemberRole} onValueChange={(value: Role) => setNewMemberRole(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddMember} disabled={isLoading || !newMemberEmail.trim()}>
              {isLoading ? "Adding..." : "Add"}
            </Button>
            <Button variant="outline" onClick={() => setShowAddMember(false)}>
              Cancel
            </Button>
          </div>
        )}

        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getRoleIcon(member.role)}
                <div>
                  <div className="font-medium">
                    {member.user.name || member.user.email}
                  </div>
                  {member.user.name && member.user.email && (
                    <div className="text-sm text-muted-foreground">
                      {member.user.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <RoleBadge role={member.role} />
                
                {member.user.id !== currentUserId && (
                  <RoleGuard userRole={currentUserRole} permission={PERMISSIONS.MANAGE_USERS}>
                    <div className="flex items-center gap-1">
                      <Select
                        value={member.role}
                        onValueChange={(value: Role) => onUpdateRole(member.id, value)}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MEMBER">Member</SelectItem>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-destructive hover:text-destructive"
                        onClick={() => onRemoveMember(member.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </RoleGuard>
                )}
                
                {member.user.id === currentUserId && (
                  <Badge variant="outline">You</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
