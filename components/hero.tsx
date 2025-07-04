"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Wallet, 
  Trophy, 
  Users, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useWeb3 } from '@/components/web3-provider';

export function Hero() {
  const { isConnected, connect } = useWeb3();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Web3 & AI
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            The Future of
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Prompts
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create, discover, and monetize high-quality AI prompts. Join a community where creativity meets rewards through blockchain technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/upload">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Upload className="w-5 h-5 mr-2" />
                Upload Prompt
              </Button>
            </Link>
            
            <Link href="/marketplace">
              <Button size="lg" variant="outline">
                <Search className="w-5 h-5 mr-2" />
                Browse Prompts
              </Button>
            </Link>
            
            {!isConnected && (
              <Button size="lg" variant="secondary" onClick={connect}>
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12.5K</div>
              <div className="text-gray-600 dark:text-gray-400">Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">3.2K</div>
              <div className="text-gray-600 dark:text-gray-400">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">$42K</div>
              <div className="text-gray-600 dark:text-gray-400">Rewards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Earn Rewards
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get tipped in $PROMPT tokens when users love your prompts. Build reputation and earn passive income.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Community Driven
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join a vibrant community of AI enthusiasts. Share, remix, and collaborate on prompts.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Decentralized
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built on blockchain technology. Own your content, control your earnings, vote on platform decisions.
            </p>
          </Card>
        </div>

        {/* DAO CTA */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join the PromptFi DAO
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Shape the future of AI prompt sharing. Vote on proposals, earn governance tokens, and be part of the revolution.
            </p>
            <Link href="/dao">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}