"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  Globe, 
  Zap, 
  Award, 
  Target, 
  Heart,
  Building,
  Rocket,
  Star,
  TrendingUp,
  Shield
} from "lucide-react";

const stats = [
  { label: "Teams worldwide", value: "10,000+", icon: Globe },
  { label: "Active users", value: "500K+", icon: Users },
  { label: "Projects managed", value: "2M+", icon: Target },
  { label: "Uptime", value: "99.9%", icon: Shield },
];

const values = [
  {
    title: "Innovation First",
    description: "We push boundaries to create cutting-edge solutions that transform how teams collaborate.",
    icon: Rocket,
  },
  {
    title: "User Obsessed",
    description: "Every decision starts with our users. We build products that solve real problems.",
    icon: Heart,
  },
  {
    title: "Excellence Always",
    description: "We pursue excellence in everything we do, from code quality to customer support.",
    icon: Award,
  },
];

const timeline = [
  {
    year: "2024",
    title: "WorkHive Founded",
    description: "Started with a simple mission: revolutionize team collaboration.",
  },
  {
    year: "2025",
    title: "Rapid Growth",
    description: "Reached 100K users and launched our AI-powered features.",
  },
  {
    year: "2026",
    title: "Market Leader",
    description: "Became the preferred choice for modern teams worldwide.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">About WorkHive</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            The Future of Team
            <br />
            <span className="text-primary">Collaboration</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Founded in 2024, WorkHive is on a mission to transform how teams work together. 
            We believe that great things happen when people collaborate seamlessly, 
            and we're building the tools to make that happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className={buttonVariants({ size: "lg" })}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/careers" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-border/50 bg-card/50">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To empower every team to achieve their best work through intelligent, 
                intuitive, and inspiring collaboration tools.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We envision a world where distance and complexity no longer limit 
                teamwork, where great ideas can flourish regardless of location, 
                and where every team has the tools they need to succeed.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary fill-current" />
                  <span className="font-semibold">Industry Leading</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Fast Growing</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-yellow-600/20 rounded-2xl blur-xl"></div>
              <div className="absolute inset-0 bg-card/50 border border-border/50 rounded-2xl flex items-center justify-center">
                <Building className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From startup to industry leader in record time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">{item.year}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Future of Work?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams already using WorkHive to transform their collaboration.
          </p>
          <Link href="/register" className={buttonVariants({ size: "lg" })}>
            Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
