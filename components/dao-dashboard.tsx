"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Vote, 
  Coins, 
  Users, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Target,
  Wallet,
  Lock,
  Unlock
} from 'lucide-react';
import { useWeb3 } from '@/components/web3-provider';

const proposals = [
  {
    id: 1,
    title: 'Increase Creator Rewards by 25%',
    description: 'Proposal to increase the base reward rate for prompt creators from 70% to 87.5% of purchase price.',
    status: 'active',
    type: 'governance',
    votesFor: 1234,
    votesAgainst: 456,
    totalVotes: 1690,
    quorum: 2000,
    timeLeft: '5 days',
    createdBy: 'DAO Council',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'New Category: AI Art Prompts',
    description: 'Add a dedicated category for AI art generation prompts with specialized curation.',
    status: 'active',
    type: 'platform',
    votesFor: 2156,
    votesAgainst: 234,
    totalVotes: 2390,
    quorum: 2000,
    timeLeft: '2 days',
    createdBy: 'Community',
    createdAt: '2024-01-18'
  },
  {
    id: 3,
    title: 'Implement Staking Rewards',
    description: 'Enable PROMPT token staking with 8% APY for governance participants.',
    status: 'passed',
    type: 'tokenomics',
    votesFor: 3456,
    votesAgainst: 1234,
    totalVotes: 4690,
    quorum: 2000,
    timeLeft: 'Ended',
    createdBy: 'Core Team',
    createdAt: '2024-01-10'
  }
];

const stakingPools = [
  {
    id: 1,
    name: 'Governance Pool',
    apy: 8.5,
    totalStaked: '1234567',
    userStaked: '1250',
    rewards: '125.43',
    lockPeriod: '30 days'
  },
  {
    id: 2,
    name: 'Creator Support Pool',
    apy: 12.3,
    totalStaked: '567890',
    userStaked: '500',
    rewards: '67.89',
    lockPeriod: '90 days'
  }
];

const daoStats = {
  totalMembers: 12456,
  totalProposals: 67,
  totalVotes: 234567,
  treasuryBalance: '2345678',
  avgParticipation: 67.5
};

export function DAODashboard() {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [stakingAmount, setStakingAmount] = useState('');
  const [mounted, setMounted] = useState(false);
  const { isConnected, promptTokenBalance } = useWeb3();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVote = (proposalId: number, vote: 'for' | 'against') => {
    // Mock vote implementation
    console.log(`Voting ${vote} on proposal ${proposalId}`);
  };

  const handleStake = (poolId: number) => {
    // Mock staking implementation
    console.log(`Staking ${stakingAmount} in pool ${poolId}`);
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500';
      case 'passed':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProposalStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'passed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Safe number formatting that works on both server and client
  const formatNumber = (num: number | string) => {
    if (!mounted) return '0';
    const numValue = typeof num === 'string' ? parseInt(num) : num;
    return numValue.toLocaleString();
  };

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* DAO Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(daoStats.totalMembers)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Vote className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {daoStats.totalProposals}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Proposals</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(daoStats.totalVotes)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Votes</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(daoStats.treasuryBalance)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Treasury</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {daoStats.avgParticipation}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Participation</div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Active Proposals
            </h3>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Create Proposal
            </Button>
          </div>

          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getProposalStatusColor(proposal.status)} text-white`}>
                      {getProposalStatusIcon(proposal.status)}
                      {proposal.status}
                    </Badge>
                    <Badge variant="outline">{proposal.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {proposal.timeLeft}
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {proposal.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {proposal.description}
                </p>

                {/* Voting Progress */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      For: {formatNumber(proposal.votesFor)} votes
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Against: {formatNumber(proposal.votesAgainst)} votes
                    </span>
                  </div>
                  
                  <Progress 
                    value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      {formatNumber(proposal.totalVotes)} / {formatNumber(proposal.quorum)} votes
                    </span>
                    <span>
                      {Math.round((proposal.totalVotes / proposal.quorum) * 100)}% of quorum
                    </span>
                  </div>
                </div>

                {/* Voting Buttons */}
                {proposal.status === 'active' && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleVote(proposal.id, 'for')}
                      disabled={!isConnected}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Vote For
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, 'against')}
                      disabled={!isConnected}
                      variant="outline"
                      className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Vote Against
                    </Button>
                  </div>
                )}

                {/* Metadata */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Created by {proposal.createdBy}</span>
                    <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staking" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Staking Pools
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Wallet className="w-4 h-4" />
              Balance: {promptTokenBalance} PROMPT
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stakingPools.map((pool) => (
              <Card key={pool.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pool.name}
                  </h4>
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    {pool.apy}% APY
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Staked</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatNumber(pool.totalStaked)} PROMPT
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Your Stake</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {pool.userStaked} PROMPT
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Pending Rewards</span>
                    <span className="font-medium text-green-600">
                      {pool.rewards} PROMPT
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Lock Period</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {pool.lockPeriod}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={stakingAmount}
                      onChange={(e) => setStakingAmount(e.target.value)}
                      placeholder="Amount to stake"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                    />
                    <Button
                      onClick={() => handleStake(pool.id)}
                      disabled={!isConnected}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Stake
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" disabled={!isConnected}>
                      <Unlock className="w-4 h-4 mr-2" />
                      Unstake
                    </Button>
                    <Button variant="outline" className="flex-1" disabled={!isConnected}>
                      <Trophy className="w-4 h-4 mr-2" />
                      Claim
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="treasury" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Treasury Overview
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatNumber(daoStats.treasuryBalance)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Treasury
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatNumber(456789)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatNumber(1888889)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Staked
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Treasury Actions
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-300">Creator reward distribution</span>
                <span className="text-red-600">-{formatNumber(125000)} PROMPT</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-300">Platform fees collected</span>
                <span className="text-green-600">+{formatNumber(45000)} PROMPT</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-300">Development fund allocation</span>
                <span className="text-red-600">-{formatNumber(200000)} PROMPT</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}