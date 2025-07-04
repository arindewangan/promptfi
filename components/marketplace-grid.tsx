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
  Sparkles,
  Copy,
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';

interface MarketplaceGridProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedSort?: string;
  priceRange?: { min: number; max: number };
}

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
    reviews: number;
  };
  tags: string[];
  trending: boolean;
  createdAt: string;
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

export function MarketplaceGrid({ 
  searchQuery = '', 
  selectedCategory = 'All Categories',
  selectedSort = 'trending',
  priceRange 
}: MarketplaceGridProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, [searchQuery, selectedCategory, selectedSort, priceRange]);

  const fetchPrompts = async () => {
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory && selectedCategory !== 'All Categories') {
        params.append('category', selectedCategory);
      }
      if (selectedSort) params.append('sort', selectedSort);
      if (priceRange) {
        params.append('minPrice', priceRange.min.toString());
        params.append('maxPrice', priceRange.max === Infinity ? 'Infinity' : priceRange.max.toString());
      }
      
      const response = await fetch(`/api/prompts?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setPrompts(data.prompts || []);
      } else {
        console.error('Failed to fetch prompts');
        setPrompts([]);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (promptId: string) => {
    setLikedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promptId)) {
        newSet.delete(promptId);
      } else {
        newSet.add(promptId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No prompts found
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Try adjusting your search criteria or browse different categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {prompts.length} prompt{prompts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prompts.map((prompt) => (
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
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(prompt._id)}
                    className={likedPrompts.has(prompt._id) ? 'text-red-500' : ''}
                  >
                    <Heart className={`w-4 h-4 ${likedPrompts.has(prompt._id) ? 'fill-current' : ''}`} />
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Coins className="w-4 h-4" />
                    {prompt.price}
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <Link href={`/prompt/${prompt._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                  {prompt.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {prompt.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {prompt.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {prompt.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{prompt.tags.length - 3}
                  </Badge>
                )}
              </div>

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
                  <ShoppingCart className="w-4 h-4" />
                  {prompt.stats.purchases}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {prompt.stats.rating}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link href={`/prompt/${prompt._id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}