import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Bug,
  Package
} from "lucide-react";

const changelogEntries = [
  {
    version: "2.4.0",
    date: "2024-03-15",
    type: "major",
    title: "AI-Powered Task Management",
    description: "Revolutionary AI features that transform how teams work",
    icon: Zap,
    color: "bg-purple-500/10 text-purple-500",
    features: [
      "AI task suggestions based on project context",
      "Smart scheduling with team availability",
      "Automated progress insights and recommendations",
      "Natural language task creation"
    ],
    improvements: [
      "50% faster task creation with AI assistance",
      "Improved team productivity analytics",
      "Enhanced mobile app performance"
    ],
    fixes: [
      "Fixed calendar sync issues with Google Calendar",
      "Resolved notification delays on large workspaces",
      "Fixed drag-and-drop performance in Safari"
    ]
  },
  {
    version: "2.3.2",
    date: "2024-03-01",
    type: "minor",
    title: "Performance & Security Updates",
    description: "Optimized performance and enhanced security measures",
    icon: Shield,
    color: "bg-green-500/10 text-green-500",
    features: [
      "Enhanced encryption for all data transfers",
      "Improved workspace loading speed by 40%",
      "Advanced permission controls for enterprise"
    ],
    improvements: [
      "Faster search across all workspaces",
      "Better mobile responsiveness",
      "Improved accessibility compliance"
    ],
    fixes: [
      "Fixed memory leaks in long-running sessions",
      "Resolved file upload issues on slow connections",
      "Fixed timezone handling in calendar events"
    ]
  },
  {
    version: "2.3.1",
    date: "2024-02-15",
    type: "patch",
    title: "Bug Fixes & Stability",
    description: "Critical bug fixes and stability improvements",
    icon: Bug,
    color: "bg-red-500/10 text-red-500",
    features: [],
    improvements: [
      "Improved error handling and user feedback",
      "Better offline mode support"
    ],
    fixes: [
      "Fixed crash when switching between workspaces",
      "Resolved notification duplication issues",
      "Fixed task assignment permission errors"
    ]
  },
  {
    version: "2.3.0",
    date: "2024-02-01",
    type: "major",
    title: "Advanced Analytics Dashboard",
    description: "Comprehensive analytics and reporting features",
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-500",
    features: [
      "Real-time team productivity metrics",
      "Custom dashboard widgets",
      "Advanced reporting with data export",
      "Team performance insights"
    ],
    improvements: [
      "Redesigned dashboard interface",
      "Improved data visualization",
      "Better mobile analytics experience"
    ],
    fixes: [
      "Fixed data export formatting issues",
      "Resolved timezone problems in reports"
    ]
  },
  {
    version: "2.2.0",
    date: "2024-01-15",
    type: "major",
    title: "Mobile App Redesign",
    description: "Completely redesigned mobile experience",
    icon: Users,
    color: "bg-orange-500/10 text-orange-500",
    features: [
      "Native iOS and Android apps",
      "Offline mode with automatic sync",
      "Push notifications for important updates",
      "Gesture-based navigation"
    ],
    improvements: [
      "60% faster mobile app performance",
      "Better battery optimization",
      "Improved touch interactions"
    ],
    fixes: [
      "Fixed sync issues on poor connections",
      "Resolved notification delivery problems"
    ]
  },
  {
    version: "2.1.0",
    date: "2023-12-01",
    type: "major",
    title: "Enterprise Features",
    description: "New features for enterprise customers",
    icon: Rocket,
    color: "bg-indigo-500/10 text-indigo-500",
    features: [
      "Single Sign-On (SSO) support",
      "Advanced audit logs and compliance",
      "Custom branding options",
      "Dedicated account management"
    ],
    improvements: [
      "Enhanced security controls",
      "Better user management interface",
      "Improved billing and invoicing"
    ],
    fixes: [
      "Fixed SAML authentication issues",
      "Resolved user provisioning problems"
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">Changelog</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            What's New in
            <span className="text-primary"> WorkHive</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Stay updated with our latest features, improvements, and bug fixes. 
            We're constantly improving WorkHive to help teams work better together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Subscribe to Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Roadmap
            </Button>
          </div>
        </div>
      </section>

      {/* Version Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <div className="text-sm text-muted-foreground">Major Releases</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">156</div>
              <div className="text-sm text-muted-foreground">New Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Bug Fixes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Improvements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {changelogEntries.map((entry, index) => {
              const EntryIcon = entry.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${entry.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <EntryIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={entry.type === "major" ? "default" : entry.type === "minor" ? "secondary" : "outline"}>
                            {entry.type === "major" ? "Major" : entry.type === "minor" ? "Minor" : "Patch"}
                          </Badge>
                          <h3 className="text-xl font-bold">Version {entry.version}</h3>
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{entry.title}</h4>
                        <p className="text-muted-foreground">{entry.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {entry.features.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          New Features
                        </h5>
                        <ul className="space-y-2">
                          {entry.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {entry.improvements.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          Improvements
                        </h5>
                        <ul className="space-y-2">
                          {entry.improvements.map((improvement, improvementIndex) => (
                            <li key={improvementIndex} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {entry.fixes.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-orange-500" />
                          Bug Fixes
                        </h5>
                        <ul className="space-y-2">
                          {entry.fixes.map((fix, fixIndex) => (
                            <li key={fixIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{fix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with WorkHive
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get notified about new features, updates, and important announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Subscribe to Newsletter <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Follow on Twitter
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Weekly updates
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No spam, unsubscribe anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              50K+ subscribers
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
