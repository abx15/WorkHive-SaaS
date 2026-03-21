"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserWorkspaces } from "@/lib/actions/workspace";
import { getUserCredits } from "@/lib/actions/credits";
import { WorkspaceCard } from "@/components/workspace/WorkspaceCard";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { CreditUsageDisplay } from "@/components/credits/CreditUsageDisplay";
import { UpgradePrompt } from "@/components/credits/UpgradePrompt";
import { StatsCard } from "@/components/dashboard/stats-card";
import { CreditsChart } from "@/components/dashboard/credits-chart";
import { Loader2, Users, FolderOpen, Zap, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [creditStatus, setCreditStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const chartData = [
    { day: 'Mon', used: 12, remaining: 88 },
    { day: 'Tue', used: 19, remaining: 81 },
    { day: 'Wed', used: 8, remaining: 92 },
    { day: 'Thu', used: 15, remaining: 85 },
    { day: 'Fri', used: 22, remaining: 78 },
    { day: 'Sat', used: 5, remaining: 95 },
    { day: 'Sun', used: 9, remaining: 91 },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [workspacesData, creditsData] = await Promise.all([
          getUserWorkspaces(),
          getUserCredits()
        ]);
        setWorkspaces(workspacesData);
        setCreditStatus(creditsData);
        toast.success('Dashboard loaded successfully!');
      } catch (error) {
        console.error('Failed to fetch data', error);
        toast.error('Failed to load dashboard data');
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-7xl mx-auto py-8 px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome back! Here's your workspace overview.</p>
        </div>
        <CreateWorkspaceModal />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Total Workspaces"
          value={workspaces.length}
          description="Active workspaces"
          icon={FolderOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Credits Remaining"
          value={creditStatus?.remainingCredits || 0}
          description="For this month"
          icon={Zap}
          trend={{ value: -8, isPositive: false }}
        />
        <StatsCard
          title="Team Members"
          value={24}
          description="Across all workspaces"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Active Projects"
          value={18}
          description="Currently running"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workspaces Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Workspaces</h2>
          </div>
          
          {workspaces.length === 0 ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border-2 border-dashed rounded-xl p-16 text-center flex flex-col items-center justify-center bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
                <FolderOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No workspaces found</h3>
              <p className="text-muted-foreground mb-6">Create a new workspace to get started</p>
              <CreateWorkspaceModal />
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspaces.map((workspace, index) => (
                <motion.div
                  key={workspace.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <WorkspaceCard workspace={workspace} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {creditStatus && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CreditUsageDisplay 
                creditStatus={creditStatus} 
                onUpgrade={handleUpgrade}
              />
            </motion.div>
          )}
          
          {/* Credits Chart */}
          <CreditsChart data={chartData} />
        </motion.div>
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
    </motion.div>
  );
}
