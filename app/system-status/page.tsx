import { Metadata } from "next";
import { CheckCircle2, AlertTriangle, Activity, Clock, Zap, Shield, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "System Status | WorkHive",
  description: "Real-time status and updates for WorkHive services and infrastructure.",
};

const systemStatus = {
  overall: "operational",
  uptime: "99.9%",
  lastUpdated: new Date().toLocaleString(),
  services: [
    {
      name: "API Services",
      status: "operational",
      description: "All API endpoints are responding normally",
      uptime: "99.95%",
      responseTime: "120ms",
      lastIncident: null
    },
    {
      name: "Database",
      status: "operational",
      description: "Database clusters are performing optimally",
      uptime: "99.98%",
      responseTime: "45ms",
      lastIncident: null
    },
    {
      name: "Authentication",
      status: "operational",
      description: "User authentication and authorization working normally",
      uptime: "99.92%",
      responseTime: "200ms",
      lastIncident: null
    },
    {
      name: "File Storage",
      status: "operational",
      description: "File upload, storage, and CDN services operational",
      uptime: "99.97%",
      responseTime: "350ms",
      lastIncident: null
    },
    {
      name: "Email Services",
      status: "degraded",
      description: "Email notifications experiencing slight delays",
      uptime: "98.5%",
      responseTime: "2.5s",
      lastIncident: "2 hours ago"
    },
    {
      name: "Analytics",
      status: "operational",
      description: "Analytics and reporting systems functioning normally",
      uptime: "99.94%",
      responseTime: "180ms",
      lastIncident: null
    },
    {
      name: "Web Application",
      status: "operational",
      description: "Web application responding normally",
      uptime: "99.96%",
      responseTime: "250ms",
      lastIncident: null
    }
  ]
};

const recentIncidents = [
  {
    id: "INC-2024-0315-001",
    title: "Email Service Degradation",
    status: "resolved",
    severity: "medium",
    startTime: "2024-03-15T14:30:00Z",
    endTime: "2024-03-15T16:45:00Z",
    duration: "2h 15m",
    description: "Email notification delays due to high volume. Services restored to normal operation.",
    affected: "Email notifications, user notifications",
    resolution: "Scaled email infrastructure and optimized queue processing"
  },
  {
    id: "INC-2024-0310-002",
    title: "Database Performance Issues",
    status: "resolved",
    severity: "high",
    startTime: "2024-03-10T09:15:00Z",
    endTime: "2024-03-10T11:30:00Z",
    duration: "2h 15m",
    description: "Database cluster experienced slow queries affecting API response times. Issue resolved by optimizing database queries and adding read replicas.",
    affected: "API services, dashboard loading",
    resolution: "Database optimization and read replica deployment"
  },
  {
    id: "INC-2024-0308-003",
    title: "Scheduled Maintenance",
    status: "completed",
    severity: "low",
    startTime: "2024-03-08T02:00:00Z",
    endTime: "2024-03-08T04:30:00Z",
    duration: "2h 30m",
    description: "Planned maintenance for security patches and infrastructure upgrades.",
    affected: "All services",
    resolution: "Security patches applied successfully, infrastructure upgraded"
  }
];

const upcomingMaintenance = [
  {
    date: "2024-03-25",
    time: "02:00 AM - 04:00 AM UTC",
    type: "scheduled",
    description: "Database maintenance and performance optimization",
    affected: "Database, API services",
    impact: "Brief service interruptions expected"
  },
  {
    date: "2024-04-01",
    time: "10:00 PM - 11:30 PM UTC",
    type: "scheduled",
    description: "Security updates and system patches",
    affected: "Authentication services",
    impact: "Brief login delays possible"
  }
];

const performanceMetrics = [
  {
    name: "API Response Time",
    current: "120ms",
    average: "115ms",
    target: "<200ms",
    status: "good"
  },
  {
    name: "Database Query Time",
    current: "45ms",
    average: "48ms",
    target: "<100ms",
    status: "excellent"
  },
  {
    name: "Page Load Time",
    current: "1.2s",
    average: "1.1s",
    target: "<2s",
    status: "good"
  },
  {
    name: "Error Rate",
    current: "0.1%",
    average: "0.12%",
    target: "<1%",
    status: "excellent"
  }
];

export default function SystemStatus() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          System Status
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Real-time status and updates for WorkHive services and infrastructure
        </p>
      </div>

      {/* Overall Status */}
      <section className="mb-16">
        <div className={`bg-card border rounded-xl p-8 text-center ${
          systemStatus.overall === 'operational' 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-800' 
            : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800'
        }`}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            {systemStatus.overall === 'operational' ? (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {systemStatus.overall === 'operational' ? 'All Systems Operational' : 'Some Issues Detected'}
          </h2>
          <p className="text-muted-foreground mb-4">
            {systemStatus.overall === 'operational' 
              ? `Uptime: ${systemStatus.uptime} over the last 30 days`
              : 'Some services are experiencing issues'
            }
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: {systemStatus.lastUpdated}</span>
            </div>
            <button className="text-primary hover:underline">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Service Status</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {systemStatus.services.map((service, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{service.name}</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.status === 'operational' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-200'
                }`}>
                  {service.status}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Uptime</p>
                  <p className="font-semibold">{service.uptime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Response</p>
                  <p className="font-semibold">{service.responseTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Last Issue</p>
                  <p className="font-semibold">
                    {service.lastIncident ? `${service.lastIncident}` : 'None'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Recent Incidents</h2>
        <div className="space-y-4">
          {recentIncidents.map((incident, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{incident.title}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      incident.severity === 'low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-200' :
                      incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-200'
                    }`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(incident.startTime).toLocaleDateString()} - {incident.duration}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-medium ${
                  incident.status === 'resolved' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-200'
                }`}>
                  {incident.status}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{incident.description}</p>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Affected Services:</p>
                <p className="text-sm text-muted-foreground">{incident.affected}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Resolution:</p>
                <p className="text-sm text-muted-foreground">{incident.resolution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Performance Metrics</h2>
        <div className="bg-card border border-border/50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-6">Response Times</h3>
              <div className="space-y-4">
                {performanceMetrics.slice(0, 2).map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{metric.name}</span>
                    <div className="text-right">
                      <p className="font-semibold">{metric.current}</p>
                      <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6">System Health</h3>
              <div className="space-y-4">
                {performanceMetrics.slice(2, 4).map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{metric.name}</span>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          metric.status === 'excellent' ? 'bg-green-500' :
                          metric.status === 'good' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="font-semibold">{metric.current}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Maintenance */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Scheduled Maintenance</h2>
        <div className="space-y-4">
          {upcomingMaintenance.map((maintenance, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">{maintenance.date}</h3>
                  <p className="text-sm text-muted-foreground">{maintenance.time}</p>
                </div>
                <span className="px-3 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-200">
                  {maintenance.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{maintenance.description}</p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm font-medium mb-2 text-blue-800 dark:text-blue-200">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Affected: {maintenance.affected}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {maintenance.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <Activity className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Stay Informed</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get notified about system status, maintenance, and incidents via email, SMS, or webhooks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg transition-colors font-semibold">
              Subscribe to Status Updates
            </button>
            <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-6 rounded-lg transition-colors font-semibold">
              Webhook Configuration
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
