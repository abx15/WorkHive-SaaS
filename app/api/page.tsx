"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  Code, 
  Terminal, 
  Globe, 
  Shield, 
  Database,
  Zap,
  Copy,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Key,
  Users,
  Clock,
  FileText,
  Play,
  RefreshCw,
  Download
} from "lucide-react";

const apiEndpoints = [
  {
    method: "GET",
    path: "/api/v1/workspaces",
    description: "List all workspaces",
    parameters: [
      { name: "limit", type: "number", required: false, description: "Maximum number of results" },
      { name: "offset", type: "number", required: false, description: "Number of results to skip" },
      { name: "search", type: "string", required: false, description: "Search term" }
    ],
    response: {
      workspaces: "Array<Workspace>",
      total: "number",
      limit: "number",
      offset: "number"
    },
    example: `curl -X GET "https://api.workhive.com/v1/workspaces" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
  },
  {
    method: "POST",
    path: "/api/v1/workspaces",
    description: "Create a new workspace",
    parameters: [
      { name: "name", type: "string", required: true, description: "Workspace name" },
      { name: "description", type: "string", required: false, description: "Workspace description" },
      { name: "is_public", type: "boolean", required: false, description: "Public visibility" }
    ],
    response: {
      id: "string",
      name: "string",
      description: "string",
      is_public: "boolean",
      created_at: "string",
      updated_at: "string"
    },
    example: `curl -X POST "https://api.workhive.com/v1/workspaces" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My New Workspace",
    "description": "A workspace for my team"
  }'`
  },
  {
    method: "GET",
    path: "/api/v1/workspaces/{id}/tasks",
    description: "List tasks in a workspace",
    parameters: [
      { name: "id", type: "string", required: true, description: "Workspace ID" },
      { name: "status", type: "string", required: false, description: "Filter by status" },
      { name: "assignee", type: "string", required: false, description: "Filter by assignee" }
    ],
    response: {
      tasks: "Array<Task>",
      total: "number",
      workspace_id: "string"
    },
    example: `curl -X GET "https://api.workhive.com/v1/workspaces/workspace_id/tasks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
  },
  {
    method: "POST",
    path: "/api/v1/tasks",
    description: "Create a new task",
    parameters: [
      { name: "title", type: "string", required: true, description: "Task title" },
      { name: "description", type: "string", required: false, description: "Task description" },
      { name: "workspace_id", type: "string", required: true, description: "Workspace ID" },
      { name: "assignee_id", type: "string", required: false, description: "Assignee user ID" },
      { name: "priority", type: "string", required: false, description: "Task priority" }
    ],
    response: {
      id: "string",
      title: "string",
      description: "string",
      workspace_id: "string",
      assignee_id: "string",
      priority: "string",
      status: "string",
      created_at: "string"
    },
    example: `curl -X POST "https://api.workhive.com/v1/tasks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "New Feature Implementation",
    "description": "Implement user authentication",
    "workspace_id": "workspace_id",
    "priority": "high"
  }'`
  }
];

const authenticationMethods = [
  {
    type: "API Key",
    description: "Simple API key authentication",
    icon: Key,
    setup: "Generate API keys from your dashboard",
    usage: `Authorization: Bearer YOUR_API_KEY`,
    secure: true
  },
  {
    type: "OAuth 2.0",
    description: "OAuth 2.0 flow for applications",
    icon: Shield,
    setup: "Register your application and use OAuth flow",
    usage: "Standard OAuth 2.0 authorization",
    secure: true
  },
  {
    type: "JWT Token",
    description: "JSON Web Token authentication",
    icon: Users,
    setup: "Exchange credentials for JWT token",
    usage: "Authorization: Bearer JWT_TOKEN",
    secure: true
  }
];

const rateLimits = [
  { tier: "Free", requests: "1000", window: "hour", features: "Basic API access" },
  { tier: "Pro", requests: "10000", window: "hour", features: "Advanced features" },
  { tier: "Enterprise", requests: "Unlimited", window: "hour", features: "Custom limits" }
];

export default function APIReferencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("all");

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const filteredEndpoints = apiEndpoints.filter(endpoint => 
    selectedMethod === "all" || endpoint.method === selectedMethod
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">API Reference</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            WorkHive
            <span className="text-primary"> API</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Complete API documentation for WorkHive. Build powerful integrations 
            and automate your workflows with our RESTful API.
          </p>
          
          {/* API Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">API Endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">REST</div>
              <div className="text-sm text-muted-foreground">Architecture</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">JSON</div>
              <div className="text-sm text-muted-foreground">Response Format</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <Key className="mr-2 h-4 w-4" />
              Get API Key
            </Button>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Try API Explorer
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Postman Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Authentication</h2>
              <p className="text-muted-foreground">Secure ways to access the API</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {authenticationMethods.map((method, index) => {
              const MethodIcon = method.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MethodIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{method.type}</CardTitle>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Setup:</p>
                        <p className="text-sm text-muted-foreground">{method.setup}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Usage:</p>
                        <div className="bg-muted rounded p-2">
                          <code className="text-xs">{method.usage}</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.secure && (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-500">Secure</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Rate Limits</h2>
              <p className="text-muted-foreground">API usage limits per tier</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {rateLimits.map((limit, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{limit.tier}</h3>
                    <Badge variant={limit.tier === "Enterprise" ? "default" : "secondary"}>
                      {limit.requests}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requests per {limit.window}</span>
                      <span className="font-medium">{limit.requests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Features</span>
                      <span className="font-medium">{limit.features}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">API Endpoints</h2>
              <p className="text-muted-foreground">Complete list of available endpoints</p>
            </div>
          </div>

          {/* Method Filter */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={selectedMethod === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMethod("all")}
            >
              All Methods
            </Button>
            <Button
              variant={selectedMethod === "GET" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMethod("GET")}
            >
              GET
            </Button>
            <Button
              variant={selectedMethod === "POST" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMethod("POST")}
            >
              POST
            </Button>
            <Button
              variant={selectedMethod === "PUT" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMethod("PUT")}
            >
              PUT
            </Button>
            <Button
              variant={selectedMethod === "DELETE" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMethod("DELETE")}
            >
              DELETE
            </Button>
          </div>

          <div className="space-y-8">
            {filteredEndpoints.map((endpoint, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <Badge 
                      variant={
                        endpoint.method === "GET" ? "secondary" : 
                        endpoint.method === "POST" ? "default" :
                        endpoint.method === "PUT" ? "outline" : "destructive"
                      }
                    >
                      {endpoint.method}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{endpoint.path}</h3>
                      <p className="text-muted-foreground">{endpoint.description}</p>
                    </div>
                  </div>

                  {/* Parameters */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Parameters</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                          <div className="flex items-center gap-2 min-w-0">
                            <code className="text-sm font-medium">{param.name}</code>
                            <Badge variant="outline" className="text-xs">{param.type}</Badge>
                            {param.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Response */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Response</h4>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
                        <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Example */}
                  <div>
                    <h4 className="font-semibold mb-3">Example</h4>
                    <div className="relative">
                      <div className="bg-muted rounded-lg p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(endpoint.example)}
                      >
                        {copiedCode === endpoint.example ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & SDKs */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tools & SDKs</h2>
              <p className="text-muted-foreground">Official libraries and tools</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">JavaScript SDK</h3>
                <p className="text-sm text-muted-foreground mb-4">Node.js and browser support</p>
                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  npm install workhive-sdk
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Python SDK</h3>
                <p className="text-sm text-muted-foreground mb-4">Python 3.7+ support</p>
                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  pip install workhive-python
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Postman Collection</h3>
                <p className="text-sm text-muted-foreground mb-4">Ready-to-use API collection</p>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Collection
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">API Explorer</h3>
                <p className="text-sm text-muted-foreground mb-4">Interactive API testing</p>
                <Button size="sm" variant="outline" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Try Explorer
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
            Start Building with WorkHive API
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get your API key and start integrating WorkHive into your applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Get API Key <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Free to start
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Comprehensive docs
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              24/7 support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
