'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, FileText, AlertTriangle, Mail, Clock, Eye, Trash2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-2 text-orange">Policy & Legal</h1>
          <p className="text-muted-foreground">Privacy Policy, Terms of Service, and Legal Information</p>
        </div>

        {/* Navigation */}
        <Card className="border-2 border-orange">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#privacy">
                <Button variant="outline" className="flex items-center gap-2 border-orange hover:bg-orange hover:text-white">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Button>
              </Link>
              <Link href="#terms">
                <Button variant="outline" className="flex items-center gap-2 border-orange hover:bg-orange hover:text-white">
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </Button>
              </Link>
              <Link href="#legal">
                <Button variant="outline" className="flex items-center gap-2 border-orange hover:bg-orange hover:text-white">
                  <AlertTriangle className="h-4 w-4" />
                  Legal Disclaimer
                </Button>
              </Link>
              <Link href="/">
                <Button className="flex items-center gap-2 bg-orange hover:bg-orange-dark text-white">
                  <Mail className="h-4 w-4" />
                  Back to Service
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <section id="privacy">
          <Card className="border-orange">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-orange">
                <Shield className="h-6 w-6" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Information We Collect</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• <strong className="text-foreground">Email Addresses:</strong> Temporary email addresses are generated randomly and are not linked to your personal identity.</p>
                  <p>• <strong className="text-foreground">Message Content:</strong> Email messages received are temporarily stored for the duration of your session (maximum 10 minutes).</p>
                  <p>• <strong className="text-foreground">Usage Data:</strong> We do not track, store, or collect any personal information, IP addresses, or browsing behavior.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Data Storage & Retention</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• <Badge className="mb-2 bg-orange text-white">Temporary Storage</Badge></p>
                  <p>• Email addresses and messages are automatically deleted after 10 minutes.</p>
                  <p>• No permanent data storage or backups are maintained.</p>
                  <p>• Once deleted, data cannot be recovered.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Data Security</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• <Lock className="inline h-4 w-4 mr-2 text-orange" />All communications use HTTPS encryption.</p>
                  <p>• No third-party analytics or tracking services are used.</p>
                  <p>• We do not share or sell any user data.</p>
                  <p>• Email accounts are isolated and cannot be accessed by others.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Your Rights</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• <Eye className="inline h-4 w-4 mr-2 text-orange" />Complete anonymity - no registration required.</p>
                  <p>• <Trash2 className="inline h-4 w-4 mr-2 text-orange" />Immediate deletion of all data upon expiration.</p>
                  <p>• No cookies or persistent data stored on your device.</p>
                  <p>• Freedom to generate multiple temporary email addresses.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Terms of Service */}
        <section id="terms">
          <Card className="border-orange">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-orange">
                <FileText className="h-6 w-6" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Service Description</h3>
                <p className="text-muted-foreground">
                  This service provides free, temporary, disposable email addresses for privacy protection, 
                  spam prevention, and testing purposes. The service is provided "as is" without any warranties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Acceptable Use</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>✅ <strong className="text-foreground">Permitted Uses:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>• Privacy protection and spam prevention</li>
                    <li>• Software testing and development</li>
                    <li>• Website registration without revealing personal email</li>
                    <li>• Temporary communication needs</li>
                  </ul>
                  
                  <p className="mt-3">❌ <strong className="text-foreground">Prohibited Uses:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>• Illegal activities or content</li>
                    <li>• Harassment, abuse, or threats</li>
                    <li>• Spam or mass marketing campaigns</li>
                    <li>• Fraud, phishing, or malicious activities</li>
                    <li>• Violation of applicable laws or regulations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Service Limitations</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• <Clock className="inline h-4 w-4 mr-2 text-orange" />Email addresses are valid for maximum 10 minutes.</p>
                  <p>• Message storage is temporary and automatically deleted.</p>
                  <p>• No guarantee of email delivery or message receipt.</p>
                  <p>• Service availability is not guaranteed.</p>
                  <p>• Maximum message size and attachment restrictions may apply.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">User Responsibilities</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Use the service responsibly and legally.</p>
                  <p>• Do not rely on temporary emails for important communications.</p>
                  <p>• Understand that all data is permanently deleted after expiration.</p>
                  <p>• Comply with all applicable laws and regulations.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Service Modification & Termination</h3>
                <p className="text-muted-foreground">
                  We reserve the right to modify, suspend, or terminate the service at any time, 
                  with or without notice. We may also terminate access for violations of these terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legal Disclaimer */}
        <section id="legal">
          <Card className="border-orange">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-orange">
                <AlertTriangle className="h-6 w-6" />
                Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Service Nature</h3>
                <p className="text-muted-foreground">
                  This is a free, anonymous temporary email service provided for legitimate purposes only. 
                  The service is intended for privacy protection and testing, not for illegal activities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">No Warranties</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• The service is provided "as is" without any warranties, express or implied.</p>
                  <p>• We do not guarantee email delivery, message storage, or service availability.</p>
                  <p>• We are not liable for any loss of data, emails, or service interruptions.</p>
                  <p>• Use at your own risk and discretion.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  We shall not be liable for any direct, indirect, incidental, special, or consequential 
                  damages resulting from the use or inability to use this service, including but not limited 
                  to loss of data, business interruption, or any other commercial damages.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange">Compliance & Jurisdiction</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Users must comply with all applicable local, state, national, and international laws.</p>
                  <p>• The service may not be available in all jurisdictions.</p>
                  <p>• We cooperate with law enforcement for legitimate investigations.</p>
                  <p>• Illegal activities will be reported to appropriate authorities.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Third-Party Services</h3>
                <p className="text-muted-foreground">
                  This service utilizes third-party email infrastructure (mail.tm API). 
                  We are not responsible for the policies, practices, or availability of third-party services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contact & Updates</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• This privacy policy and terms of service may be updated periodically.</p>
                  <p>• Continued use of the service constitutes acceptance of any changes.</p>
                  <p>• For legal inquiries, please use appropriate legal channels.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Summary */}
        <Card className="border-orange">
          <CardHeader>
            <CardTitle className="text-xl text-orange">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange" />
                  What We Do
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Provide anonymous temporary emails</li>
                  <li>• Auto-delete all data after 10 minutes</li>
                  <li>• Use HTTPS encryption</li>
                  <li>• Never store personal information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange" />
                  What We Don't Do
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Track users or store personal data</li>
                  <li>• Guarantee email delivery</li>
                  <li>• Provide permanent email storage</li>
                  <li>• Support illegal activities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">By using this service, you agree to our Privacy Policy and Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}