import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Coins,
  Crown,
  Medal,
  Award,
  Star,
  Zap,
  Calendar,
  Target
} from 'lucide-react';
import Link from 'next/link';

const topCreators = [
  {
    rank: 1,
    name: 'Sarah Chen',
    address: '0x1234...5678',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Gold',
    earnings: '12,456',
    prompts: 89,
    followers: 1234,
    rating: 4.9,
    category: 'Social Media',
    change: '+2'
  },
  {
    rank: 2,
    name: 'Alex Rodriguez',
    address: '0x2345...6789',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Gold',
    earnings: '9,892',
    prompts: 67,
    followers: 967,
    rating: 4.8,
    category: 'Architecture',
    change: '0'
  },
  {
    rank: 3,
    name: 'Emma Johnson',
    address: '0x3456...7890',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Gold',
    earnings: '8,634',
    prompts: 45,
    followers: 823,
    rating: 4.7,
    category: 'E-commerce',
    change: '+1'
  },
  {
    rank: 4,
    name: 'David Kim',
    address: '0x4567...8901',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Silver',
    earnings: '7,234',
    prompts: 52,
    followers: 672,
    rating: 4.6,
    category: 'Programming',
    change: '-1'
  },
  {
    rank: 5,
    name: 'Maya Patel',
    address: '0x5678...9012',
    avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Silver',
    earnings: '6,987',
    prompts: 38,
    followers: 543,
    rating: 4.5,
    category: 'Marketing',
    change: '+3'
  }
];

const topPrompts = [
  {
    rank: 1,
    title: 'Professional LinkedIn Post Generator',
    creator: 'Sarah Chen',
    earnings: '2,456',
    purchases: 234,
    rating: 4.9,
    category: 'Social Media',
    change: '+1'
  },
  {
    rank: 2,
    title: 'Stunning Architecture Visualization',
    creator: 'Alex Rodriguez',
    earnings: '2,123',
    purchases: 189,
    rating: 4.8,
    category: 'Architecture',
    change: '0'
  },
  {
    rank: 3,
    title: 'E-commerce Product Descriptions',
    creator: 'Emma Johnson',
    earnings: '1,987',
    purchases: 167,
    rating: 4.7,
    category: 'E-commerce',
    change: '+2'
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-orange-500" />;
    default:
      return <Trophy className="w-6 h-6 text-gray-500" />;
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
    default:
      return 'bg-gray-500';
  }
};

const getChangeColor = (change: string) => {
  if (change.startsWith('+')) return 'text-green-600';
  if (change.startsWith('-')) return 'text-red-600';
  return 'text-gray-600';
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-black dark:to-blue-950">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover the top creators and most successful prompts on PromptFi
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">3,247</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Creators</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12,456</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Prompts</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">2.4M</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">PROMPT Earned</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">89,234</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Sales</div>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="creators" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creators">Top Creators</TabsTrigger>
            <TabsTrigger value="prompts">Top Prompts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="creators" className="space-y-6">
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {topCreators.slice(0, 3).map((creator, index) => (
                <Card key={creator.address} className={`p-6 text-center ${index === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
                  <div className="flex justify-center mb-4">
                    {getRankIcon(creator.rank)}
                  </div>
                  
                  <div className="relative mb-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback className="text-lg">{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getReputationColor(creator.reputation)} border-2 border-white dark:border-gray-800`} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {creator.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {creator.address}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Earnings</span>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {creator.earnings}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {creator.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/profile/${creator.address}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      View Profile
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  All Creators
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Creator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Earnings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Prompts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {topCreators.map((creator) => (
                      <tr key={creator.address} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {creator.rank <= 3 ? getRankIcon(creator.rank) : (
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {creator.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={creator.avatar} alt={creator.name} />
                              <AvatarFallback>{creator.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {creator.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {creator.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{creator.category}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {creator.earnings}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {creator.prompts}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {creator.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getChangeColor(creator.change)}`}>
                            {creator.change !== '0' && creator.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="prompts" className="space-y-6">
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Top Performing Prompts
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Prompt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Creator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Earnings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Purchases
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {topPrompts.map((prompt) => (
                      <tr key={prompt.rank} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {prompt.rank <= 3 ? getRankIcon(prompt.rank) : (
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {prompt.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {prompt.title}
                            </div>
                            <Badge variant="secondary" className="mt-1">
                              {prompt.category}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {prompt.creator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {prompt.earnings}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {prompt.purchases}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {prompt.rating}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Social Media', prompts: 2456, earnings: '45,678', growth: '+12%' },
                { name: 'Architecture', prompts: 1234, earnings: '32,456', growth: '+8%' },
                { name: 'E-commerce', prompts: 1876, earnings: '28,934', growth: '+15%' },
                { name: 'Programming', prompts: 987, earnings: '23,567', growth: '+5%' },
                { name: 'Marketing', prompts: 1543, earnings: '19,876', growth: '+18%' },
                { name: 'Design', prompts: 876, earnings: '15,432', growth: '+10%' }
              ].map((category) => (
                <Card key={category.name} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Prompts</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.prompts}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Earnings</span>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category.earnings}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Growth</span>
                      <span className="font-medium text-green-600">
                        {category.growth}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}