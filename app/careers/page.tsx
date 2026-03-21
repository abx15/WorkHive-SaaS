import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Heart, 
  Zap, 
  Award,
  Rocket,
  Target,
  Building,
  ArrowRight,
  Briefcase,
  GraduationCap
} from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    experience: "Senior",
    salary: "$150k - $200k",
    description: "Build the future of team collaboration with modern React, Next.js, and TypeScript.",
    requirements: [
      "5+ years of frontend development experience",
      "Expert in React, TypeScript, and modern CSS",
      "Experience with Next.js and server-side rendering",
      "Strong understanding of UX/UI principles"
    ]
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote / New York",
    type: "Full-time",
    experience: "Mid-Senior",
    salary: "$120k - $160k",
    description: "Shape the user experience of WorkHive and create intuitive, beautiful interfaces.",
    requirements: [
      "4+ years of product design experience",
      "Proficiency in Figma and design systems",
      "Strong portfolio of web/mobile products",
      "Experience with user research and testing"
    ]
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote / London",
    type: "Full-time",
    experience: "Mid-Senior",
    salary: "$130k - $170k",
    description: "Build scalable APIs and infrastructure to power our collaboration platform.",
    requirements: [
      "4+ years of backend development experience",
      "Expert in Node.js, TypeScript, and databases",
      "Experience with cloud platforms (AWS/GCP)",
      "Understanding of microservices architecture"
    ]
  },
  {
    id: 4,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    experience: "Senior",
    salary: "$160k - $210k",
    description: "Drive product strategy and lead cross-functional teams to deliver exceptional user experiences.",
    requirements: [
      "6+ years of product management experience",
      "Experience with B2B SaaS products",
      "Strong analytical and communication skills",
      "Track record of shipping successful products"
    ]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "Mid-Senior",
    salary: "$140k - $180k",
    description: "Build and maintain our infrastructure, CI/CD pipelines, and deployment systems.",
    requirements: [
      "4+ years of DevOps experience",
      "Expert in Docker, Kubernetes, and cloud platforms",
      "Experience with CI/CD tools and automation",
      "Strong understanding of security best practices"
    ]
  },
  {
    id: 6,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    experience: "Mid",
    salary: "$90k - $120k",
    description: "Help our customers get the most value from WorkHive and build lasting relationships.",
    requirements: [
      "3+ years of customer success experience",
      "Experience with B2B SaaS products",
      "Excellent communication and problem-solving skills",
      "Ability to work with enterprise customers"
    ]
  }
];

const benefits = [
  {
    title: "Competitive Compensation",
    description: "Market-leading salaries, equity, and performance bonuses",
    icon: DollarSign,
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance for you and your family",
    icon: Heart,
  },
  {
    title: "Flexible Work",
    description: "Work from anywhere with our remote-first culture and flexible hours",
    icon: Zap,
  },
  {
    title: "Professional Growth",
    description: "Annual learning budget, conference attendance, and career development",
    icon: GraduationCap,
  },
  {
    title: "Great Team",
    description: "Work with talented, passionate people who care about making a difference",
    icon: Users,
  },
  {
    title: "Modern Tools",
    description: "Latest equipment, software licenses, and tools you need to do your best work",
    icon: Award,
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">Join Our Team</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Build the Future of
            <br />
            <span className="text-primary">Team Collaboration</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Join a passionate team of innovators building the next generation of 
            collaboration tools. Help us empower teams worldwide to achieve their best work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn About WorkHive
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Employee Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Growth Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work at WorkHive?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer competitive benefits and a culture that supports your growth and well-being
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">
              Find your perfect role and join our mission
            </p>
          </div>
          
          <div className="grid gap-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <Badge variant="secondary">{job.department}</Badge>
                        {job.type === "Full-time" && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Full-time
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Key Requirements:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.slice(0, 2).map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full lg:w-auto">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="w-full lg:w-auto">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Culture & Values
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At WorkHive, we're building more than just a product—we're building a community 
                of passionate individuals who believe in the power of great teamwork.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mission-Driven</h3>
                    <p className="text-muted-foreground">We're united by our mission to transform how teams collaborate worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Innovative Spirit</h3>
                    <p className="text-muted-foreground">We encourage creativity, experimentation, and thinking outside the box.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Collaborative Excellence</h3>
                    <p className="text-muted-foreground">We practice what we preach—great collaboration starts at home.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-yellow-600/20 rounded-2xl blur-xl"></div>
              <div className="absolute inset-0 bg-card/50 border border-border/50 rounded-2xl flex items-center justify-center">
                <Building className="h-20 w-20 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't see the perfect role? We're always looking for talented people to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Send Your Resume <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Follow Us on LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
