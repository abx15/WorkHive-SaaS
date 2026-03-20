import Link from "next/link";
import { LayoutDashboard, Users, Settings, Briefcase } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card h-full flex flex-col">
      <div className="p-6">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Workspace
        </span>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary">
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 transition-colors">
          <Briefcase className="size-4" />
          Projects
        </Link>
        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 transition-colors">
          <Users className="size-4" />
          Team
        </Link>
      </nav>
      <div className="p-4 border-t">
        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted/50 transition-colors">
          <Settings className="size-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
