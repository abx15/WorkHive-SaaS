import { Metadata } from "next";
import { Calendar, User, ArrowRight, Clock, Tag, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | WorkHive",
  description: "Read the latest insights, tips, and updates from the WorkHive team.",
};

const blogPosts = [
  {
    id: 1,
    title: "The Future of Remote Work: Trends and Predictions for 2024",
    excerpt: "Explore the latest trends shaping remote work and how teams can adapt to stay productive and connected in distributed environments.",
    author: {
      name: "Sarah Chen",
      role: "CEO",
      avatar: "SC"
    },
    date: "March 15, 2024",
    readTime: "8 min",
    category: "Remote Work",
    tags: ["remote work", "productivity", "collaboration", "future of work"],
    featured: true,
    image: "/blog/remote-work-future.jpg"
  },
  {
    id: 2,
    title: "10 Project Management Tips That Actually Work",
    excerpt: "Discover proven project management strategies that successful teams use to deliver projects on time and under budget.",
    author: {
      name: "Emily Watson",
      role: "Head of Product",
      avatar: "EW"
    },
    date: "March 10, 2024",
    readTime: "6 min",
    category: "Productivity",
    tags: ["project management", "productivity", "tips", "best practices"],
    featured: false,
    image: "/blog/project-management-tips.jpg"
  },
  {
    id: 3,
    title: "Building High-Performance Teams: Lessons from Top Companies",
    excerpt: "Learn how leading organizations build and maintain high-performance teams that consistently exceed expectations.",
    author: {
      name: "Michael Rodriguez",
      role: "CTO",
      avatar: "MR"
    },
    date: "March 5, 2024",
    readTime: "10 min",
    category: "Team Building",
    tags: ["team building", "leadership", "performance", "company culture"],
    featured: false,
    image: "/blog/high-performance-teams.jpg"
  },
  {
    id: 4,
    title: "Security Best Practices for Distributed Teams",
    excerpt: "Essential security measures every remote team should implement to protect sensitive data and maintain compliance.",
    author: {
      name: "David Kim",
      role: "VP of Engineering",
      avatar: "DK"
    },
    date: "February 28, 2024",
    readTime: "7 min",
    category: "Security",
    tags: ["security", "remote work", "compliance", "data protection"],
    featured: false,
    image: "/blog/security-best-practices.jpg"
  },
  {
    id: 5,
    title: "The Psychology of Productive Meetings",
    excerpt: "Understanding the science behind effective meetings and how to structure them for maximum engagement and outcomes.",
    author: {
      name: "Sarah Chen",
      role: "CEO",
      avatar: "SC"
    },
    date: "February 20, 2024",
    readTime: "9 min",
    category: "Productivity",
    tags: ["meetings", "productivity", "psychology", "communication"],
    featured: false,
    image: "/blog/productive-meetings.jpg"
  }
];

const categories = [
  { name: "Remote Work", count: 15 },
  { name: "Productivity", count: 23 },
  { name: "Team Building", count: 12 },
  { name: "Security", count: 8 },
  { name: "Product Updates", count: 18 },
  { name: "Company Culture", count: 10 }
];

const featuredPost = blogPosts.find(post => post.featured);

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          WorkHive Blog
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Insights, tips, and stories to help your team work better together
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Featured Article</h2>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl">📰</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-medium">
                    FEATURED
                  </span>
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs">
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg transition-colors font-semibold">
                    Read Full Article
                  </button>
                  <button className="text-primary font-medium hover:underline">
                    Share →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Recent Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="bg-card border border-border/50 rounded-xl p-6 hover-lift">
              <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-muted-foreground mb-6">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <button className="text-primary font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Browse by Category</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6 text-center hover-lift">
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-3xl font-bold text-primary mb-2">{category.count}</p>
              <p className="text-sm text-muted-foreground">articles</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Get our latest articles, insights, and exclusive content delivered to your inbox weekly.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg transition-colors font-semibold">
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Heart className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Popular Tags</h2>
        <div className="flex flex-wrap gap-3">
          {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag, index) => (
            <span key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Tag className="w-3 h-3 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
