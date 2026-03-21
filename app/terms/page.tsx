"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  FileText, 
  Shield, 
  Users, 
  CreditCard, 
  Database, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  Scale,
  Gavel,
  Heart,
  Download
} from "lucide-react";

const termsSections = [
  {
    title: "Acceptance of Terms",
    icon: CheckCircle2,
    content: "By accessing and using WorkHive, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
  },
  {
    title: "Description of Service",
    icon: Database,
    content: "WorkHive is a collaboration platform that allows teams to create workspaces, manage projects, assign tasks, and collaborate effectively. We provide tools for project management, team communication, and workflow automation."
  },
  {
    title: "User Accounts",
    icon: Users,
    content: "You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account. We are not responsible for any loss or damage arising from your failure to comply with this obligation."
  },
  {
    title: "Privacy and Data Protection",
    icon: Shield,
    content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Services. By using WorkHive, you agree to the collection and use of information in accordance with our Privacy Policy."
  },
  {
    title: "Payment Terms",
    icon: CreditCard,
    content: "For paid services, you agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates."
  },
  {
    title: "Cancellation and Refund Policy",
    icon: AlertTriangle,
    content: "You can cancel your subscription at any time. Refunds are provided on a pro-rata basis for unused portions of your subscription. No refunds will be provided for the current billing period."
  },
  {
    title: "Prohibited Uses",
    icon: Gavel,
    content: "You may not use our services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction. You may not use our services to transmit any threatening, defamatory, obscene, or otherwise unlawful material."
  },
  {
    title: "Intellectual Property Rights",
    icon: FileText,
    content: "The Service and its original content, features and functionality are and will remain the exclusive property of WorkHive and its licensors. The service is protected by copyright, trademark, and other laws."
  },
  {
    title: "Limitation of Liability",
    icon: AlertTriangle,
    content: "In no event shall WorkHive, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
  }
];

const serviceLevels = [
  {
    name: "Free Plan",
    price: "$0",
    features: [
      "Up to 5 team members",
      "1 workspace",
      "Basic project management",
      "Community support"
    ],
    limitations: [
      "Limited storage (1GB)",
      "No custom branding",
      "Basic features only"
    ]
  },
  {
    name: "Pro Plan",
    price: "$15/user/month",
    features: [
      "Unlimited team members",
      "Unlimited workspaces",
      "Advanced features",
      "Priority support",
      "Custom branding"
    ],
    limitations: [
      "Fair usage policy applies",
      "No SLA guarantee"
    ]
  },
  {
    name: "Enterprise Plan",
    price: "Custom pricing",
    features: [
      "Everything in Pro",
      "99.9% uptime SLA",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features"
    ],
    limitations: [
      "Minimum 50 users"
    ]
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4">Terms of Service</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Terms of
            <span className="text-primary"> Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            These terms govern your use of WorkHive. By using our service, you agree to these 
            terms and conditions. Please read them carefully.
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

      {/* Agreement */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Agreement to Terms</h2>
              <div className="prose prose-muted max-w-none">
                <p>
                  By accessing or using WorkHive, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  you may not access or use the service.
                </p>
                <p>
                  WorkHive Technologies, Inc. ("WorkHive") reserves the right to update, change, 
                  or replace any part of these Terms of Service by posting updates and changes to 
                  our website. It is your responsibility to check our website periodically for changes.
                </p>
                <p>
                  Your continued use of the Service after any such changes constitutes your 
                  acceptance of the new Terms of Service.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {termsSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <div key={index} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <SectionIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6">
                    <div className="prose prose-muted max-w-none">
                      <p>{section.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Levels */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Service Levels and Pricing</h2>
              <p className="text-muted-foreground">Choose the plan that fits your needs</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {serviceLevels.map((plan, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Features:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 bg-muted rounded-full flex-shrink-0"></div>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Questions About Terms</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms of Service, please contact us.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>legal@workhive.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Inquiries</h3>
                  <p className="text-muted-foreground mb-4">
                    For business partnerships, enterprise plans, or other business-related inquiries.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>business@workhive.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Response time: 24-48 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Gavel className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Governing Law
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            These Terms of Service and any separate agreements whereby we provide you 
            Services shall be governed by and construed in accordance with the laws of 
            the State of California, United States, without regard to its conflict of 
            law provisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Legal Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Privacy Policy
            </Button>
          </div>
        </div>
      </section>

      {/* Final Agreement */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Thank You for Choosing WorkHive
              </h2>
              <p className="text-muted-foreground mb-6">
                We're committed to providing you with the best collaboration platform possible. 
                These Terms of Service are designed to ensure a fair and transparent relationship 
                between you and WorkHive.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Secure platform
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  99.9% uptime
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  24/7 support
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
