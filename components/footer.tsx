import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Twitter, 
  MessageCircle, 
  Coins,
  Heart,
  Globe
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PromptFi</span>
            </div>
            <p className="text-gray-400 mb-6">
              The decentralized marketplace for AI prompts. Create, share, and earn with the power of blockchain.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <div className="space-y-2">
              <Link href="/marketplace" className="block text-gray-400 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link href="/upload" className="block text-gray-400 hover:text-white transition-colors">
                Upload Prompt
              </Link>
              <Link href="/dao" className="block text-gray-400 hover:text-white transition-colors">
                DAO Governance
              </Link>
              <Link href="/leaderboard" className="block text-gray-400 hover:text-white transition-colors">
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <Link href="/docs" className="block text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/api" className="block text-gray-400 hover:text-white transition-colors">
                API
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/licenses" className="block text-gray-400 hover:text-white transition-colors">
                Licenses
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 PromptFi. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}