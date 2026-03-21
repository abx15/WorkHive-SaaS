"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Activity, 
  Server, 
  Database, 
  Globe,
  Shield,
  Users,
  Zap,
  RefreshCw,
  Bell,
  TrendingUp
} from "lucide-react";

const services = [
  {
    name: "API Services",
    status: "operational",
    description: "REST API and GraphQL endpoints",
    uptime: "99.99%",
    responseTime: "45ms",
    lastChecked: "2 minutes ago"
  },
  {
    name: "Database",
    status: "operational",
    description: "Primary and replica databases",
    uptime: "99.95%",
    responseTime: "12ms",
    lastChecked: "1 minute ago"
  },
  {
    name: "Authentication",
    status: "operational",
    description: "Login and SSO services",
    uptime: "99.98%",
    responseTime: "23ms",
    lastChecked: "30 seconds ago"
  },
  {
    name: "File Storage",
    status: "operational",
    description: "File upload and CDN services",
    uptime: "99.97%",
    responseTime: "89ms",
    lastChecked: "5 minutes ago"
  },
  {
    name: "Email Services",
    status: "operational",
    description: "Notifications and email delivery",
    uptime: "99.94%",
    responseTime: "156ms",
    lastChecked: "3 minutes ago"
  },
  {
    name: "Webhooks",
    status: "operational",
    description: "Real-time webhook delivery",
    uptime: "99.96%",
    responseTime: "67ms",
    lastChecked: "2 minutes ago"
  },
  {
    name: "Search Index",
    status: "operational",
    description: "Internal search and indexing",
    uptime: "99.92%",
    responseTime: "134ms",
    lastChecked: "4 minutes ago"
  },
  {
    name: "Analytics",
    status: "operational",
    description: "Usage analytics and reporting",
    uptime: "99.91%",
    responseTime: "201ms",
    lastChecked: "6 minutes ago"
  }
];

const incidents = [
  {
    id: 1,
    title: "Database Performance Degradation",
    severity: "medium",
    status: "resolved",
    startTime: "2024-03-10T14:30:00Z",
    endTime: "2024-03-10T15:45:00Z",
    duration: "1 hour 15 minutes",
    description: "Experienced slow query performance due to high load. Implemented connection pooling and query optimization.",
    impact: "Some users experienced slow loading times"
  },
  {
    id: 2,
    title: "API Rate Limiting",
    severity: "low",
    status: "resolved",
    startTime: "2024-03-05T09:15:00Z",
    endTime: "2024-03-05T09:45:00Z",
    duration: "30 minutes",
    description: "Temporary API rate limiting due to unusual traffic spike. Adjusted limits and added monitoring.",
    impact: "Some API requests were throttled"
  },
  {
    id: 3,
    title: "Scheduled Maintenance",
    severity: "info",
    status: "completed",
    startTime: "2024-02-28T02:00:00Z",
    endTime: "2024-02-28T04:00:00Z",
    duration: "2 hours",
    description: "Routine database maintenance and security updates. No impact on service availability.",
    impact: "Brief downtime during maintenance window"
  }
];

const metrics = {
  overall: {
    uptime: "99.95%",
    responseTime: "89ms",
    errorRate: "0.05%",
    requests: "2.3M/day"
  },
  last30Days: {
    uptime: "99.97%",
    responseTime: "85ms",
    errorRate: "0.03%",
    requests: "69M"
  },
  last90Days: {
    uptime: "99.96%",
    responseTime: "87ms",
    errorRate: "0.04%",
    requests: "207M"
  }
};

export default function StatusPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-500";
      case "degraded": return "text-yellow-500";
      case "down": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return CheckCircle2;
      case "degraded": return AlertTriangle;
      case "down": return XCircle;
      default: return Clock;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-blue-500";
      case "info": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4">System Status</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            System
            <span className="text-primary">Status</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-lg font-semibold text-green-500">All Systems Operational</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Real-time status of all WorkHive services and systems. 
            Monitor uptime, performance, and any ongoing incidents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </Button>
            <Button size="lg">
              Subscribe to Updates <Bell className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Key Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Overall
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-semibold text-green-500">{metrics.overall.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{metrics.overall.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Error Rate</span>
                  <span className="font-semibold text-green-500">{metrics.overall.errorRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Requests</span>
                  <span className="font-semibold">{metrics.overall.requests}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Last 30 Days
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-semibold text-green-500">{metrics.last30Days.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{metrics.last30Days.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Error Rate</span>
                  <span className="font-semibold text-green-500">{metrics.last30Days.errorRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Requests</span>
                  <span className="font-semibold">{metrics.last30Days.requests}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Last 90 Days
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-semibold text-green-500">{metrics.last90Days.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{metrics.last90Days.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Error Rate</span>
                  <span className="font-semibold text-green-500">{metrics.last90Days.errorRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Requests</span>
                  <span className="font-semibold">{metrics.last90Days.requests}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Service Status</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status);
              return (
                <Card key={index} className="border-border/50 bg-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <StatusIcon className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                          <h3 className="font-semibold">{service.name}</h3>
                        </div>
                        <Badge 
                          variant={service.status === "operational" ? "default" : service.status === "degraded" ? "secondary" : "destructive"}
                        >
                          {service.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Uptime</span>
                          <span className="font-medium text-green-500">{service.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Response Time</span>
                          <span className="font-medium">{service.responseTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Checked</span>
                          <span className="font-medium">{service.lastChecked}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(incident.severity)} mt-1`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{incident.title}</h3>
                        <Badge 
                          variant={incident.status === "resolved" ? "default" : incident.status === "in_progress" ? "secondary" : "destructive"}
                        >
                          {incident.status === "resolved" ? "Resolved" : incident.status === "in_progress" ? "In Progress" : "Investigating"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Started: {new Date(incident.startTime).toLocaleString()}</span>
                        </div>
                        {incident.endTime && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                          <span>Ended: {new Date(incident.endTime).toLocaleString()}</span>
                        </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span>Duration: {incident.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Impact:</strong> {incident.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get notified about system status changes and maintenance windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Subscribe to Status Updates <Bell className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Historical Data
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-arrow">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Real-time updates
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Email notifications
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              RSS feed available
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
