"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  Star, 
  Eye, 
  Coins, 
  Share2,
  MessageSquare,
  Image,
  Code,
  Sparkles,
  Copy,
  ShoppingCart,
  TrendingUp,
  ThumbsUp,
  Download,
  Flag,
  Gift,
  Zap,
  CheckCircle,
  Lock,
  Crown
} from 'lucide-react';
import { useWeb3 } from '@/components/web3-provider';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface PromptDetailsProps {
  promptId: string;
}

interface PromptData {
  _id: string;
  title: string;
  description: string;
  content: string;
  preview: string;
  sampleOutput: string;
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

export function PromptDetails({ promptId }: PromptDetailsProps) {
  const [prompt, setPrompt] = useState<PromptData | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [tipAmount, setTipAmount] = useState('5');
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [tipping, setTipping] = useState(false);
  const { isConnected, account, promptTokenBalance } = useWeb3();
  const { toast } = useToast();

  useEffect(() => {
    fetchPrompt();
  }, [promptId]);

  useEffect(() => {
    if (isConnected && account && prompt) {
      checkPurchaseStatus();
    }
  }, [isConnected, account, prompt]);

  const fetchPrompt = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/prompts/${promptId}`);
      if (response.ok) {
        const data = await response.json();
        setPrompt(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load prompt details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching prompt:', error);
      toast({
        title: "Error",
        description: "Failed to load prompt details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkPurchaseStatus = async () => {
    if (!account || !prompt) return;
    
    try {
      const response = await fetch(`/api/prompts/${promptId}/purchase-status?userAddress=${account}`);
      if (response.ok) {
        const data = await response.json();
        setHasPurchased(data.hasPurchased);
      }
    } catch (error) {
      console.error('Error checking purchase status:', error);
    }
  };

  const handlePurchase = async () => {
    if (!isConnected || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase prompts.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt) return;

    if (parseFloat(promptTokenBalance) < prompt.price) {
      toast({
        title: "Insufficient balance",
        description: `You need ${prompt.price} PROMPT tokens to purchase this prompt.`,
        variant: "destructive",
      });
      return;
    }

    if (account.toLowerCase() === prompt.creator.toLowerCase()) {
      toast({
        title: "Cannot purchase own prompt",
        description: "You cannot purchase your own prompt.",
        variant: "destructive",
      });
      return;
    }

    setPurchasing(true);
    try {
      // Generate mock transaction hash
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      const response = await fetch(`/api/prompts/${promptId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyerAddress: account,
          transactionHash
        }),
      });

      if (response.ok) {
        setHasPurchased(true);
        toast({
          title: "Purchase successful!",
          description: `You now have access to the full prompt. ${prompt.price} PROMPT tokens transferred to creator.`,
        });
        
        // Refresh prompt data to update stats
        fetchPrompt();
      } else {
        const error = await response.json();
        toast({
          title: "Purchase failed",
          description: error.error || "There was an error processing your purchase.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error purchasing prompt:', error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  const handleTip = async () => {
    if (!isConnected || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to tip creators.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt) return;

    const tipAmountNum = parseFloat(tipAmount);
    if (tipAmountNum < 1) {
      toast({
        title: "Invalid tip amount",
        description: "Minimum tip amount is 1 PROMPT",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(promptTokenBalance) < tipAmountNum) {
      toast({
        title: "Insufficient balance",
        description: `You need ${tipAmountNum} PROMPT tokens to send this tip.`,
        variant: "destructive",
      });
      return;
    }

    setTipping(true);
    try {
      // Generate mock transaction hash
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: account,
          to: prompt.creator,
          prompt: promptId,
          amount: tipAmountNum,
          transactionHash
        }),
      });

      if (response.ok) {
        toast({
          title: "Tip sent!",
          description: `You tipped ${tipAmountNum} PROMPT tokens to the creator.`,
        });
        setTipAmount('5');
      } else {
        const error = await response.json();
        toast({
          title: "Tip failed",
          description: error.error || "There was an error sending your tip.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending tip:', error);
      toast({
        title: "Tip failed",
        description: "There was an error sending your tip.",
        variant: "destructive",
      });
    } finally {
      setTipping(false);
    }
  };

  const handleCopy = () => {
    if (!prompt || !hasPurchased) return;
    navigator.clipboard.writeText(prompt.content);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Prompt link copied to clipboard.",
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Prompt Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          The prompt you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const isOwner = account?.toLowerCase() === prompt.creator.toLowerCase();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              {getTypeIcon(prompt.type)}
              {prompt.type.charAt(0).toUpperCase() + prompt.type.slice(1)}
            </Badge>
            <Badge variant="outline">{prompt.category}</Badge>
            {prompt.trending && (
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {prompt.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {prompt.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Creator Info */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{prompt.creator.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Link href={`/profile/${prompt.creator}`}>
                <span className="text-lg font-semibold text-gray-900 dark:text-white hover:text-purple-600 cursor-pointer">
                  {prompt.creator.slice(0, 6)}...{prompt.creator.slice(-4)}
                </span>
              </Link>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Creator
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
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
              {prompt.stats.rating} ({prompt.stats.reviews} reviews)
            </div>
          </div>
        </div>

        {/* Purchase Card */}
        <div className="lg:w-80">
          <Card className="p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {prompt.price} PROMPT
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                One-time purchase
              </div>
            </div>

            <div className="space-y-4">
              {hasPurchased ? (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-green-800 dark:text-green-200 font-semibold mb-1">
                    Already Purchased
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-sm">
                    You have full access to this prompt
                  </div>
                </div>
              ) : isOwner ? (
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Crown className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-blue-800 dark:text-blue-200 font-semibold mb-1">
                    Your Creation
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm">
                    You own this prompt
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handlePurchase}
                  disabled={!isConnected || purchasing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {purchasing ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase Prompt
                    </>
                  )}
                </Button>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>

              {/* Tip Creator */}
              {!isOwner && (
                <div className="border-t pt-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Tip the Creator
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      min="1"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                      placeholder="Amount"
                    />
                    <Button 
                      onClick={handleTip} 
                      disabled={!isConnected || tipping}
                    >
                      {tipping ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Gift className="w-4 h-4 mr-2" />
                      )}
                      Tip
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="prompt">Full Prompt</TabsTrigger>
          <TabsTrigger value="sample">Sample Output</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Prompt Preview
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {prompt.preview}
              </pre>
            </div>
            {!hasPurchased && !isOwner && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Purchase this prompt to access the full content with detailed instructions and examples.
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Full Prompt
              </h3>
              {(hasPurchased || isOwner) && (
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              )}
            </div>
            
            {hasPurchased || isOwner ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {prompt.content}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Purchase to View Full Prompt
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Get access to the complete prompt with all instructions and examples.
                </p>
                <Button onClick={handlePurchase} disabled={!isConnected || purchasing}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase for {prompt.price} PROMPT
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="sample" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sample Output
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {prompt.sampleOutput}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reviews & Ratings
            </h3>
            <div className="space-y-4">
              {/* Sample Reviews */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">John Doe</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Excellent prompt! Generated amazing results that exceeded my expectations. Worth every token.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Maria Smith</div>
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Great structure and examples. Helped me improve my workflow significantly.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}