import { Metadata } from "next";
import { Code, Zap, Shield, Database, BookOpen, Copy, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "API Reference | WorkHive",
  description: "Complete API documentation for WorkHive REST API.",
};

const apiSections = [
  {
    title: "Authentication",
    icon: Shield,
    description: "Securely authenticate your API requests",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/login",
        description: "Authenticate user and get access token",
        parameters: ["email", "password"],
        response: "access_token, refresh_token, user"
      },
      {
        method: "POST", 
        path: "/api/auth/refresh",
        description: "Refresh access token using refresh token",
        parameters: ["refresh_token"],
        response: "access_token, refresh_token"
      },
      {
        method: "POST",
        path: "/api/auth/logout",
        description: "Invalidate current access token",
        parameters: ["access_token"],
        response: "success message"
      }
    ]
  },
  {
    title: "Workspaces",
    icon: Database,
    description: "Manage workspaces and team collaboration",
    endpoints: [
      {
        method: "GET",
        path: "/api/workspaces",
        description: "Get all workspaces for authenticated user",
        parameters: ["access_token"],
        response: "Array of workspace objects"
      },
      {
        method: "POST",
        path: "/api/workspaces",
        description: "Create a new workspace",
        parameters: ["name", "description", "access_token"],
        response: "Workspace object"
      },
      {
        method: "PUT",
        path: "/api/workspaces/{id}",
        description: "Update workspace details",
        parameters: ["id", "name", "description", "access_token"],
        response: "Updated workspace object"
      },
      {
        method: "DELETE",
        path: "/api/workspaces/{id}",
        description: "Delete a workspace",
        parameters: ["id", "access_token"],
        response: "Success message"
      }
    ]
  },
  {
    title: "Projects",
    icon: Zap,
    description: "Manage projects within workspaces",
    endpoints: [
      {
        method: "GET",
        path: "/api/projects",
        description: "Get all projects in a workspace",
        parameters: ["workspace_id", "access_token"],
        response: "Array of project objects"
      },
      {
        method: "POST",
        path: "/api/projects",
        description: "Create a new project",
        parameters: ["workspace_id", "name", "description", "access_token"],
        response: "Project object"
      },
      {
        method: "PUT",
        path: "/api/projects/{id}",
        description: "Update project details",
        parameters: ["id", "name", "description", "access_token"],
        response: "Updated project object"
      }
    ]
  },
  {
    title: "Tasks",
    icon: BookOpen,
    description: "Manage tasks and assignments",
    endpoints: [
      {
        method: "GET",
        path: "/api/tasks",
        description: "Get all tasks in a project",
        parameters: ["project_id", "access_token"],
        response: "Array of task objects"
      },
      {
        method: "POST",
        path: "/api/tasks",
        description: "Create a new task",
        parameters: ["project_id", "title", "description", "assignee_id", "access_token"],
        response: "Task object"
      },
      {
        method: "PUT",
        path: "/api/tasks/{id}",
        description: "Update task status or details",
        parameters: ["id", "status", "title", "description", "access_token"],
        response: "Updated task object"
      }
    ]
  }
];

const codeExamples = [
  {
    title: "Authentication",
    language: "javascript",
    code: `const response = await fetch('https://api.workhive.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.access_token;`
  },
  {
    title: "Get Workspaces",
    language: "javascript",
    code: `const response = await fetch('https://api.workhive.com/api/workspaces', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  }
});

const workspaces = await response.json();`
  },
  {
    title: "Create Project",
    language: "python",
    code: `import requests

response = requests.post('https://api.workhive.com/api/projects', 
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    },
    json={
        'workspace_id': 'ws_123',
        'name': 'New Project',
        'description': 'Project description'
    }
)

project = response.json()`
  }
];

export default function APIReference() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          API Reference
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Complete REST API documentation for integrating WorkHive into your applications
        </p>
      </div>

      {/* API Info */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Base URL</h3>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                https://api.workhive.com
              </code>
            </div>
            <div>
              <h3 className="font-semibold mb-2">API Version</h3>
              <p className="text-sm">v1.2</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Authentication</h3>
              <p className="text-sm">Bearer Token</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rate Limit</h3>
              <p className="text-sm">1000 requests/hour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Quick Start</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-semibold">1. Get API Key</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Sign up for WorkHive and generate your API key from the dashboard
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <h3 className="font-semibold">Authenticate</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Use your API key to authenticate and get an access token
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <h3 className="font-semibold">Make Requests</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Start making API calls to manage workspaces, projects, and tasks
            </p>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">API Endpoints</h2>
        <div className="space-y-8">
          {apiSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <div key={index} className="bg-card border border-border/50 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <SectionIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {section.endpoints.map((endpoint, endpointIndex) => (
                    <div key={endpointIndex} className="border border-border/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded text-white text-sm font-mono ${
                          endpoint.method === 'GET' ? 'bg-green-600' :
                          endpoint.method === 'POST' ? 'bg-blue-600' :
                          endpoint.method === 'PUT' ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Parameters</h4>
                          <div className="flex flex-wrap gap-1">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <code key={paramIndex} className="text-xs bg-muted px-2 py-1 rounded">
                                {param}
                              </code>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Response</h4>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {endpoint.response}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Code Examples</h2>
        <div className="space-y-6">
          {codeExamples.map((example, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{example.title}</h3>
                <button className="flex items-center gap-2 text-primary text-sm">
                  <Copy className="w-4 h-4" />
                  Copy code
                </button>
              </div>
              <div className="relative">
                <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <code className={`text-sm language-${example.language}`}>
                    {example.code}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SDKs & Tools */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">SDKs & Tools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-6 text-center hover-lift">
            <Code className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">JavaScript SDK</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Official JavaScript/TypeScript SDK
            </p>
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors">
              Download SDK
            </button>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6 text-center hover-lift">
            <Code className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Python SDK</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Official Python SDK
            </p>
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors">
              Download SDK
            </button>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6 text-center hover-lift">
            <Code className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Postman Collection</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Test API endpoints easily
            </p>
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors">
              Get Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
