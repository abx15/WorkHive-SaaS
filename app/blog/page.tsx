"use client";

import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Search, Filter } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Remote Work: Trends Shaping 2026",
    excerpt: "Explore how AI-powered collaboration tools are revolutionizing distributed teams and what it means for the future of work.",
    author: "Sarah Chen",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Remote Work",
    image: "/api/placeholder/800/400",
    featured: true,
  },
  {
    id: 2,
    title: "Building High-Performance Teams in the Digital Age",
    excerpt: "Learn proven strategies for fostering collaboration, trust, and productivity in modern distributed teams.",
    author: "Michael Rodriguez",
    date: "2024-03-10",
    readTime: "6 min read",
    category: "Team Management",
    image: "/api/placeholder/800/400",
    featured: false,
  },
  {
    id: 3,
    title: "AI in Project Management: Game Changer or Hype?",
    excerpt: "A deep dive into how artificial intelligence is transforming project management workflows and team collaboration.",
    author: "Emily Watson",
    date: "2024-03-05",
    readTime: "10 min read",
    category: "AI & Technology",
    image: "/api/placeholder/800/400",
    featured: false,
  },
  {
    id: 4,
    title: "Security Best Practices for Modern Workspaces",
    excerpt: "Essential security measures every team should implement to protect their collaborative workspaces.",
    author: "David Kim",
    date: "2024-02-28",
    readTime: "7 min read",
    category: "Security",
    image: "/api/placeholder/800/400",
    featured: false,
  },
  {
    id: 5,
    title: "Measuring What Matters: KPIs for Team Success",
    excerpt: "Discover the key performance indicators that actually matter for measuring team productivity and success.",
    author: "Lisa Anderson",
    date: "2024-02-20",
    readTime: "9 min read",
    category: "Productivity",
    image: "/api/placeholder/800/400",
    featured: false,
  },
  {
    id: 6,
    title: "The Psychology of Effective Team Collaboration",
    excerpt: "Understanding the human factors that make or break team collaboration in digital environments.",
    author: "Dr. James Mitchell",
    date: "2024-02-15",
    readTime: "12 min read",
    category: "Psychology",
    image: "/api/placeholder/800/400",
    featured: false,
  },
];

const categories = ["All", "Remote Work", "Team Management", "AI & Technology", "Security", "Productivity", "Psychology"];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">WorkHive Blog</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Insights on Modern
            <br />
            <span className="text-primary">Team Collaboration</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Expert insights, trends, and best practices for building high-performing teams 
            in the digital age. Stay ahead with our research-backed content.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Article</h2>
            </div>
            <Card className="overflow-hidden border-border/50 bg-card/50">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-yellow-600/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📰</div>
                      <p className="text-muted-foreground">Featured Image</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4">Featured</Badge>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.id}`} className={buttonVariants()}>
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Articles</h2>
            <p className="text-xl text-muted-foreground">
              Latest insights from our team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-yellow-600/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-sm text-muted-foreground">Article Image</p>
                  </div>
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest insights on team collaboration delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Join 50,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
