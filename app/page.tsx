"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Users, Zap, Shield, BarChart3, Lock, Globe, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
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
            <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg font-medium w-full sm:w-auto" })}>
              Get Started <ArrowRight className="ml-2 size-5" />
            </Link>
            <Link href="/demo" className={buttonVariants({ size: "lg", variant: "outline", className: "h-14 px-8 text-lg font-medium w-full sm:w-auto" })}>
              View Demo
            </Link>
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to manage your team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that help teams collaborate better and achieve more together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Invite team members, assign roles, and manage permissions with ease.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Built with performance in mind. Your workspace loads instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with 99.9% uptime guarantee.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Track productivity and get actionable insights about your team.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Granular permissions ensure team members only see what they need.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Global Scale</CardTitle>
                <CardDescription>
                  Deploy anywhere in the world with our global infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How WorkHive Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and transform how your team collaborates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Workspace</h3>
              <p className="text-muted-foreground">
                Sign up and create your first workspace in seconds. No credit card required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Invite Your Team</h3>
              <p className="text-muted-foreground">
                Add team members and assign roles to control access and permissions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Collaborating</h3>
              <p className="text-muted-foreground">
                Create projects, manage tasks, and watch your productivity soar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about their experience with WorkHive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "WorkHive has completely transformed how our team collaborates. The interface is intuitive and the features are exactly what we needed."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">CEO, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The best SaaS platform we've used. It's scalable, secure, and the customer support is exceptional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">CTO, StartupXYZ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a platform that understands what modern teams need. WorkHive has made our workflow 10x more efficient."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mike Chen</p>
                    <p className="text-sm text-muted-foreground">Product Manager, DesignHub</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your team. Start free and scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <CardDescription>
                  Perfect for small teams getting started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Up to 3 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Basic project management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">1 GB storage</span>
                </div>
                <Button className="w-full" variant="outline">
                  Start Free
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5 backdrop-blur-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold">$29<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <CardDescription>
                  For growing teams that need more power
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Up to 50 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Advanced project features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">100 GB storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Priority support</span>
                </div>
                <Button className="w-full">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold">Custom</div>
                <CardDescription>
                  For large organizations with custom needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Unlimited team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Custom integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Unlimited storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Dedicated support</span>
                </div>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className={buttonVariants({ variant: "link", className: "gap-2" })}>
              View detailed pricing <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-10 bg-primary rounded-md flex items-center justify-center font-bold text-primary-foreground">
                  W
                </div>
                <span className="font-bold text-2xl">WorkHive</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
                The future of team collaboration. Built for 2026 and beyond, WorkHive empowers teams to achieve more with intelligent workspace management, seamless integrations, and cutting-edge AI capabilities.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="text-xs font-bold">X</span>
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="text-xs font-bold">in</span>
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="text-xs font-bold">GH</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
                <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
                <li><Link href="/status" className="hover:text-primary transition-colors">System Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/press" className="hover:text-primary transition-colors">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-primary transition-colors">API Reference</Link></li>
                <li><Link href="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
                <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-sm text-muted-foreground">
                © 2026 WorkHive Technologies, Inc. All rights reserved. Built with ❤️ for teams worldwide.
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
                <Link href="/gdpr" className="hover:text-primary transition-colors">GDPR</Link>
                <Link href="/security" className="hover:text-primary transition-colors">Security</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              🚀 Proudly serving 10,000+ teams globally • Enterprise-grade security • 99.9% uptime SLA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
