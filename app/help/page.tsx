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
  BookOpen, 
  Video, 
  MessageSquare, 
  Users, 
  HelpCircle,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  Play,
  Zap
} from "lucide-react";

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of WorkHive",
    icon: BookOpen,
    articles: [
      { title: "Quick Start Guide", description: "Get up and running in 5 minutes", time: "5 min read", popular: true },
      { title: "Creating Your First Workspace", description: "Set up your team workspace", time: "3 min read" },
      { title: "Inviting Team Members", description: "Add colleagues to your workspace", time: "2 min read" },
      { title: "Understanding Projects", description: "Organize work with projects", time: "4 min read" }
    ]
  },
  {
    title: "Features & Tools",
    description: "Master WorkHive features",
    icon: Zap,
    articles: [
      { title: "Kanban Boards", description: "Visual project management", time: "6 min read" },
      { title: "Task Management", description: "Create and track tasks", time: "5 min read" },
      { title: "Team Collaboration", description: "Work together effectively", time: "4 min read" },
      { title: "File Sharing", description: "Share files and documents", time: "3 min read" }
    ]
  },
  {
    title: "Advanced Topics",
    description: "Power user features",
    icon: Star,
    articles: [
      { title: "Custom Workflows", description: "Automate your processes", time: "8 min read" },
      { title: "API Integration", description: "Connect external tools", time: "10 min read" },
      { title: "Advanced Permissions", description: "Fine-tune access control", time: "7 min read" },
      { title: "Analytics & Reports", description: "Track your progress", time: "6 min read" }
    ]
  },
  {
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: HelpCircle,
    articles: [
      { title: "Login Issues", description: "Can't sign in to your account", time: "3 min read" },
      { title: "Performance Problems", description: "Slow loading or lag", time: "4 min read" },
      { title: "Sync Issues", description: "Data not updating", time: "5 min read" },
      { title: "Mobile App Issues", description: "Problems with iOS/Android", time: "3 min read" }
    ]
  }
];

const popularArticles = [
  { title: "Complete Guide to Kanban Boards", category: "Features & Tools", time: "6 min read", views: "15.2k" },
  { title: "How to Invite Team Members", category: "Getting Started", time: "2 min read", views: "12.8k" },
  { title: "API Integration Tutorial", category: "Advanced Topics", time: "10 min read", views: "8.4k" },
  { title: "Troubleshooting Login Issues", category: "Troubleshooting", time: "3 min read", views: "7.1k" }
];

const videoTutorials = [
  { title: "WorkHive Overview", duration: "3:45", views: "25.3k" },
  { title: "Creating Your First Project", duration: "5:12", views: "18.7k" },
  { title: "Team Collaboration Features", duration: "4:28", views: "14.2k" },
  { title: "Advanced Analytics", duration: "6:15", views: "11.5k" }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">Help Center</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            How Can We
            <span className="text-primary"> Help You?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Find answers to your questions, learn best practices, and get the most out of WorkHive. 
            Our comprehensive help center has everything you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Video Tutorials
            </Button>
            <Button size="lg" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button size="lg" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 w-fit">{article.category}</Badge>
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm">{article.description}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {article.views}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                          <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium mb-1">{article.title}</h4>
                            <p className="text-xs text-muted-foreground">{article.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{article.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Video Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Video className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      {video.views} views
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get help via email
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our team
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call us directly
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Call Now
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
            Become a WorkHive Expert
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community and get access to exclusive resources and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Join Community <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Browse Forums
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
