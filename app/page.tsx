import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center bg-background text-center px-4 relative overflow-hidden">
        {/* Abstract background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
            <span className="flex size-2 rounded-full bg-primary relative">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
            </span>
            WorkHive Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Manage your workspace with <br className="hidden md:block" />
            <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
              WorkHive
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A modern, scalable multi-tenant SaaS platform. Build, manage, and grow your organization's workspaces with efficiency and clean design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 text-lg font-medium w-full sm:w-auto" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium w-full sm:w-auto" asChild>
              <Link href="/demo">
                View Demo
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> Scalable Infrastructure
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> Multi-tenant Ready
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
