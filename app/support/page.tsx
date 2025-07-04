import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, Phone, Clock, HelpCircle, Bug, Ligature as Feature, Shield, Zap, Users } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Support Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're here to help you succeed on PromptFi
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get instant help from our support team
              </p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Start Chat
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Send us a detailed message
              </p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join our Discord community
              </p>
              <Button variant="outline" className="w-full">
                Join Discord
              </Button>
            </Card>
          </div>

          {/* Support Form */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Submit a Support Request
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your full name" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Question</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="Brief description of your issue" className="mt-2" />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide as much detail as possible..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Submit Request
              </Button>
            </form>
          </Card>

          {/* Common Issues */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Common Issues
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Wallet Connection Issues
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Make sure MetaMask is installed and you're on the correct network
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bug className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Transaction Failures
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Check your gas fees and token balance before transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Account Security
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Never share your private keys or seed phrases
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Feature className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Prompt Upload Issues
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ensure your prompt meets our quality guidelines
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Token Rewards
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Rewards are distributed automatically after transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Response Times
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  System Status
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All systems operational
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}