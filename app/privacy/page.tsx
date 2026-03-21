"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Shield, 
  User, 
  Users,
  Database, 
  Globe, 
  Lock, 
  Eye,
  Download,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const privacySections = [
  {
    title: "Information We Collect",
    icon: Database,
    items: [
      {
        title: "Account Information",
        description: "Name, email address, password, and other account details when you register for WorkHive."
      },
      {
        title: "Usage Data",
        description: "How you use our services, including features accessed, time spent, and interaction patterns."
      },
      {
        title: "Content Data",
        description: "Workspaces, projects, tasks, and other content you create or store in WorkHive."
      },
      {
        title: "Communication Data",
        description: "Messages, emails, and other communications when you contact our support team."
      },
      {
        title: "Technical Data",
        description: "IP address, browser type, device information, and access logs for service improvement."
      }
    ]
  },
  {
    title: "How We Use Your Information",
    icon: Globe,
    items: [
      {
        title: "Service Provision",
        description: "To provide, maintain, and improve our services, including customer support."
      },
      {
        title: "Personalization",
        description: "To personalize your experience and provide relevant features and recommendations."
      },
      {
        title: "Communication",
        description: "To send you important updates, security alerts, and marketing communications."
      },
      {
        title: "Analytics",
        description: "To analyze usage patterns and improve our services through aggregated data."
      },
      {
        title: "Security",
        description: "To detect and prevent fraud, abuse, and security threats."
      }
    ]
  },
  {
    title: "Data Sharing & Disclosure",
    icon: Users,
    items: [
      {
        title: "Team Collaboration",
        description: "Within your workspace, data is shared with team members as necessary for collaboration."
      },
      {
        title: "Service Providers",
        description: "With trusted third-party service providers who help us operate our services."
      },
      {
        title: "Legal Requirements",
        description: "When required by law, court order, or government request."
      },
      {
        title: "Business Transfers",
        description: "In connection with mergers, acquisitions, or asset transfers."
      },
      {
        title: "Public Information",
        description: "Information you choose to make public, such as public workspaces."
      }
    ]
  },
  {
    title: "Data Security",
    icon: Shield,
    items: [
      {
        title: "Encryption",
        description: "All data is encrypted in transit and at rest using industry-standard encryption."
      },
      {
        title: "Access Controls",
        description: "Strict access controls and authentication mechanisms to protect your data."
      },
      {
        title: "Regular Audits",
        description: "Regular security audits and penetration testing to identify vulnerabilities."
      },
      {
        title: "Data Backup",
        description: "Secure data backups with redundancy to prevent data loss."
      },
      {
        title: "Compliance",
        description: "GDPR, CCPA, and other privacy regulation compliance."
      }
    ]
  }
];

const userRights = [
  {
    title: "Access",
    description: "Request a copy of your personal data",
    icon: Eye
  },
  {
    title: "Correction",
    description: "Correct inaccurate or incomplete personal data",
    icon: CheckCircle2
  },
  {
    title: "Deletion",
    description: "Request deletion of your personal data",
    icon: Download
  },
  {
    title: "Portability",
    description: "Transfer your data to another service",
    icon: Database
  },
  {
    title: "Objection",
    description: "Object to processing of your personal data",
    icon: User
  },
  {
    title: "Restriction",
    description: "Restrict processing of your personal data",
    icon: Lock
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Your Privacy
            <span className="text-primary"> Matters</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            We're committed to protecting your privacy and being transparent about how we 
            collect, use, and share your information. This policy explains our practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <p className="text-sm text-muted-foreground">
              Last updated: March 15, 2024
            </p>
            <Button size="lg" variant="outline">
              Download PDF <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Security First</h3>
                </div>
                <p className="text-muted-foreground">
                  We implement industry-leading security measures to protect your data from unauthorized access, 
                  alteration, or destruction.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Transparency</h3>
                </div>
                <p className="text-muted-foreground">
                  We're transparent about what data we collect, how we use it, and who we share it with. 
                  This policy is written in plain language.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">User Control</h3>
                </div>
                <p className="text-muted-foreground">
                  You have control over your data. You can access, correct, delete, or export your personal 
                  information at any time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Data Minimization</h3>
                </div>
                <p className="text-muted-foreground">
                  We only collect and process data that is necessary for providing our services and 
                  improving your experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {privacySections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <div key={index} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <SectionIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-muted-foreground">
                      {section.title === "Information We Collect" && "We collect various types of information to provide and improve our services."}
                      {section.title === "How We Use Your Information" && "We use your information to provide, maintain, and improve our services."}
                      {section.title === "Data Sharing & Disclosure" && "We may share your information in specific circumstances as described below."}
                      {section.title === "Data Security" && "We implement robust security measures to protect your information."}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="border-border/50 bg-card/50">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* User Rights */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Your Rights and Choices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => {
              const RightIcon = right.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <RightIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{right.title}</h3>
                    <p className="text-sm text-muted-foreground">{right.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Contact Us</h2>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Privacy Questions</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about this privacy policy or how we handle your data, 
                    please contact our privacy team.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>privacy@workhive.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Protection Officer</h3>
                  <p className="text-muted-foreground mb-4">
                    Our Data Protection Officer is responsible for overseeing our privacy program 
                    and ensuring compliance with privacy regulations.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>dpo@workhive.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Response time: 30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We may update this privacy policy from time to time. Sign up for notifications 
            to stay informed about changes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Subscribe to Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Change History
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
