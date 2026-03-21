"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Users, 
  Zap, 
  Shield, 
  BarChart3, 
  Lock, 
  Globe, 
  MessageSquare,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Target,
  Rocket,
  Brain,
  Settings,
  Database,
  Smartphone
} from "lucide-react";

const features = [
  {
    category: "Core Collaboration",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
    items: [
      {
        title: "Real-time Collaboration",
        description: "Work together in real-time with live updates, comments, and mentions across all your projects.",
        icon: MessageSquare,
      },
      {
        title: "Team Management",
        description: "Invite team members, assign roles, and manage permissions with our comprehensive role-based access control.",
        icon: Users,
      },
      {
        title: "Workspace Organization",
        description: "Create unlimited workspaces to organize projects, teams, and resources the way you want.",
        icon: Globe,
      }
    ]
  },
  {
    category: "Project Management",
    icon: Target,
    color: "bg-green-500/10 text-green-500",
    items: [
      {
        title: "Kanban Boards",
        description: "Visualize your workflow with customizable Kanban boards. Drag and drop cards to update status instantly.",
        icon: BarChart3,
      },
      {
        title: "Task Management",
        description: "Create, assign, and track tasks with priorities, due dates, and custom fields.",
        icon: Calendar,
      },
      {
        title: "Project Templates",
        description: "Start projects faster with pre-built templates for common workflows and industries.",
        icon: Rocket,
      }
    ]
  },
  {
    category: "AI-Powered Features",
    icon: Brain,
    color: "bg-purple-500/10 text-purple-500",
    items: [
      {
        title: "AI Task Suggestions",
        description: "Get intelligent task suggestions based on your project goals and team capabilities.",
        icon: Zap,
      },
      {
        title: "Smart Scheduling",
        description: "AI-powered scheduling that considers team availability, priorities, and deadlines.",
        icon: Calendar,
      },
      {
        title: "Automated Insights",
        description: "Receive actionable insights about your team's productivity and project health.",
        icon: BarChart3,
      }
    ]
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    color: "bg-red-500/10 text-red-500",
    items: [
      {
        title: "Enterprise Security",
        description: "Bank-level encryption, SOC 2 compliance, and regular security audits keep your data safe.",
        icon: Lock,
      },
      {
        title: "Data Privacy",
        description: "GDPR and CCPA compliant with advanced privacy controls and data residency options.",
        icon: Shield,
      },
      {
        title: "Access Controls",
        description: "Granular permissions, two-factor authentication, and single sign-on integration.",
        icon: Settings,
      }
    ]
  },
  {
    category: "Integrations",
    icon: Database,
    color: "bg-orange-500/10 text-orange-500",
    items: [
      {
        title: "API Access",
        description: "Full REST API and webhooks for custom integrations and automation workflows.",
        icon: Database,
      },
      {
        title: "Third-party Apps",
        description: "Connect with Slack, GitHub, Jira, and 100+ other tools your team already uses.",
        icon: Globe,
      },
      {
        title: "Custom Workflows",
        description: "Build custom workflows with our visual workflow builder or use Zapier for automation.",
        icon: Settings,
      }
    ]
  },
  {
    category: "Mobile & Accessibility",
    icon: Smartphone,
    color: "bg-teal-500/10 text-teal-500",
    items: [
      {
        title: "Mobile Apps",
        description: "Native iOS and Android apps for full productivity on the go with offline support.",
        icon: Smartphone,
      },
      {
        title: "Responsive Design",
        description: "Works perfectly on any device with our responsive web interface and mobile optimization.",
        icon: Globe,
      },
      {
        title: "Accessibility",
        description: "WCAG 2.1 compliant with keyboard navigation, screen reader support, and high contrast mode.",
        icon: Users,
      }
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">Features</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Everything You Need to
            <br />
            <span className="text-primary">Succeed Together</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            WorkHive combines powerful collaboration tools with intelligent automation 
            to help your team achieve more. Discover features designed for modern teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className={buttonVariants({ size: "lg" })}>
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/demo" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Teams</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with the latest technology and designed for how teams actually work
            </p>
          </div>

          <div className="space-y-16">
            {features.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <CategoryIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{category.category}</h3>
                      <p className="text-muted-foreground">
                        {category.category === "Core Collaboration" && "Essential tools for seamless teamwork"}
                        {category.category === "Project Management" && "Organize and track work efficiently"}
                        {category.category === "AI-Powered Features" && "Smart automation and insights"}
                        {category.category === "Security & Compliance" && "Enterprise-grade security and compliance"}
                        {category.category === "Integrations" && "Connect with your favorite tools"}
                        {category.category === "Mobile & Accessibility" && "Work from anywhere, on any device"}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {category.items.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <Card key={featureIndex} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                              <FeatureIcon className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Teams Choose WorkHive</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The benefits that make WorkHive the preferred choice for modern teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50%</div>
              <div className="text-sm text-muted-foreground mb-1">Faster Project Delivery</div>
              <p className="text-xs text-muted-foreground">Teams complete projects 50% faster with our tools</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-muted-foreground mb-1">Reduced Meeting Time</div>
              <p className="text-xs text-muted-foreground">Better collaboration means fewer status meetings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground mb-1">Uptime SLA</div>
              <p className="text-xs text-muted-foreground">Enterprise-grade reliability you can count on</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground mb-1">Support Available</div>
              <p className="text-xs text-muted-foreground">Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Team's Collaboration?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams already using WorkHive to achieve more together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className={buttonVariants({ size: "lg" })}>
              Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/pricing" className={buttonVariants({ size: "lg", variant: "outline" })}>
              View Pricing Plans
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
