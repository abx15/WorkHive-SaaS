import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Zap, 
  Database, 
  MessageSquare, 
  Calendar, 
  Code, 
  Cloud, 
  Shield,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Puzzle
} from "lucide-react";

const integrations = [
  {
    category: "Communication",
    icon: MessageSquare,
    color: "bg-blue-500/10 text-blue-500",
    items: [
      {
        name: "Slack",
        description: "Get notifications and updates directly in your Slack channels",
        icon: "💬",
        features: ["Real-time notifications", "Channel updates", "Direct messages"],
        setup: "One-click setup"
      },
      {
        name: "Microsoft Teams",
        description: "Integrate WorkHive with your Microsoft Teams workspace",
        icon: "👥",
        features: ["Team notifications", "Task updates", "Meeting integration"],
        setup: "OAuth authentication"
      },
      {
        name: "Discord",
        description: "Connect your Discord server for team notifications",
        icon: "🎮",
        features: ["Channel notifications", "Role-based alerts", "Custom webhooks"],
        setup: "Bot integration"
      }
    ]
  },
  {
    category: "Development Tools",
    icon: Code,
    color: "bg-green-500/10 text-green-500",
    items: [
      {
        name: "GitHub",
        description: "Sync commits, pull requests, and issues with your projects",
        icon: "🐙",
        features: ["Commit tracking", "PR notifications", "Issue management"],
        setup: "GitHub App"
      },
      {
        name: "GitLab",
        description: "Connect GitLab repositories for seamless development workflow",
        icon: "🦊",
        features: ["Pipeline integration", "Merge requests", "Issue tracking"],
        setup: "Personal access token"
      },
      {
        name: "Jira",
        description: "Sync tasks and issues between WorkHive and Jira",
        icon: "🐛",
        features: ["Two-way sync", "Custom fields", "Sprint tracking"],
        setup: "API integration"
      }
    ]
  },
  {
    category: "Productivity & Planning",
    icon: Calendar,
    color: "bg-purple-500/10 text-purple-500",
    items: [
      {
        name: "Google Calendar",
        description: "Sync your tasks and deadlines with Google Calendar",
        icon: "📅",
        features: ["Event creation", "Deadline reminders", "Meeting scheduling"],
        setup: "Google OAuth"
      },
      {
        name: "Trello",
        description: "Import and export boards between Trello and WorkHive",
        icon: "📋",
        features: ["Board import", "Card migration", "Checklist sync"],
        setup: "API key authentication"
      },
      {
        name: "Notion",
        description: "Connect your Notion workspace for documentation and notes",
        icon: "📝",
        features: ["Page creation", "Database sync", "Template sharing"],
        setup: "Notion integration"
      }
    ]
  },
  {
    category: "Cloud & Storage",
    icon: Cloud,
    color: "bg-orange-500/10 text-orange-500",
    items: [
      {
        name: "Google Drive",
        description: "Attach files from Google Drive to your tasks and projects",
        icon: "📁",
        features: ["File attachments", "Folder sync", "Share permissions"],
        setup: "Google OAuth"
      },
      {
        name: "Dropbox",
        description: "Store and share files directly from your Dropbox account",
        icon: "📦",
        features: ["File sharing", "Version history", "Collaborative folders"],
        setup: "Dropbox API"
      },
      {
        name: "OneDrive",
        description: "Integrate with Microsoft OneDrive for file management",
        icon: "☁️",
        features: ["Business integration", "File sync", "Office 365 connection"],
        setup: "Microsoft OAuth"
      }
    ]
  },
  {
    category: "Security & Monitoring",
    icon: Shield,
    color: "bg-red-500/10 text-red-500",
    items: [
      {
        name: "Sentry",
        description: "Monitor errors and performance in your WorkHive integrations",
        icon: "🔍",
        features: ["Error tracking", "Performance monitoring", "Release tracking"],
        setup: "API integration"
      },
      {
        name: "Datadog",
        description: "Get comprehensive monitoring and analytics for your workspace",
        icon: "📊",
        features: ["Real-time monitoring", "Custom dashboards", "Alert management"],
        setup: "API key"
      },
      {
        name: "Okta",
        description: "Enterprise SSO and user management with Okta",
        icon: "🔐",
        features: ["Single sign-on", "User provisioning", "Multi-factor auth"],
        setup: "SAML integration"
      }
    ]
  }
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">Integrations</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Connect Your
            <br />
            <span className="text-primary">Favorite Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            WorkHive integrates seamlessly with 100+ tools your team already uses. 
            Automate workflows, sync data, and boost productivity with powerful integrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Browse Integrations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              API Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Native Integrations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10M+</div>
              <div className="text-sm text-muted-foreground">API Calls Daily</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">API Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Integrations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with the tools your team loves and uses every day
            </p>
          </div>

          <div className="space-y-16">
            {integrations.map((category, categoryIndex) => {
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
                        Essential tools for {category.category.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {category.items.map((integration, integrationIndex) => (
                      <Card key={integrationIndex} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="text-3xl">{integration.icon}</div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold mb-1">{integration.name}</h4>
                              <p className="text-sm text-muted-foreground">{integration.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex flex-wrap gap-1">
                              {integration.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-xs text-muted-foreground">{integration.setup}</span>
                            <Button size="sm" variant="outline">
                              Connect <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Powerful API</h3>
                  <p className="text-muted-foreground">Build custom integrations</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our REST API and webhooks give you the flexibility to build custom integrations 
                and automate workflows. Access all WorkHive features programmatically.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>RESTful API with comprehensive documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Real-time webhooks for event-driven workflows</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Rate limiting and fair usage policies</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>SDKs for popular programming languages</span>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button size="lg">
                  View API Docs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Get API Key
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-yellow-600/20 rounded-2xl blur-xl"></div>
              <div className="absolute inset-0 bg-card/50 border border-border/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Code className="h-16 w-16 text-primary mb-4" />
                  <p className="text-muted-foreground">API Documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can't Find Your Integration?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're constantly adding new integrations. Let us know what you'd like to see next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Request Integration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Build Your Own
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
