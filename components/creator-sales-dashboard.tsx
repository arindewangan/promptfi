"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Calendar,
  Download,
  BarChart3,
  Coins,
  Star,
  Users
} from 'lucide-react';
import { useWeb3 } from '@/components/web3-provider';

interface SalesData {
  totalEarnings: number;
  totalSales: number;
  totalViews: number;
  avgRating: number;
  recentSales: Array<{
    _id: string;
    buyer: string;
    prompt: {
      title: string;
      price: number;
    };
    amount: number;
    createdAt: string;
  }>;
  topPrompts: Array<{
    _id: string;
    title: string;
    stats: {
      purchases: number;
      views: number;
      rating: number;
    };
    price: number;
    earnings: number;
  }>;
  monthlyEarnings: Array<{
    month: string;
    earnings: number;
    sales: number;
  }>;
}

interface CreatorSalesDashboardProps {
  creatorAddress: string;
}

export function CreatorSalesDashboard({ creatorAddress }: CreatorSalesDashboardProps) {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const { account } = useWeb3();

  useEffect(() => {
    if (creatorAddress) {
      fetchSalesData();
    }
  }, [creatorAddress, timeRange]);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${creatorAddress}/sales?timeRange=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setSalesData(data);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOwner = account?.toLowerCase() === creatorAddress.toLowerCase();

  if (!isOwner) {
    return null; // Only show to the creator themselves
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!salesData) {
    return (
      <Card className="p-6">
        <p className="text-gray-600 dark:text-gray-300">
          No sales data available.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sales Dashboard
        </h2>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {salesData.totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% from last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {salesData.totalSales.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-blue-600">
            <TrendingUp className="w-4 h-4" />
            <span>+8.3% from last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {salesData.totalViews.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-purple-600">
            <TrendingUp className="w-4 h-4" />
            <span>+15.7% from last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {salesData.avgRating.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-yellow-600">
            <TrendingUp className="w-4 h-4" />
            <span>+0.2 from last period</span>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="recent-sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent-sales">Recent Sales</TabsTrigger>
          <TabsTrigger value="top-prompts">Top Prompts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-sales" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Sales
                </h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Prompt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {salesData.recentSales.map((sale) => (
                    <tr key={sale._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {sale.prompt.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {sale.buyer.slice(0, 6)}...{sale.buyer.slice(-4)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <Coins className="w-4 h-4" />
                          {sale.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="top-prompts" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Performing Prompts
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Prompt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {salesData.topPrompts.map((prompt) => (
                    <tr key={prompt._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {prompt.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {prompt.stats.purchases}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {prompt.stats.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {prompt.stats.rating.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <Coins className="w-4 h-4" />
                          {prompt.earnings}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Earnings Trend
              </h3>
              <div className="space-y-3">
                {salesData.monthlyEarnings.map((month) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {month.month}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {month.sales} sales
                      </span>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                        <Coins className="w-4 h-4" />
                        {month.earnings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
                    <span className="font-medium text-gray-900 dark:text-white">3.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Avg. Prompt Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {(salesData.totalEarnings / salesData.totalSales).toFixed(0)} PROMPT
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {((salesData.avgRating / 5) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(salesData.avgRating / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}