import { Metadata } from "next";
import { Users, MessageSquare, ThumbsUp, Award, Calendar, Star, ArrowRight, Globe, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Community | WorkHive",
  description: "Join the WorkHive community - Connect, share, and learn from other users.",
};

const communityFeatures = [
  {
    title: "Discussion Forums",
    icon: MessageSquare,
    description: "Ask questions and share knowledge with the community",
    stats: {
      members: "15,000+",
      posts: "45,000+",
      categories: "12"
    },
    features: [
      "Q&A discussions",
      "Best practices sharing",
      "Troubleshooting help",
      "Feature requests",
      "Success stories"
    ]
  },
  {
    title: "User Groups",
    icon: Users,
    description: "Connect with users in your industry or region",
    stats: {
      groups: "200+",
      members: "8,000+",
      meetings: "150/month"
    },
    features: [
      "Industry-specific groups",
      "Regional meetups",
      "Virtual events",
      "Resource sharing",
      "Networking opportunities"
    ]
  },
  {
    title: "Community Showcase",
    icon: Award,
    description: "Discover amazing projects and success stories",
    stats: {
      projects: "5,000+",
      showcases: "1,200+",
      votes: "25,000+"
    },
    features: [
      "Project showcases",
      "Success stories",
      "Innovation highlights",
      "Case studies",
      "Best practice examples"
    ]
  }
];

const upcomingEvents = [
  {
    title: "Monthly Product Webinar",
    date: "March 25, 2024",
    time: "2:00 PM EST",
    type: "Webinar",
    description: "Learn about new features and best practices",
    attendees: 250,
    maxAttendees: 500
  },
  {
    title: "Community Hackathon",
    date: "April 15-16, 2024",
    time: "9:00 AM EST",
    type: "Hackathon",
    description: "48-hour virtual hackathon with amazing prizes",
    attendees: 150,
    maxAttendees: 300
  },
  {
    title: "User Conference 2024",
    date: "May 20-21, 2024",
    time: "10:00 AM EST",
    type: "Conference",
    description: "Annual user conference with workshops and networking",
    attendees: 400,
    maxAttendees: 1000
  }
];

const topContributors = [
  {
    name: "Sarah Chen",
    role: "Product Expert",
    contributions: 1250,
    badges: ["Top Contributor", "Mentor", "Community Leader"],
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "Integration Specialist",
    contributions: 980,
    badges: ["API Expert", "Helper", "Innovator"],
    avatar: "MR"
  },
  {
    name: "Emily Watson",
    role: "Workflow Guru",
    contributions: 890,
    badges: ["Workflow Master", "Educator", "Problem Solver"],
    avatar: "EW"
  },
  {
    name: "David Kim",
    role: "Community Champion",
    contributions: 750,
    badges: ["Community Hero", "Mentor", "Ambassador"],
    avatar: "DK"
  }
];

export default function Community() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Community
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Connect with thousands of WorkHive users, share knowledge, and grow together
        </p>
      </div>

      {/* Community Stats */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25,000+</div>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-sm text-muted-foreground">Discussions Monthly</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Community Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {communityFeatures.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={index} className="bg-card border border-border/50 rounded-xl p-8 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FeatureIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{feature.stats.members}</div>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{feature.stats.posts}</div>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{feature.stats.categories}</div>
                    <p className="text-xs text-muted-foreground">Categories</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors">
                  Explore {feature.title}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Upcoming Events</h2>
        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6 hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'Webinar' ? 'bg-blue-500' :
                      event.type === 'Hackathon' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded text-xs text-white ${
                        event.type === 'Webinar' ? 'bg-blue-500' :
                        event.type === 'Hackathon' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}/{event.maxAttendees} attending</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
          ))}
        </div>
      </section>

      {/* Top Contributors */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Top Contributors</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {topContributors.map((contributor, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{contributor.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{contributor.name}</h3>
                  <p className="text-sm text-muted-foreground">{contributor.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{contributor.contributions}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">contributions</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {contributor.badges.map((badge, badgeIndex) => (
                  <span key={badgeIndex} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Community Guidelines</h2>
        <div className="bg-card border border-border/50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                Be Respectful
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Treat everyone with respect and kindness</li>
                <li>• Welcome newcomers and help them learn</li>
                <li>• Appreciate different perspectives and experiences</li>
                <li>• Keep discussions constructive and on-topic</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Be Helpful
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Share your knowledge and experience</li>
                <li>• Provide detailed and helpful answers</li>
                <li>• Credit others when appropriate</li>
                <li>• Report issues and suggest improvements</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Remember:</strong> This is a professional community focused on productivity and collaboration. 
              Keep all discussions relevant to WorkHive and professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Join?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who are transforming the way they work with WorkHive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg transition-colors">
              Join Community Forum
            </button>
            <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-6 rounded-lg transition-colors">
              Start Discussion
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
