"use client";

import { useEffect, useState } from "react";
import { getUserWorkspaces } from "@/lib/actions/workspace";
import { getUserCredits } from "@/lib/actions/credits";
import { WorkspaceCard } from "@/components/workspace/WorkspaceCard";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { CreditUsageDisplay } from "@/components/credits/CreditUsageDisplay";
import { UpgradePrompt } from "@/components/credits/UpgradePrompt";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [creditStatus, setCreditStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [workspacesData, creditsData] = await Promise.all([
          getUserWorkspaces(),
          getUserCredits()
        ]);
        setWorkspaces(workspacesData);
        setCreditStatus(creditsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleUpgrade = () => {
    setShowUpgradePrompt(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Workspaces</h1>
          <p className="text-muted-foreground mt-1">Select a workspace to continue</p>
        </div>
        <CreateWorkspaceModal />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {workspaces.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-12 text-center flex flex-col items-center justify-center bg-card mt-8">
              <h3 className="text-xl font-semibold mb-2">No workspaces found</h3>
              <p className="text-muted-foreground mb-6">Create a new workspace to get started</p>
              <CreateWorkspaceModal />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {workspaces.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {creditStatus && (
            <CreditUsageDisplay 
              creditStatus={creditStatus} 
              onUpgrade={handleUpgrade}
            />
          )}
        </div>
      </div>

      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        onUpgrade={() => {
          setShowUpgradePrompt(false);
          // TODO: Implement actual upgrade logic
          console.log("Upgrade to Pro");
        }}
        currentPlan={creditStatus?.plan || 'FREE'}
        reason="Unlock more credits and features with Pro plan"
      />
    </div>
  );
}
