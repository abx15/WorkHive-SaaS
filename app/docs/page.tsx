"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  Code, 
  FileText, 
  Terminal, 
  Database,
  Globe,
  Shield,
  Settings,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  Star,
  Zap,
  Users
} from "lucide-react";

const docSections = [
  {
    title: "Getting Started",
    description: "Quick start guides and basics",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500",
    articles: [
      { title: "Installation", description: "Set up WorkHive in minutes", time: "5 min read" },
      { title: "Quick Start", description: "Your first workspace", time: "3 min read" },
      { title: "Authentication", description: "User login and SSO", time: "4 min read" },
      { title: "Basic Concepts", description: "Core terminology", time: "6 min read" }
    ]
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    icon: Code,
    color: "bg-green-500/10 text-green-500",
    articles: [
      { title: "REST API", description: "Full REST API reference", time: "15 min read" },
      { title: "Authentication", description: "API keys and tokens", time: "8 min read" },
      { title: "Webhooks", description: "Real-time events", time: "10 min read" },
      { title: "Rate Limits", description: "API usage limits", time: "5 min read" }
    ]
  },
  {
    title: "SDKs & Libraries",
    description: "Official SDKs and integrations",
    icon: Globe,
    color: "bg-purple-500/10 text-purple-500",
    articles: [
      { title: "JavaScript SDK", description: "Node.js and browser", time: "8 min read" },
      { title: "Python SDK", description: "Python integration", time: "6 min read" },
      { title: "React Components", description: "UI components", time: "12 min read" },
      { title: "Mobile SDKs", description: "iOS and Android", time: "10 min read" }
    ]
  },
  {
    title: "Configuration",
    description: "Setup and configuration guides",
    icon: Settings,
    color: "bg-orange-500/10 text-orange-500",
    articles: [
      { title: "Environment Setup", description: "Development environment", time: "7 min read" },
      { title: "Database Config", description: "Database setup", time: "9 min read" },
      { title: "Security Settings", description: "Security configuration", time: "11 min read" },
      { title: "Performance Tuning", description: "Optimization guide", time: "13 min read" }
    ]
  },
  {
    title: "Advanced Topics",
    description: "Advanced features and patterns",
    icon: Zap,
    color: "bg-red-500/10 text-red-500",
    articles: [
      { title: "Custom Workflows", description: "Workflow automation", time: "12 min read" },
      { title: "Advanced Queries", description: "Complex data operations", time: "8 min read" },
      { title: "Multi-tenancy", description: "Multi-tenant architecture", time: "15 min read" },
      { title: "Performance Scaling", description: "Scale your application", time: "10 min read" }
    ]
  },
  {
    title: "Security",
    description: "Security best practices",
    icon: Shield,
    color: "bg-teal-500/10 text-teal-500",
    articles: [
      { title: "Security Overview", description: "Security fundamentals", time: "6 min read" },
      { title: "Data Protection", description: "Data encryption and privacy", time: "8 min read" },
      { title: "Access Control", description: "User permissions", time: "7 min read" },
      { title: "Compliance", description: "GDPR and regulations", time: "9 min read" }
    ]
  }
];

const codeExamples = [
  {
    title: "Create a Workspace",
    language: "JavaScript",
    code: `const workhive = require('workhive-sdk');

const workspace = await workhive.workspaces.create({
  name: 'My Project',
  description: 'A new workspace for my team'
});

console.log(workspace.id);`,
    description: "Create a new workspace programmatically"
  },
  {
    title: "Add Team Member",
    language: "Python",
    code: `import workhive

workspace = workhive.Workspace("workspace_id")
workspace.add_member(
    email="user@example.com",
    role="member"
)`,
    description: "Add a team member to your workspace"
  },
  {
    title: "Create Task",
    language: "JavaScript",
    code: `const task = await workhive.tasks.create({
  title: 'New Feature',
  description: 'Implement user authentication',
  assignee: 'user_id',
  priority: 'high'
});`,
    description: "Create a new task in a project"
  }
];

const quickLinks = [
  { title: "API Overview", href: "/api", icon: Code },
  { title: "Authentication", href: "/docs/auth", icon: Shield },
  { title: "SDK Installation", href: "/docs/sdk", icon: Globe },
  { title: "Examples", href: "/docs/examples", icon: BookOpen },
  { title: "Changelog", href: "/changelog", icon: FileText },
  { title: "Support", href: "/help", icon: Users }
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState("");

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">Documentation</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Developer
            <span className="text-primary"> Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Everything you need to build with WorkHive. From quick start guides to 
            advanced API references, find all the documentation you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={index} href={link.href} className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                  <Icon className="h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Quick Start</h2>
              <p className="text-muted-foreground">Get up and running in minutes</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold">Install SDK</h3>
                </div>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">npm install workhive-sdk</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Install the WorkHive SDK for your preferred language
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold">Initialize Client</h3>
                </div>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">const client = new WorkHive('api_key');</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Initialize the client with your API key
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold">Make API Calls</h3>
                </div>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <code className="text-sm">const workspaces = await client.workspaces.list();</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start making API calls to manage your workspaces
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Documentation Sections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                        <SectionIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {section.articles.map((article, articleIndex) => (
                        <Link key={articleIndex} href="#" className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium mb-1">{article.title}</h4>
                            <p className="text-xs text-muted-foreground">{article.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{article.time}</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Code Examples</h2>
              <p className="text-muted-foreground">Ready-to-use code snippets</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codeExamples.map((example, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <Badge variant="secondary">{example.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative">
                    <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(example.code)}
                    >
                      {copiedCode === example.code ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">API Reference</h2>
              <p className="text-muted-foreground">Complete API documentation</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">REST API</h3>
                <p className="text-muted-foreground mb-4">
                  Complete REST API with all endpoints, parameters, and responses.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Endpoints</span>
                    <span className="font-medium">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authentication</span>
                    <span className="font-medium">API Keys, OAuth</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate Limit</span>
                    <span className="font-medium">1000 req/hour</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  View API Docs <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">GraphQL API</h3>
                <p className="text-muted-foreground mb-4">
                  Flexible GraphQL API for complex data queries and mutations.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Schema</span>
                    <span className="font-medium">Auto-generated</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real-time</span>
                    <span className="font-medium">Subscriptions</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Introspection</span>
                    <span className="font-medium">Supported</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  GraphQL Explorer <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need More Help?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our developer community and support team are here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Join Developer Community <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
