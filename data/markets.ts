export interface Market {
  id: string;
  question: string;
  category: string;
  subcategory?: string;
  tags: string[];
  status: "open" | "resolved" | "upcoming";
  endDate: string;
  probability: number;
  liquidity: number;
  volume24h: number;
  liquidityIncentiveBand: number;
  rewardRate: number;
  icon?: string;
}

export const markets: Market[] = [
  {
    id: "1",
    question: "Will BTC exceed $80k by December 31, 2024?",
    category: "Crypto",
    subcategory: "Bitcoin",
    tags: ["BTC", "Price", "2024"],
    status: "open",
    endDate: "2024-12-31T23:59:59Z",
    probability: 0.42,
    liquidity: 520000,
    volume24h: 68500,
    liquidityIncentiveBand: 380000,
    rewardRate: 12.5,
    icon: "🟠"
  },
  {
    id: "2",
    question: "Will the US Fed cut rates at the September 2024 meeting?",
    category: "Macro",
    subcategory: "Federal Reserve",
    tags: ["FOMC", "Interest Rates"],
    status: "open",
    endDate: "2024-09-18T20:00:00Z",
    probability: 0.63,
    liquidity: 310000,
    volume24h: 45250,
    liquidityIncentiveBand: 220000,
    rewardRate: 9.2,
    icon: "🏦"
  },
  {
    id: "3",
    question: "Will ETH staking deposits exceed withdrawals this quarter?",
    category: "Crypto",
    subcategory: "Ethereum",
    tags: ["ETH", "Staking"],
    status: "open",
    endDate: "2024-06-30T23:59:59Z",
    probability: 0.55,
    liquidity: 210000,
    volume24h: 37500,
    liquidityIncentiveBand: 150000,
    rewardRate: 7.1,
    icon: "💠"
  },
  {
    id: "4",
    question: "Will SpaceX complete Starship orbital launch in 2024?",
    category: "Technology",
    subcategory: "Space",
    tags: ["SpaceX", "Starship"],
    status: "open",
    endDate: "2024-12-01T00:00:00Z",
    probability: 0.48,
    liquidity: 185000,
    volume24h: 28500,
    liquidityIncentiveBand: 120000,
    rewardRate: 6.4,
    icon: "🚀"
  },
  {
    id: "5",
    question: "Will the S&P 500 close above 5,500 on December 31, 2024?",
    category: "Macro",
    subcategory: "Equities",
    tags: ["S&P 500", "Index"],
    status: "open",
    endDate: "2024-12-31T21:00:00Z",
    probability: 0.37,
    liquidity: 195000,
    volume24h: 20500,
    liquidityIncentiveBand: 98000,
    rewardRate: 5.9,
    icon: "📈"
  },
  {
    id: "6",
    question: "Will a spot ETH ETF be approved by October 31, 2024?",
    category: "Crypto",
    subcategory: "Regulation",
    tags: ["ETH", "ETF"],
    status: "open",
    endDate: "2024-10-31T23:59:59Z",
    probability: 0.33,
    liquidity: 265000,
    volume24h: 41800,
    liquidityIncentiveBand: 180000,
    rewardRate: 8.4,
    icon: "📜"
  },
  {
    id: "7",
    question: "Will Trump win the 2024 US Presidential election?",
    category: "Politics",
    subcategory: "US",
    tags: ["Election", "2024"],
    status: "open",
    endDate: "2024-11-06T08:00:00Z",
    probability: 0.47,
    liquidity: 640000,
    volume24h: 92500,
    liquidityIncentiveBand: 470000,
    rewardRate: 14.8,
    icon: "🇺🇸"
  },
  {
    id: "8",
    question: "Will Solana TVL exceed $5B by year end?",
    category: "Crypto",
    subcategory: "Solana",
    tags: ["SOL", "DeFi"],
    status: "open",
    endDate: "2024-12-31T23:59:59Z",
    probability: 0.29,
    liquidity: 132000,
    volume24h: 16400,
    liquidityIncentiveBand: 87000,
    rewardRate: 4.6,
    icon: "🔥"
  },
  {
    id: "9",
    question: "Will AI regulation pass in the EU by Q3 2024?",
    category: "Technology",
    subcategory: "Policy",
    tags: ["AI", "Regulation"],
    status: "open",
    endDate: "2024-09-30T23:59:59Z",
    probability: 0.58,
    liquidity: 98000,
    volume24h: 8400,
    liquidityIncentiveBand: 64000,
    rewardRate: 3.1,
    icon: "🤖"
  },
  {
    id: "10",
    question: "Will Bitcoin dominance exceed 55% in 2024?",
    category: "Crypto",
    subcategory: "Bitcoin",
    tags: ["BTC", "Dominance"],
    status: "open",
    endDate: "2024-12-31T23:59:59Z",
    probability: 0.51,
    liquidity: 150000,
    volume24h: 19800,
    liquidityIncentiveBand: 104000,
    rewardRate: 5.5,
    icon: "🟠"
  }
];
