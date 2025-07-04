import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: January 2025
            </p>
          </div>

          <Card className="p-8 mb-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>

              <h2>How We Use Cookies</h2>
              <p>
                PromptFi uses cookies for the following purposes:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">Essential</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">Necessary Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Required for basic website functionality, wallet connections, and security features.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">Functional</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">Preference Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Remember your settings like theme preferences and language choices.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500">Analytics</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Help us understand how users interact with our platform to improve performance.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500">Marketing</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Used to deliver relevant advertisements and track campaign effectiveness.
                  </p>
                </div>
              </div>

              <h2>Third-Party Cookies</h2>
              <p>
                We may use third-party services that set their own cookies:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Wallet Providers:</strong> MetaMask and other wallet services may set cookies</li>
                <li><strong>IPFS Gateways:</strong> For decentralized content delivery</li>
                <li><strong>CDN Services:</strong> For faster content loading</li>
              </ul>

              <h2>Managing Your Cookie Preferences</h2>
              <p>
                You can control cookies through your browser settings:
              </p>
              <ul>
                <li>Block all cookies (may affect website functionality)</li>
                <li>Delete existing cookies</li>
                <li>Set preferences for specific websites</li>
                <li>Receive notifications when cookies are set</li>
              </ul>

              <h2>Browser-Specific Instructions</h2>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div>
                  <h4 className="font-semibold">Chrome</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Settings → Privacy and Security → Cookies and other site data
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Firefox</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Safari</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Edge</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Settings → Cookies and site permissions → Cookies and site data
                  </p>
                </div>
              </div>

              <h2>Web3 and Blockchain Considerations</h2>
              <p>
                As a Web3 platform, some data is stored on the blockchain and cannot be deleted:
              </p>
              <ul>
                <li>Transaction history</li>
                <li>Smart contract interactions</li>
                <li>Token transfers and balances</li>
                <li>DAO voting records</li>
              </ul>

              <h2>Updates to This Policy</h2>
              <p>
                We may update this cookie policy to reflect changes in our practices or for legal reasons. We will notify users of significant changes.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about our cookie policy, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@promptfi.com</li>
                <li>Discord: PromptFi Community</li>
              </ul>
            </div>
          </Card>

          {/* Cookie Preferences */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Preferences
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Manage your cookie preferences for this website:
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Essential Cookies</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Required for basic functionality</p>
                </div>
                <Badge className="bg-green-500">Always Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Help us improve the platform</p>
                </div>
                <Button variant="outline" size="sm">Toggle</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Personalized advertisements</p>
                </div>
                <Button variant="outline" size="sm">Toggle</Button>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Save Preferences
              </Button>
              <Button variant="outline">
                Accept All
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}