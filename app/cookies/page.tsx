import { Metadata } from "next";
import { Cookie, Shield, Settings, Eye, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | WorkHive",
  description: "Learn how WorkHive uses cookies and similar technologies to enhance your experience.",
};

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <div className="bg-card border border-border/50 rounded-xl p-8 mb-8 glass">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
          </div>
          <p className="text-muted-foreground">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
            when you visit a website. They help websites remember information about your visit, making your 
            experience more efficient and personalized.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            How We Use Cookies
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Essential Cookies</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintain user authentication</li>
                <li>• Remember user preferences</li>
                <li>• Enable shopping cart functionality</li>
                <li>• Ensure website security</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Performance Cookies</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Track website performance</li>
                <li>• Monitor loading times</li>
                <li>• Identify error patterns</li>
                <li>• Optimize user experience</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Functional Cookies</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Remember language preferences</li>
                <li>• Save customization settings</li>
                <li>• Enable personalized features</li>
                <li>• Support third-party integrations</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Marketing Cookies</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Track marketing campaigns</li>
                <li>• Personalize advertisements</li>
                <li>• Measure ad effectiveness</li>
                <li>• Retarget website visitors</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Session Cookies</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Temporary cookies that are deleted when you close your browser. They help us track your 
                movement through our website during a single session.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Persistent Cookies</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Cookies that remain on your device for a set period or until you delete them. They help 
                us recognize you when you return to our website.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Third-Party Cookies</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Cookies set by external services we use, such as analytics providers, payment processors, 
                and social media platforms.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Managing Your Cookie Preferences
          </h2>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Cookie Control Options</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Browser Settings:</strong> Configure your browser to accept, reject, or delete cookies</li>
              <li>• <strong>Cookie Banner:</strong> Use our cookie consent banner to manage preferences</li>
              <li>• <strong>Opt-out Links:</strong> Follow opt-out links in our marketing communications</li>
              <li>• <strong>Browser Extensions:</strong> Use privacy-focused browser extensions</li>
              <li>• <strong>Regular Cleaning:</strong> Periodically clear cookies from your device</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Services We Use</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Analytics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Analytics</li>
                  <li>• Hotjar (heatmaps)</li>
                  <li>• Mixpanel (user behavior)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Marketing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Ads</li>
                  <li>• Facebook Pixel</li>
                  <li>• LinkedIn Insight Tag</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Stripe</li>
                  <li>• PayPal</li>
                  <li>• Apple Pay</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Support</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Intercom (chat)</li>
                  <li>• Zendesk (tickets)</li>
                  <li>• Crisp (messaging)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Cookie Policy Updates
          </h2>
          <p className="text-muted-foreground mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices, 
            technology, or legal requirements. We will notify you of significant changes by:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Posting the updated policy on our website</li>
            <li>Updating the "Last updated" date</li>
            <li>Sending email notifications for major changes</li>
            <li>Displaying a notice on our website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">GDPR Rights (EU Users)</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Right to access your data</li>
                <li>• Right to rectification</li>
                <li>• Right to erasure ("right to be forgotten")</li>
                <li>• Right to restrict processing</li>
                <li>• Right to data portability</li>
                <li>• Right to object to processing</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">CCPA Rights (California Users)</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Right to know what personal information is collected</li>
                <li>• Right to delete personal information</li>
                <li>• Right to opt-out of sale of personal information</li>
                <li>• Right to non-discrimination for exercising privacy rights</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              If you have questions about this Cookie Policy or how we use cookies, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@workhive.com</p>
              <p><strong>Address:</strong> 123 Business Ave, Suite 100, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Data Protection Officer:</strong> dpo@workhive.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
