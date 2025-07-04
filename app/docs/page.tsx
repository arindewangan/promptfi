import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Book, 
  Code, 
  Coins, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  ExternalLink,
  FileText,
  Video,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about PromptFi
            </p>
          </div>

          {/* Quick Start */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Guide
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Connect Wallet</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Connect your MetaMask or compatible Web3 wallet to get started
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Get PROMPT Tokens</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Acquire PROMPT tokens to purchase prompts and participate in governance
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Start Creating</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Upload your first prompt or browse the marketplace
                </p>
              </div>
            </div>
          </Card>

          {/* Documentation Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Book className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  User Guide
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn how to use PromptFi as a creator or buyer
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• Creating and uploading prompts</li>
                <li>• Browsing and purchasing prompts</li>
                <li>• Managing your profile</li>
                <li>• Earning and spending tokens</li>
              </ul>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Read User Guide
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Developer API
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Integrate PromptFi into your applications
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• REST API endpoints</li>
                <li>• Smart contract integration</li>
                <li>• SDK and libraries</li>
                <li>• Webhook notifications</li>
              </ul>
              <Button variant="outline" className="w-full">
                <Code className="w-4 h-4 mr-2" />
                View API Docs
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  DAO Governance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Participate in platform governance and decision making
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• Voting on proposals</li>
                <li>• Creating proposals</li>
                <li>• Staking for governance</li>
                <li>• Treasury management</li>
              </ul>
              <Link href="/dao">
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Join DAO
                </Button>
              </Link>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Security & Safety
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Best practices for secure usage of the platform
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li>• Wallet security</li>
                <li>• Smart contract audits</li>
                <li>• Content moderation</li>
                <li>• Reporting issues</li>
              </ul>
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Security Guide
              </Button>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What is PromptFi?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  PromptFi is a decentralized marketplace for AI prompts where creators can monetize their prompts and users can discover high-quality prompts for various AI models.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do PROMPT tokens work?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  PROMPT tokens are the native currency of the platform. They're used to purchase prompts, tip creators, and participate in governance decisions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I earn as a creator?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Creators earn PROMPT tokens when users purchase their prompts, tip them, or when their prompts are remixed. The platform takes a small fee to support development.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is my content protected?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, all prompts are stored securely and only accessible to purchasers. Creators retain ownership rights and can set licensing terms.
                </p>
              </div>
            </div>
          </Card>

          {/* Resources */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Additional Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Video className="w-6 h-6" />
                <span>Video Tutorials</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Community Discord</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <ExternalLink className="w-6 h-6" />
                <span>GitHub Repository</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}