"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Trophy, 
  Users, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Github, 
  Globe, 
  Crown, 
  Medal, 
  Award, 
  UserPlus,
  ShoppingCart,
  Gift,
  Copy,
  Download,
  BarChart3,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useWeb3 } from '@/components/web3-provider';
import { useToast } from '@/hooks/use-toast';
import { CreatorSalesDashboard } from '@/components/creator-sales-dashboard';

interface CreatorProfileProps {
  address: string;
}

interface UserData {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  reputation: string;
  joinedDate: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  stats: {
    followers: number;
    following: number;
    prompts: number;
    totalEarnings: number;
    avgRating: number;
    totalViews: number;
    totalPurchases: number;
  };
  achievements: Array<{
    type: string;
    earnedAt: string;
    description: string;
  }>;
  categories: string[];
  isFollowing: boolean;
}

interface Purchase {
  _id: string;
  prompt: {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    type: string;
  };
  amount: number;
  createdAt: string;
  status: string;
}

interface Creation {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  type: string;
  stats: {
    hearts: number;
    views: number;
    purchases: number;
    rating: number;
  };
  trending: boolean;
  createdAt: string;
}

interface Tip {
  _id: string;
  from: string;
  to: string;
  amount: number;
  message?: string;
  prompt?: {
    _id: string;
    title: string;
  };
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

const getReputationColor = (reputation: string) => {
  switch (reputation) {
    case 'Gold':
      return 'bg-yellow-500';
    case 'Silver':
      return 'bg-gray-400';
    case 'Bronze':
      return 'bg-orange-500';
    case 'Platinum':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

export function CreatorProfile({ address }: CreatorProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [tipsReceived, setTipsReceived] = useState<Tip[]>([]);
  const [tipsSent, setTipsSent] = useState<Tip[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('creations');
  
  const { isConnected, account } = useWeb3();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, [address]);

  useEffect(() => {
    if (activeTab === 'purchases') {
      fetchPurchases();
    } else if (activeTab === 'creations') {
      fetchCreations();
    } else if (activeTab === 'tips-received') {
      fetchTipsReceived();
    } else if (activeTab === 'tips-sent') {
      fetchTipsSent();
    }
  }, [activeTab, address]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${address}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsFollowing(data.isFollowing);
      } else {
        // Create default user if not found
        const defaultUser: UserData = {
          address,
          name: `User ${address.slice(0, 6)}`,
          bio: 'AI enthusiast and prompt creator',
          avatar: '',
          reputation: 'Bronze',
          joinedDate: new Date().toISOString(),
          stats: {
            followers: 0,
            following: 0,
            prompts: 0,
            totalEarnings: 0,
            avgRating: 0,
            totalViews: 0,
            totalPurchases: 0
          },
          achievements: [],
          categories: [],
          isFollowing: false
        };
        setUserData(defaultUser);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`/api/users/${address}/purchases`);
      if (response.ok) {
        const data = await response.json();
        setPurchases(data.purchases || []);
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const fetchCreations = async () => {
    try {
      const response = await fetch(`/api/users/${address}/creations`);
      if (response.ok) {
        const data = await response.json();
        setCreations(data.prompts || []);
      }
    } catch (error) {
      console.error('Error fetching creations:', error);
    }
  };

  const fetchTipsReceived = async () => {
    try {
      const response = await fetch(`/api/users/${address}/tips?type=received`);
      if (response.ok) {
        const data = await response.json();
        setTipsReceived(data.tips || []);
      }
    } catch (error) {
      console.error('Error fetching tips received:', error);
    }
  };

  const fetchTipsSent = async () => {
    try {
      const response = await fetch(`/api/users/${address}/tips?type=sent`);
      if (response.ok) {
        const data = await response.json();
        setTipsSent(data.tips || []);
      }
    } catch (error) {
      console.error('Error fetching tips sent:', error);
    }
  };

  const handleFollow = async () => {
    if (!isConnected || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to follow users.",
        variant: "destructive",
      });
      return;
    }

    try {
      const method = isFollowing ? 'DELETE' : 'POST';
      const response = await fetch(`/api/users/${address}/follow`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerAddress: account }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
        toast({
          title: isFollowing ? "Unfollowed" : "Following",
          description: `You are now ${isFollowing ? 'not following' : 'following'} ${userData?.name}`,
        });
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status.",
        variant: "destructive",
      });
    }
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

  if (!userData) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          User Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          The user you&#39;re looking for doesn&#39;t exist.
        </p>
      </div>
    );
  }

  const isOwner = account?.toLowerCase() === address.toLowerCase();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-start gap-6">
            <div className="relative">
            <Avatar className="w-24 h-24">
     {userData.avatar ? (
       <AvatarImage src={userData.avatar} alt={userData.name} />
     ) : null}
     <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
       <User className="w-10 h-10 text-gray-400" />
     </AvatarFallback>
   </Avatar>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${getReputationColor(userData.reputation)} border-4 border-white dark:border-gray-800 flex items-center justify-center`}>
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </h1>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  {userData.reputation}
                </Badge>
              </div>
              
              <div className="text-gray-600 dark:text-gray-400 mb-2">
                {userData.address}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {userData.bio}
              </p>
              
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(userData.joinedDate).toLocaleDateString()}
                </div>
                {userData.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {userData.location}
                  </div>
                )}
              </div>
              
              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {userData.website && (
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                )}
                {userData.twitter && (
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                )}
                {userData.github && (
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isOwner && (
                  <Button 
                    onClick={handleFollow}
                    disabled={!isConnected}
                    className={isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Card */}
        <div className="lg:w-80">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Creator Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.stats.followers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.stats.prompts}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Prompts</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 dark:text-white">
                  <Coins className="w-5 h-5 text-purple-600" />
                  {userData.stats.totalEarnings}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Earnings</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 dark:text-white">
                  <Star className="w-5 h-5 text-yellow-500" />
                  {userData.stats.avgRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Achievements */}
      {userData.achievements.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Achievements
          </h3>
          <div className="flex flex-wrap gap-4">
            {userData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {achievement.type}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Categories */}
      {userData.categories.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {userData.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="creations">My Creations ({creations.length})</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases ({userData.stats.totalPurchases})</TabsTrigger>
          <TabsTrigger value="tips-received">Tips Received</TabsTrigger>
          <TabsTrigger value="tips-sent">Tips Sent</TabsTrigger>
          {isOwner && <TabsTrigger value="sales">Sales Dashboard</TabsTrigger>}
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creations" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.map((creation) => (
              <Card key={creation._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTypeIcon(creation.type)}
                      {creation.type.charAt(0).toUpperCase() + creation.type.slice(1)}
                    </Badge>
                    {creation.trending && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {creation.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {creation.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      {creation.price}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {creation.stats.hearts}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {creation.stats.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4" />
                        {creation.stats.purchases}
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/prompt/${creation._id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      View Prompt
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          {creations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No creations yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="purchases" className="space-y-4">
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <Card key={purchase._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {purchase.prompt.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {purchase.prompt.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <Badge variant="secondary">{purchase.prompt.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4" />
                        {purchase.amount} PROMPT
                      </div>
                      <span>{new Date(purchase.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* You can add action buttons here if needed */}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {purchases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No purchases yet.</p>
            </div>
          )}
        </TabsContent>
        {/* Add other TabsContent for tips-received, tips-sent, sales, activity as needed */}
      </Tabs>
    </div>
  );
}