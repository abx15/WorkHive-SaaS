'use client';

import { motion } from 'framer-motion';
import { LucideIcon, FolderOpen, FileText, CheckSquare, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center text-center p-16 rounded-xl border-2 border-dashed border-border/50 bg-gradient-to-br from-card to-card/30 backdrop-blur-sm ${className}`}
    >
      {/* Icon with gradient background */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl" />
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center border border-primary/20">
          <Icon className="w-8 h-8 text-primary/70" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-xl font-semibold text-foreground mb-2"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-muted-foreground mb-6 max-w-md"
      >
        {description}
      </motion.p>

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Button 
            onClick={action.onClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground hover-scale glow-yellow"
          >
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Specific empty states for common use cases
interface EmptyWorkspaceProps {
  onCreateWorkspace: () => void;
}

export function EmptyWorkspace({ onCreateWorkspace }: EmptyWorkspaceProps) {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No workspaces found"
      description="Create your first workspace to start collaborating with your team"
      action={{
        label: 'Create Workspace',
        onClick: onCreateWorkspace
      }}
    />
  );
}

interface EmptyProjectsProps {
  onCreateProject: () => void;
}

export function EmptyProjects({ onCreateProject }: EmptyProjectsProps) {
  return (
    <EmptyState
      icon={FileText}
      title="No projects yet"
      description="Create your first project to organize your tasks and collaborate with your team"
      action={{
        label: 'Create Project',
        onClick: onCreateProject
      }}
    />
  );
}

interface EmptyTasksProps {
  onCreateTask: () => void;
}

export function EmptyTasks({ onCreateTask }: EmptyTasksProps) {
  return (
    <EmptyState
      icon={CheckSquare}
      title="No tasks found"
      description="Create your first task to start tracking your work and progress"
      action={{
        label: 'Create Task',
        onClick: onCreateTask
      }}
    />
  );
}

interface EmptyTeamProps {
  onInviteMember: () => void;
}

export function EmptyTeam({ onInviteMember }: EmptyTeamProps) {
  return (
    <EmptyState
      icon={Users}
      title="No team members"
      description="Invite team members to collaborate on projects and tasks together"
      action={{
        label: 'Invite Members',
        onClick: onInviteMember
      }}
    />
  );
}

// Search results empty state
export function EmptySearch({ query }: { query: string }) {
  return (
    <EmptyState
      icon={Search}
      title={`No results for "${query}"`}
      description="Try adjusting your search terms or filters to find what you're looking for"
    />
  );
}
