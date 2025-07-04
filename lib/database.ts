// This file is now deprecated in favor of MongoDB services
// Keeping for backward compatibility during transition

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  preview: string;
  sampleOutput: string;
  category: string;
  type: string;
  price: number;
  creator: {
    name: string;
    address: string;
    avatar: string;
    reputation: string;
  };
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
  updatedAt: string;
}

export interface User {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  reputation: string;
  joinedDate: string;
  location: string;
  website: string;
  twitter: string;
  github: string;
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
    icon: string;
    color: string;
  }>;
  categories: string[];
  isFollowing: boolean;
}

// Mock data for backward compatibility
const mockPrompts: Prompt[] = [];
const mockUsers: User[] = [];

export class Database {
  static getAllPrompts(): Prompt[] {
    return mockPrompts;
  }

  static getPromptById(id: string): Prompt | null {
    return mockPrompts.find(prompt => prompt.id === id) || null;
  }

  static getTrendingPrompts(): Prompt[] {
    return mockPrompts.filter(prompt => prompt.trending);
  }

  static searchPrompts(query: string): Prompt[] {
    return mockPrompts.filter(prompt => 
      prompt.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  static sortPrompts(prompts: Prompt[], sortBy: string): Prompt[] {
    return prompts;
  }

  static getStats() {
    return {
      totalPrompts: 0,
      totalCreators: 0,
      totalEarnings: 0,
      totalPurchases: 0,
      avgRating: 0,
      categoryCounts: {}
    };
  }
}