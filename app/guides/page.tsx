import { Metadata } from "next";
import { BookOpen, Users, Zap, Shield, Code, ArrowRight, Play, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides | WorkHive",
  description: "Step-by-step guides to master WorkHive features and workflows.",
};

const guideCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn the basics and get up to speed",
    guides: [
      {
        title: "Complete Workspace Setup",
        description: "From sign-up to your first project",
        duration: "15 min",
        difficulty: "Beginner",
        topics: ["Account Creation", "Workspace Setup", "Team Invitation", "First Project"]
      },
      {
        title: "Team Collaboration Basics",
        description: "Work effectively with your team",
        duration: "20 min",
        difficulty: "Beginner",
        topics: ["Communication", "Task Assignment", "Progress Tracking", "File Sharing"]
      },
      {
        title: "Project Management 101",
        description: "Essential project management skills",
        duration: "25 min",
        difficulty: "Beginner",
        topics: ["Planning", "Task Creation", "Deadlines", "Milestones"]
      }
    ]
  },
  {
    title: "Advanced Workflows",
    icon: Zap,
    description: "Optimize your team's productivity",
    guides: [
      {
        title: "Agile Project Management",
        description: "Implement agile methodologies",
        duration: "30 min",
        difficulty: "Intermediate",
        topics: ["Sprints", "Stand-ups", "Retrospectives", "Backlog Management"]
      },
      {
        title: "Automation Techniques",
        description: "Automate repetitive tasks",
        duration: "35 min",
        difficulty: "Intermediate",
        topics: ["Workflow Automation", "Templates", "Integrations", "Webhooks"]
      },
      {
        title: "Advanced Analytics",
        description: "Data-driven decision making",
        duration: "40 min",
        difficulty: "Advanced",
        topics: ["Custom Reports", "KPI Tracking", "Data Export", "Business Intelligence"]
      }
    ]
  },
  {
    title: "Team Management",
    icon: Users,
    description: "Build and manage high-performing teams",
    guides: [
      {
        title: "Role-Based Access Control",
        description: "Configure permissions and roles",
        duration: "25 min",
        difficulty: "Intermediate",
        topics: ["Role Types", "Permission Levels", "Access Control", "Security Best Practices"]
      },
      {
        title: "Performance Management",
        description: "Track and improve team performance",
        duration: "30 min",
        difficulty: "Advanced",
        topics: ["Performance Metrics", "Feedback Systems", "Goal Setting", "Performance Reviews"]
      },
      {
        title: "Scaling Teams",
        description: "Grow your team effectively",
        duration: "35 min",
        difficulty: "Advanced",
        topics: ["Hiring Onboarding", "Team Structure", "Communication Protocols", "Culture Building"]
      }
    ]
  },
  {
    title: "Security & Compliance",
    icon: Shield,
    description: "Keep your data secure and compliant",
    guides: [
      {
        title: "Security Best Practices",
        description: "Protect your WorkHive account",
        duration: "20 min",
        difficulty: "Intermediate",
        topics: ["Password Security", "2FA Setup", "Access Monitoring", "Incident Response"]
      },
      {
        title: "GDPR Compliance",
        description: "Ensure data privacy compliance",
        duration: "25 min",
        difficulty: "Advanced",
        topics: ["Data Rights", "Consent Management", "Data Breach Response", "Documentation"]
      },
      {
        title: "Audit Preparation",
        description: "Prepare for security audits",
        duration: "30 min",
        difficulty: "Advanced",
        topics: ["Audit Types", "Documentation", "Evidence Collection", "Remediation"]
      }
    ]
  }
];

const featuredGuides = [
  {
    title: "The Complete Guide to Remote Team Management",
    description: "Everything you need to manage distributed teams effectively",
    category: "Team Management",
    readTime: "45 min",
    rating: 4.8,
    readers: 12500
  },
  {
    title: "Project Management Templates That Actually Work",
    description: "Ready-to-use templates for common project types",
    category: "Advanced Workflows",
    readTime: "30 min",
    rating: 4.9,
    readers: 8900
  },
  {
    title: "Security Checklist for SaaS Teams",
    description: "Comprehensive security setup and maintenance guide",
    category: "Security & Compliance",
    readTime: "25 min",
    rating: 4.7,
    readers: 15600
  }
];

export default function Guides() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Guides
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Step-by-step tutorials to help you master WorkHive and boost team productivity
        </p>
      </div>

      {/* Featured Guides */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredGuides.map((guide, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6 hover-lift cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                  {guide.category}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{guide.rating}</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{guide.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{guide.readTime}</span>
                  <span className="text-muted-foreground">{guide.readers.toLocaleString()} readers</span>
                </div>
                <div className="flex items-center text-primary">
                  <span className="font-medium">Read guide</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Browse by Category</h2>
        <div className="space-y-12">
          {guideCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div key={index}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CategoryIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.guides.map((guide, guideIndex) => (
                    <div key={guideIndex} className="bg-card border border-border/50 rounded-xl p-6 hover-lift cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-200' :
                          guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-200'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">{guide.duration}</span>
                      </div>
                      <h4 className="font-semibold mb-2">{guide.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2">Topics covered:</h5>
                        <div className="flex flex-wrap gap-1">
                          {guide.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="text-xs bg-muted px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Play className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Video</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Article</span>
                          </div>
                        </div>
                        <button className="text-primary text-sm font-medium hover:underline">
                          Start Guide →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Learning Paths</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Team Leader Path</h3>
                <p className="text-sm text-muted-foreground">Master team management</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <span className="text-sm">Getting Started</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <span className="text-sm">Team Collaboration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <span className="text-sm">Project Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <span className="text-sm">Advanced Workflows</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Developer Path</h3>
                <p className="text-sm text-muted-foreground">API and integration expertise</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <span className="text-sm">API Basics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <span className="text-sm">Authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <span className="text-sm">Webhooks & Events</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <span className="text-sm">Advanced Integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Contributions */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Community Contributions</h2>
        <div className="bg-card border border-border/50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Contribute to Guides</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Help us create better guides for the community
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Write new guides on topics you're expert in</li>
                <li>• Improve existing guides with feedback</li>
                <li>• Translate guides to other languages</li>
                <li>• Create video tutorials</li>
              </ul>
              <button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors">
                Start Contributing
              </button>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Guide Templates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our proven templates to create consistent guides
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Step-by-step guide template</li>
                <li>• Video tutorial template</li>
                <li>• Quick reference template</li>
                <li>• Best practices checklist</li>
              </ul>
              <button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors">
                Download Templates
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
