import { Metadata } from "next";
import { Users, Target, Award, Globe, ArrowRight, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | WorkHive",
  description: "Learn about WorkHive's mission, team, and commitment to transforming workplace collaboration.",
};

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Visionary leader with 15+ years in enterprise software and team collaboration.",
    image: "SC",
    expertise: ["Strategy", "Product Vision", "Team Leadership"]
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Technical architect passionate about building scalable, intuitive collaboration tools.",
    image: "MR",
    expertise: ["System Architecture", "Cloud Infrastructure", "Security"]
  },
  {
    name: "Emily Watson",
    role: "Head of Product",
    bio: "Product expert focused on user experience and innovative feature development.",
    image: "EW",
    expertise: ["Product Strategy", "UX Design", "User Research"]
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Engineering leader driving technical excellence and team growth.",
    image: "DK",
    expertise: ["Team Management", "DevOps", "Quality Assurance"]
  }
];

const milestones = [
  {
    year: "2020",
    title: "WorkHive Founded",
    description: "Started with a mission to transform workplace collaboration",
    icon: "🚀"
  },
  {
    year: "2021",
    title: "First 1000 Users",
    description: "Reached our first major milestone with 1000 active users",
    icon: "🎯"
  },
  {
    year: "2022",
    title: "Series A Funding",
    description: "Secured $10M Series A to accelerate growth",
    icon: "💰"
  },
  {
    year: "2023",
    title: "Enterprise Launch",
    description: "Launched enterprise features and expanded globally",
    icon: "🏢"
  },
  {
    year: "2024",
    title: "25,000+ Users",
    description: "Now serving thousands of teams worldwide",
    icon: "🌍"
  }
];

const values = [
  {
    title: "Innovation First",
    description: "We constantly push boundaries to create cutting-edge collaboration tools",
    icon: "💡"
  },
  {
    title: "User-Centric",
    description: "Every decision starts with 'How does this help our users?'",
    icon: "👥"
  },
  {
    title: "Transparency",
    description: "Open communication about our roadmap, challenges, and successes",
    icon: "🔍"
  },
  {
    title: "Excellence",
    description: "We pursue excellence in every line of code and customer interaction",
    icon: "⭐"
  }
];

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          About WorkHive
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          We are on a mission to transform how teams collaborate, communicate, and create together.
        </p>
      </div>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border/50 rounded-xl p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower teams worldwide with intuitive, powerful collaboration tools that 
              break down communication barriers and unlock collective potential.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              A world where every team can collaborate seamlessly, regardless of location, 
              time zone, or organizational structure.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25,000+</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <p className="text-sm text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="text-3xl mb-3">{value.icon}</div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{member.image}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, skillIndex) => (
                  <span key={skillIndex} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Our Journey</h2>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{milestone.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                      {milestone.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culture */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Our Culture</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Remote-First</h3>
            <p className="text-sm text-muted-foreground">
              We are a distributed team that believes great work happens anywhere
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Work-Life Balance</h3>
            <p className="text-sm text-muted-foreground">
              We support our team with flexible schedules and generous benefits
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-6 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Continuous Learning</h3>
            <p className="text-sm text-muted-foreground">
              We invest in growth through training, conferences, and mentorship
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We are always looking for talented people who share our passion for transforming workplace collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg transition-colors font-semibold">
              View Open Positions
            </button>
            <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-6 rounded-lg transition-colors font-semibold">
              Learn About Culture
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
