import { Metadata } from "next";
import { Shield, Users, FileText, Download, Mail, Phone, CheckCircle2, AlertTriangle, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance | WorkHive",
  description: "Learn how WorkHive complies with GDPR and protects your data rights.",
};

export default function GDPRPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          GDPR Compliance
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <div className="bg-card border border-border/50 rounded-xl p-8 mb-8 glass">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Our GDPR Commitment</h2>
          </div>
          <p className="text-muted-foreground">
            WorkHive is committed to protecting the personal data of our users and complying with the 
            General Data Protection Regulation (GDPR). This page explains how we handle your data and your rights under GDPR.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Your GDPR Rights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Right to Access</h3>
              <p className="text-sm text-muted-foreground">
                Request a copy of your personal data in a machine-readable format.
              </p>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Right to Rectification</h3>
              <p className="text-sm text-muted-foreground">
                Correct inaccurate or incomplete personal data we hold about you.
              </p>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Right to Erasure</h3>
              <p className="text-sm text-muted-foreground">
                Request deletion of your personal data (Right to be Forgotten).
              </p>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Right to Restrict Processing</h3>
              <p className="text-sm text-muted-foreground">
                Limit how we process your personal data in certain circumstances.
              </p>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Right to Data Portability</h3>
              <p className="text-sm text-muted-foreground">
                Transfer your data to another service provider in a structured format.
              </p>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Right to Object</h3>
              <p className="text-sm text-muted-foreground">
                Object to processing of your personal data for direct marketing.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Lawful Basis for Processing</h2>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">How We Process Your Data</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Consent:</strong> When you explicitly agree to us processing your data</li>
              <li>• <strong>Contract:</strong> When necessary to provide our services to you</li>
              <li>• <strong>Legal Obligation:</strong> When required by law or regulation</li>
              <li>• <strong>Legitimate Interests:</strong> When necessary for our legitimate business interests</li>
              <li>• <strong>Vital Interests:</strong> To protect your life or the life of others</li>
              <li>• <strong>Public Task:</strong> When performing tasks in the public interest</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Personal Data</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Name and contact information</li>
                <li>• Email address and phone number</li>
                <li>• Billing and payment information</li>
                <li>• Profile information and preferences</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Usage Data</h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• How you use our platform</li>
                <li>• Features and pages you access</li>
                <li>• Time spent on the platform</li>
                <li>• Interaction patterns</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Technical Data</h3>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                <li>• IP address and location data</li>
                <li>• Browser and device information</li>
                <li>• Cookies and tracking identifiers</li>
                <li>• System performance data</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection Measures</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Security Safeguards</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Technical Measures</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• End-to-end encryption</li>
                  <li>• Secure data centers</li>
                  <li>• Regular security audits</li>
                  <li>• Penetration testing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Organizational Measures</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Staff training on data protection</li>
                  <li>• Access control policies</li>
                  <li>• Data protection officer</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              We may transfer your personal data outside the European Economic Area (EEA). We ensure appropriate 
              safeguards are in place:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate data protection laws</li>
              <li><strong>Standard Contractual Clauses:</strong> EU-approved contracts with third-party processors</li>
              <li><strong>Binding Corporate Rules:</strong> Internal data protection rules for multinational transfers</li>
              <li><strong>Derogations:</strong> Specific circumstances under GDPR Article 49</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Breach Notification</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Our Commitment</h3>
            <p className="text-muted-foreground mb-4">
              In the event of a personal data breach, we will:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Notify Within 72 Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Report to the relevant data protection authority within 72 hours of becoming aware of the breach
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Inform Affected Users</h4>
                  <p className="text-sm text-muted-foreground">
                    Notify individuals if the breach is likely to result in high risk to their rights and freedoms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Provide Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Include information about the breach, its consequences, and measures taken to address it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exercising Your Rights</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">How to Make a Request</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Email us at privacy@workhive.com with your request</li>
                <li>Provide sufficient information to verify your identity</li>
                <li>Specify which right you wish to exercise</li>
                <li>Include relevant details about your request</li>
              </ol>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Response Timeline</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We will acknowledge your request within 5 business days</li>
                <li>We will respond within 30 days of receiving your request</li>
                <li>We may extend the response time by 30 days if necessary</li>
                <li>We will inform you of any extensions and the reasons for them</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">GDPR Inquiries</h3>
                <p className="text-muted-foreground mb-4">
                  For questions about GDPR compliance or exercising your rights:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>privacy@workhive.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Data Protection Officer</h3>
                <p className="text-muted-foreground mb-4">
                  Our DPO oversees GDPR compliance and handles data protection matters:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>dpo@workhive.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Response time: 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Complaints and Appeals</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">If You're Not Satisfied</h3>
            <p className="text-muted-foreground mb-4">
              If you believe we haven't properly addressed your GDPR concerns, you have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>File a complaint with our internal escalation team</li>
              <li>Contact your national data protection authority</li>
              <li>Seek judicial remedy in your country of residence</li>
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Important Note</h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                You have the right to lodge a complaint with a supervisory authority without 
                prejudice to any other administrative or judicial remedy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
