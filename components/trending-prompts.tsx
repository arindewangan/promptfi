"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Star, 
  Eye, 
  Coins, 
  TrendingUp,
  MessageSquare,
  Image,
  Code,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface Prompt {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  price: number;
  creator: string;
  stats: {
    hearts: number;
    views: number;
    purchases: number;
    rating: number;
  };
  trending: boolean;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'chatgpt':
    case 'claude':
    case 'gemini':
      return <MessageSquare className="w-4 h-4" />;
    case 'midjourney':
    case 'dalle':
    case 'stable-diffusion':
      return <Image className="w-4 h-4" />;
    case 'code':
      return <Code className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export function TrendingPrompts() {
  const [trendingPrompts, setTrendingPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingPrompts();
  }, []);

  const fetchTrendingPrompts = async () => {
    try {
      const response = await fetch('/api/prompts?sort=trending&limit=4');
      if (response.ok) {
        const data = await response.json();
        setTrendingPrompts(data.prompts || []);
      }
    } catch (error) {
      console.error('Error fetching trending prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Trending Prompts
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Discover the most popular AI prompts from our community
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Trending Prompts
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the most popular AI prompts from our community
            </p>
          </div>
          <Link href="/marketplace">
            <Button variant="outline">
              View All
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPrompts.map((prompt) => (
            <Card key={prompt._id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTypeIcon(prompt.type)}
                      {prompt.type.charAt(0).toUpperCase() + prompt.type.slice(1)}
                    </Badge>
                    {prompt.trending && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Coins className="w-4 h-4" />
                    {prompt.price}
                  </div>
                </div>

                {/* Title and Description */}
                <Link href={`/prompt/${prompt._id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                    {prompt.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {prompt.description}
                </p>

                {/* Creator */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{prompt.creator.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/profile/${prompt.creator}`}>
                      <span className="text-sm font-medium text-gray-900 dark:text-white hover:text-purple-600 cursor-pointer">
                        {prompt.creator.slice(0, 6)}...{prompt.creator.slice(-4)}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {prompt.stats.hearts}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {prompt.stats.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {prompt.stats.purchases}
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/prompt/${prompt._id}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    View Prompt
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}