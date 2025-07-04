// Platform Configuration Constants
export const PLATFORM_CONFIG = {
  // Token Economics
  FREE_TOKENS_ON_SIGNUP: 100,
  PLATFORM_FEE_PERCENTAGE: 5,
  CREATOR_REVENUE_PERCENTAGE: 95,
  MINIMUM_TIP_AMOUNT: 1,
  MINIMUM_PROMPT_PRICE: 5,
  MAXIMUM_PROMPT_PRICE: 1000,
  
  // DAO Configuration
  GOVERNANCE_TOKEN_THRESHOLD: 100, // Minimum tokens to vote
  PROPOSAL_CREATION_THRESHOLD: 1000, // Minimum tokens to create proposal
  VOTING_PERIOD_DAYS: 7,
  QUORUM_PERCENTAGE: 20,
  
  // Staking Rewards
  GOVERNANCE_POOL_APY: 8.5,
  CREATOR_SUPPORT_POOL_APY: 12.3,
  MINIMUM_STAKE_AMOUNT: 50,
  LOCK_PERIODS: {
    SHORT: 30, // days
    MEDIUM: 90,
    LONG: 180
  },
  
  // Platform Limits
  MAX_PROMPTS_PER_USER: 100,
  MAX_TAGS_PER_PROMPT: 10,
  MAX_PROMPT_LENGTH: 10000,
  MAX_DESCRIPTION_LENGTH: 500,
  
  // Reputation System
  REPUTATION_THRESHOLDS: {
    BRONZE: 0,
    SILVER: 1000,
    GOLD: 5000,
    PLATINUM: 15000
  },
  
  // Categories
  PROMPT_CATEGORIES: [
    'Social Media',
    'Content Marketing', 
    'SEO',
    'E-commerce',
    'Programming',
    'Design',
    'Architecture',
    'Gaming',
    'Education',
    'Business',
    'Creative Writing',
    'Data Analysis',
    'Healthcare',
    'Legal',
    'Finance',
    'Travel',
    'Food & Cooking',
    'Fitness',
    'Music',
    'Art'
  ],
  
  // Prompt Types
  PROMPT_TYPES: [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'midjourney', label: 'Midjourney' },
    { value: 'dalle', label: 'DALL-E' },
    { value: 'stable-diffusion', label: 'Stable Diffusion' },
    { value: 'code', label: 'Code Assistant' },
    { value: 'custom', label: 'Custom' }
  ]
};

// UI Constants
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 12,
  SEARCH_DEBOUNCE_MS: 300,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
  
  // Colors
  COLORS: {
    PRIMARY: 'from-purple-600 to-blue-600',
    PRIMARY_HOVER: 'from-purple-700 to-blue-700',
    SUCCESS: 'text-green-600',
    ERROR: 'text-red-600',
    WARNING: 'text-yellow-600'
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  PROMPTS: '/api/prompts',
  USERS: '/api/users',
  TRANSACTIONS: '/api/transactions',
  DAO: '/api/dao',
  ANALYTICS: '/api/analytics'
};

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient token balance',
  PROMPT_NOT_FOUND: 'Prompt not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NETWORK_ERROR: 'Network error. Please try again.',
  INVALID_INPUT: 'Please check your input and try again'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROMPT_UPLOADED: 'Prompt uploaded successfully!',
  PROMPT_PURCHASED: 'Prompt purchased successfully!',
  TIP_SENT: 'Tip sent successfully!',
  VOTE_CAST: 'Vote cast successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!'
};