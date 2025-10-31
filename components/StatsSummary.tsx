"use client";

import type { Market } from "@/data/markets";

interface StatsSummaryProps {
  markets: Market[];
}

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);

export function StatsSummary({ markets }: StatsSummaryProps) {
  if (!markets.length) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 p-6 font-mono text-sm text-emerald-200/70 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
        Adjust your filters to populate the terminal.
      </div>
    );
  }

  const totalLiquidity = markets.reduce((acc, market) => acc + market.liquidity, 0);
  const totalVolume = markets.reduce((acc, market) => acc + market.volume24h, 0);
  const avgReward = markets.reduce((acc, market) => acc + market.rewardRate, 0) / markets.length;

  return (
    <section className="grid gap-4 rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 p-6 font-mono text-sm text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.08)] sm:grid-cols-3">
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Filtered Liquidity</p>
        <p className="text-2xl text-emerald-100">{formatUSD(totalLiquidity)}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">24h Volume</p>
        <p className="text-2xl text-emerald-100">{formatUSD(totalVolume)}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Average Reward APY</p>
        <p className="text-2xl text-emerald-100">{avgReward.toFixed(1)}%</p>
      </div>
    </section>
  );
}
