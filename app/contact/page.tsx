import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Building,
  Users,
  HelpCircle,
  Send
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    value: "support@workhive.com",
    action: "Send us an email"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team",
    value: "Available 24/7",
    action: "Start chat"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us directly",
    value: "+1 (555) 123-4567",
    action: "Call now"
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Visit our headquarters",
    value: "San Francisco, CA",
    action: "Get directions"
  }
];

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer: "We typically respond to emails within 24 hours. Live chat and phone support are available immediately during business hours."
  },
  {
    question: "Do you offer enterprise support?",
    answer: "Yes, Enterprise customers get priority 24/7 support with dedicated account managers and guaranteed response times."
  },
  {
    question: "Can I schedule a demo?",
    answer: "Absolutely! Click the 'Schedule Demo' button to book a personalized demo with our team."
  },
  {
    question: "What's included in the free trial?",
    answer: "The free trial includes full access to all Pro features for 14 days, no credit card required."
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Get in
            <span className="text-primary"> Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Have questions about WorkHive? Our support team is here to help you succeed. 
            Reach out through any of the channels below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Schedule a Demo <Send className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                    <p className="font-medium mb-4">{info.value}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Send us a Message</h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>
          
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Corp" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your needs..."
                    rows={6}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="newsletter" className="rounded" />
                  <Label htmlFor="newsletter" className="text-sm">
                    I'd like to receive updates about WorkHive
                  </Label>
                </div>
                
                <Button size="lg" className="w-full">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Teams */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Support Teams</h2>
            <p className="text-xl text-muted-foreground">
              Specialized teams ready to help you succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Success</h3>
                <p className="text-muted-foreground mb-4">
                  Help you get the most value from WorkHive with onboarding and best practices.
                </p>
                <p className="text-sm text-primary font-medium">Mon-Fri, 9AM-6PM PST</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enterprise Support</h3>
                <p className="text-muted-foreground mb-4">
                  Dedicated support for enterprise customers with custom solutions.
                </p>
                <p className="text-sm text-primary font-medium">24/7 Priority Support</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                <p className="text-muted-foreground mb-4">
                  Technical assistance for integrations, API questions, and troubleshooting.
                </p>
                <p className="text-sm text-primary font-medium">24/7 Available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
