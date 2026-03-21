import { Metadata } from "next";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle2, Users, Database, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Security | WorkHive",
  description: "Learn about WorkHive's security measures and how we protect your data.",
};

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Security
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <div className="bg-card border border-border/50 rounded-xl p-8 mb-8 glass">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Our Security Commitment</h2>
          </div>
          <p className="text-muted-foreground">
            At WorkHive, security is at the core of everything we do. We implement industry-leading 
            security measures to protect your data and ensure the integrity of our platform.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Data Protection
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Encryption</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AES-256 encryption for data at rest</li>
                <li>• TLS 1.3 for data in transit</li>
                <li>• End-to-end encryption for sensitive data</li>
                <li>• Perfect forward secrecy</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Access Control</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-factor authentication (MFA)</li>
                <li>• Role-based access control (RBAC)</li>
                <li>• Single Sign-On (SSO) support</li>
                <li>• Session management</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Data Storage</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Secure cloud infrastructure</li>
                <li>• Regular data backups</li>
                <li>• Geographic redundancy</li>
                <li>• Point-in-time recovery</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Data Minimization</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Collect only necessary data</li>
                <li>• Automatic data retention policies</li>
                <li>• Secure data deletion</li>
                <li>• Anonymization options</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Infrastructure Security</h2>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Secure Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Cloud Security:</strong> AWS/Azure with security best practices</li>
              <li>• <strong>Network Security:</strong> DDoS protection and firewalls</li>
              <li>• <strong>Container Security:</strong> Isolated containers with security scanning</li>
              <li>• <strong>API Security:</strong> Rate limiting and authentication</li>
              <li>• <strong>CDN Protection:</strong> Content delivery with security features</li>
              <li>• <strong>Load Balancing:</strong> High availability with failover</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Monitoring and Detection</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Real-time Monitoring</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• 24/7 security monitoring</li>
                <li>• Intrusion detection systems</li>
                <li>• Anomaly detection algorithms</li>
                <li>• Security information and event management (SIEM)</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Threat Intelligence</h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Proactive threat hunting</li>
                <li>• Vulnerability scanning</li>
                <li>• Security feeds integration</li>
                <li>• Dark web monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Compliance and Certifications</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Industry Standards</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Compliance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• GDPR (General Data Protection Regulation)</li>
                  <li>• CCPA (California Consumer Privacy Act)</li>
                  <li>• SOC 2 Type II</li>
                  <li>• ISO 27001</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Security Frameworks</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• NIST Cybersecurity Framework</li>
                  <li>• OWASP Top 10</li>
                  <li>• CIS Controls</li>
                  <li>• ISO 27018</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security Practices</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Regular Security Audits</h3>
                <p className="text-sm text-muted-foreground">
                  Annual third-party security audits and penetration testing to identify and address vulnerabilities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Employee Training</h3>
                <p className="text-sm text-muted-foreground">
                  Regular security awareness training for all employees with phishing simulations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Secure Development</h3>
                <p className="text-sm text-muted-foreground">
                  Security by design with code reviews, static analysis, and dependency scanning.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Incident Response</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 incident response team with predefined procedures for security events.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Vulnerability Management
          </h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Our Process</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li><strong>Discovery:</strong> Continuous scanning and monitoring for vulnerabilities</li>
              <li><strong>Assessment:</strong> Risk analysis and impact evaluation</li>
              <li><strong>Prioritization:</strong> Critical vulnerabilities addressed first</li>
              <li><strong>Remediation:</strong> Prompt patching and fixes</li>
              <li><strong>Verification:</strong> Testing to ensure vulnerabilities are resolved</li>
            </ol>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Responsible Disclosure</h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                If you discover a security vulnerability, please report it to security@workhive.com. 
                We offer a bug bounty program for responsible disclosures.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Security</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Vendor Management</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Due Diligence</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Security assessments</li>
                  <li>• Compliance verification</li>
                  <li>• Contractual security requirements</li>
                  <li>• Regular audits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Key Partners</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cloud providers (AWS, Azure)</li>
                  <li>• Payment processors (Stripe)</li>
                  <li>• Analytics services (Google)</li>
                  <li>• Communication tools (Intercom)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security Best Practices</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">For Users</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use strong, unique passwords</li>
                <li>• Enable multi-factor authentication</li>
                <li>• Regularly review account activity</li>
                <li>• Keep software updated</li>
                <li>• Be cautious of phishing attempts</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">For Administrators</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Implement least privilege access</li>
                <li>• Regular security training</li>
                <li>• Monitor access logs</li>
                <li>• Backup critical data</li>
                <li>• Test incident response plans</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security Contact</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Security Team</h3>
                <p className="text-muted-foreground mb-4">
                  For security concerns, vulnerability reports, or security questions:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>security@workhive.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+1 (555) 123-4567 (Security Hotline)</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Response Times</h3>
                <p className="text-muted-foreground mb-4">
                  We prioritize security inquiries and respond promptly:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Critical: Within 1 hour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>High: Within 4 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Normal: Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
