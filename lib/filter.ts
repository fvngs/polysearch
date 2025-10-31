import type { Market } from "@/data/markets";

export type SortKey = "liquidity" | "volume24h" | "liquidityIncentiveBand" | "rewardRate" | "probability" | "endDate";
export type SortDirection = "asc" | "desc";

export interface MarketFilters {
  search?: string;
  categories?: string[];
  statuses?: string[];
  minLiquidity?: number;
  maxLiquidity?: number;
  minVolume24h?: number;
  maxVolume24h?: number;
  minLiquidityBand?: number;
  maxLiquidityBand?: number;
  minRewardRate?: number;
  maxRewardRate?: number;
  minProbability?: number;
  maxProbability?: number;
  endDateFrom?: string;
  endDateTo?: string;
  sortBy?: SortKey;
  sortDir?: SortDirection;
}

const toLower = (value?: string) => value?.toLowerCase() ?? "";

const between = (value: number, min?: number, max?: number) => {
  if (typeof min === "number" && value < min) return false;
  if (typeof max === "number" && value > max) return false;
  return true;
};

const withinDateRange = (date: string, from?: string, to?: string) => {
  const target = new Date(date).getTime();
  if (from) {
    const fromTime = new Date(from).getTime();
    if (target < fromTime) return false;
  }
  if (to) {
    const toTime = new Date(to).getTime();
    if (target > toTime) return false;
  }
  return true;
};

const sorters: Record<SortKey, (market: Market) => number> = {
  liquidity: (market) => market.liquidity,
  volume24h: (market) => market.volume24h,
  liquidityIncentiveBand: (market) => market.liquidityIncentiveBand,
  rewardRate: (market) => market.rewardRate,
  probability: (market) => market.probability,
  endDate: (market) => new Date(market.endDate).getTime()
};

export const filterMarkets = (items: Market[], filters: MarketFilters) => {
  const {
    search,
    categories,
    statuses,
    minLiquidity,
    maxLiquidity,
    minVolume24h,
    maxVolume24h,
    minLiquidityBand,
    maxLiquidityBand,
    minRewardRate,
    maxRewardRate,
    minProbability,
    maxProbability,
    endDateFrom,
    endDateTo,
    sortBy = "liquidity",
    sortDir = "desc"
  } = filters;

  const result = items.filter((market) => {
    const searchTerm = toLower(search);
    if (
      searchTerm &&
      !(
        toLower(market.question).includes(searchTerm) ||
        market.tags.some((tag) => toLower(tag).includes(searchTerm)) ||
        toLower(market.category).includes(searchTerm) ||
        toLower(market.subcategory).includes(searchTerm)
      )
    ) {
      return false;
    }

    if (categories?.length && !categories.includes(market.category)) {
      return false;
    }

    if (statuses?.length && !statuses.includes(market.status)) {
      return false;
    }

    if (!between(market.liquidity, minLiquidity, maxLiquidity)) {
      return false;
    }

    if (!between(market.volume24h, minVolume24h, maxVolume24h)) {
      return false;
    }

    if (!between(market.liquidityIncentiveBand, minLiquidityBand, maxLiquidityBand)) {
      return false;
    }

    if (!between(market.rewardRate, minRewardRate, maxRewardRate)) {
      return false;
    }

    if (!between(market.probability, minProbability, maxProbability)) {
      return false;
    }

    if (!withinDateRange(market.endDate, endDateFrom, endDateTo)) {
      return false;
    }

    return true;
  });

  const sorted = [...result].sort((a, b) => {
    const sorter = sorters[sortBy];
    const aValue = sorter(a);
    const bValue = sorter(b);
    return sortDir === "asc" ? aValue - bValue : bValue - aValue;
  });

  return sorted;
};

export const parseFilters = (params: URLSearchParams): MarketFilters => {
  const parseNumber = (value?: string | null) => {
    if (!value) return undefined;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : undefined;
  };

  const parseArray = (value?: string | null) =>
    value ? value.split(",").map((item) => item.trim()).filter(Boolean) : undefined;

  const filter: MarketFilters = {
    search: params.get("search") ?? undefined,
    categories: parseArray(params.get("categories")),
    statuses: parseArray(params.get("statuses")),
    minLiquidity: parseNumber(params.get("minLiquidity")),
    maxLiquidity: parseNumber(params.get("maxLiquidity")),
    minVolume24h: parseNumber(params.get("minVolume24h")),
    maxVolume24h: parseNumber(params.get("maxVolume24h")),
    minLiquidityBand: parseNumber(params.get("minLiquidityBand")),
    maxLiquidityBand: parseNumber(params.get("maxLiquidityBand")),
    minRewardRate: parseNumber(params.get("minRewardRate")),
    maxRewardRate: parseNumber(params.get("maxRewardRate")),
    minProbability: parseNumber(params.get("minProbability")),
    maxProbability: parseNumber(params.get("maxProbability")),
    endDateFrom: params.get("endDateFrom") ?? undefined,
    endDateTo: params.get("endDateTo") ?? undefined,
    sortBy: (params.get("sortBy") as SortKey | null) ?? undefined,
    sortDir: (params.get("sortDir") as SortDirection | null) ?? undefined
  };

  return filter;
};
