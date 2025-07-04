"use client";

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Coins,
  Crown,
  Medal,
  Award
} from 'lucide-react';
import Link from 'next/link';

const topCreators = [
  {
    rank: 1,
    name: 'Sarah Chen',
    address: '0x1234...5678',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Gold',
    earnings: '2,456',
    prompts: 89,
    followers: 1234,
    category: 'Social Media'
  },
  {
    rank: 2,
    name: 'Alex Rodriguez',
    address: '0x2345...6789',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Gold',
    earnings: '1,892',
    prompts: 67,
    followers: 967,
    category: 'Architecture'
  },
  {
    rank: 3,
    name: 'Emma Johnson',
    address: '0x3456...7890',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Gold',
    earnings: '1,634',
    prompts: 45,
    followers: 823,
    category: 'E-commerce'
  },
  {
    rank: 4,
    name: 'David Kim',
    address: '0x4567...8901',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Silver',
    earnings: '1,234',
    prompts: 52,
    followers: 672,
    category: 'Programming'
  },
  {
    rank: 5,
    name: 'Maya Patel',
    address: '0x5678...9012',
    avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
    reputation: 'Silver',
    earnings: '987',
    prompts: 38,
    followers: 543,
    category: 'Marketing'
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Award className="w-5 h-5 text-orange-500" />;
    default:
      return <Trophy className="w-5 h-5 text-gray-500" />;
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

export function TopCreators() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Top Creators
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Meet the most successful prompt creators in our community
            </p>
          </div>
          <Link href="/marketplace?sort=top-creators">
            <Button variant="outline">
              View All
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topCreators.map((creator) => (
            <Card key={creator.address} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="p-6 text-center">
                {/* Rank */}
                <div className="flex justify-center mb-4">
                  {getRankIcon(creator.rank)}
                </div>

                {/* Avatar */}
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback className="text-lg">{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getReputationColor(creator.reputation)} border-2 border-white dark:border-gray-800`} />
                </div>

                {/* Name and Address */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {creator.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {creator.address}
                </p>

                {/* Category */}
                <Badge variant="secondary" className="mb-4">
                  {creator.category}
                </Badge>

                {/* Stats */}
                <div className="space-y-2 mb-6">
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">Prompts</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {creator.prompts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Followers</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {creator.followers}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/profile/${creator.address}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    View Profile
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