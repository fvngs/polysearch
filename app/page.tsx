"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { FiltersPanel, type FiltersState } from "@/components/FiltersPanel";
import { MarketsTable } from "@/components/MarketsTable";
import { StatsSummary } from "@/components/StatsSummary";
import type { Market } from "@/data/markets";
import { markets as allMarkets } from "@/data/markets";
import { parseFilters } from "@/lib/filter";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { useRouter, useSearchParams } from "next/navigation";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load markets: ${response.status}`);
  }
  return response.json();
};

const defaultFilters: FiltersState = {
  sortBy: "liquidity",
  sortDir: "desc"
};

const buildQueryString = (filters: FiltersState) => {
  const params = new URLSearchParams();

  const assign = (key: string, value: string | undefined) => {
    if (value && value.length > 0) {
      params.set(key, value);
    }
  };

  assign("search", filters.search?.trim() || undefined);
  assign("categories", filters.categories?.filter(Boolean).join(",") || undefined);
  assign("statuses", filters.statuses?.filter(Boolean).join(",") || undefined);

  const numericFields: Array<[keyof FiltersState, string]> = [
    ["minLiquidity", "minLiquidity"],
    ["maxLiquidity", "maxLiquidity"],
    ["minVolume24h", "minVolume24h"],
    ["maxVolume24h", "maxVolume24h"],
    ["minLiquidityBand", "minLiquidityBand"],
    ["maxLiquidityBand", "maxLiquidityBand"],
    ["minRewardRate", "minRewardRate"],
    ["maxRewardRate", "maxRewardRate"],
    ["minProbability", "minProbability"],
    ["maxProbability", "maxProbability"]
  ];

  numericFields.forEach(([field, key]) => {
    const value = filters[field];
    if (typeof value === "number" && !Number.isNaN(value)) {
      params.set(key, String(value));
    }
  });

  assign("endDateFrom", filters.endDateFrom);
  assign("endDateTo", filters.endDateTo);

  assign("sortBy", filters.sortBy);
  assign("sortDir", filters.sortDir);

  return params.toString();
};

const availableCategories = Array.from(new Set(allMarkets.map((market) => market.category))).sort();

interface ApiResponse {
  total: number;
  results: Market[];
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersState>(() => ({
    ...defaultFilters,
    ...parseFilters(new URLSearchParams(searchParams.toString()))
  }));

  useEffect(() => {
    const parsed = {
      ...defaultFilters,
      ...parseFilters(new URLSearchParams(searchParams.toString()))
    };

    setFilters((previous) => {
      const same = buildQueryString(previous) === buildQueryString(parsed);
      return same ? previous : parsed;
    });
  }, [searchParams]);

  const debouncedFilters = useDebouncedValue(filters, 250);

  const queryString = useMemo(() => buildQueryString(debouncedFilters), [debouncedFilters]);

  const { data, isLoading, error } = useSWR<ApiResponse>(
    `/api/markets${queryString ? `?${queryString}` : ""}`,
    fetcher,
    {
      keepPreviousData: true
    }
  );

  useEffect(() => {
    const nextQuery = buildQueryString(filters);
    const current = searchParams.toString();
    if (nextQuery !== current) {
      const path = nextQuery.length ? `?${nextQuery}` : "";
      router.replace(path, { scroll: false });
    }
  }, [filters, router, searchParams]);

  const markets = data?.results ?? [];

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-10">
      <header className="rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 px-6 py-5 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.45em] text-emerald-300/70">Polysearch Terminal</span>
          <h1 className="font-mono text-2xl text-emerald-100 sm:text-3xl">Polymarket market scanner</h1>
          <p className="font-mono text-sm text-emerald-200/70">
            Filter active markets by liquidity, 24h flow, incentive coverage, and reward rate — all from a trading terminal view.
          </p>
        </div>
      </header>

      <div className="grid flex-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="order-last lg:order-first">
          <FiltersPanel
            filters={filters}
            availableCategories={availableCategories}
            onChange={setFilters}
            onReset={() => setFilters({ ...defaultFilters })}
          />
        </div>
        <div className="flex flex-col gap-6">
          {!error && <StatsSummary markets={markets} />}
          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 font-mono text-sm text-red-200">
              {(error as Error).message}
            </div>
          )}
          <MarketsTable markets={markets} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
