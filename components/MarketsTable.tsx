"use client";

import type { Market } from "@/data/markets";
import { format } from "date-fns";
import { useMemo } from "react";

interface MarketsTableProps {
  markets: Market[];
  isLoading?: boolean;
}

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
});

const formatDate = (value: string) => {
  try {
    return format(new Date(value), "MMM d, yyyy");
  } catch (error) {
    return value;
  }
};

export function MarketsTable({ markets, isLoading }: MarketsTableProps) {
  const rows = useMemo(() => {
    return markets.map((market) => {
      const yesPrice = market.probability;
      const spread = Math.abs(0.5 - market.probability);
      return {
        ...market,
        yesPrice,
        spread
      };
    });
  }, [markets]);

  if (!isLoading && rows.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 p-8 text-center font-mono text-sm text-emerald-200/70">
        No markets match the current filters.
      </div>
    );
  }

  if (isLoading && rows.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 p-8 font-mono text-sm text-emerald-200/70">
        <div className="space-y-3">
          <div className="h-6 w-40 animate-pulse rounded bg-emerald-400/20" />
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded bg-emerald-400/10" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
      <div className="overflow-x-auto">
        <table className={`min-w-full table-fixed border-collapse font-mono text-[13px] text-emerald-100 ${
          isLoading ? "opacity-70" : ""
        }`}>
          <thead>
            <tr className="bg-[#071021] text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">
              <th scope="col" className="px-4 py-4 text-left">Market</th>
              <th scope="col" className="px-4 py-4 text-right">Price (Yes)</th>
              <th scope="col" className="px-4 py-4 text-right">Spread</th>
              <th scope="col" className="px-4 py-4 text-right">24h Vol</th>
              <th scope="col" className="px-4 py-4 text-right">Liquidity</th>
              <th scope="col" className="px-4 py-4 text-right">Incentive Band</th>
              <th scope="col" className="px-4 py-4 text-right">Reward</th>
              <th scope="col" className="px-4 py-4 text-right">Ends</th>
              <th scope="col" className="px-4 py-4 text-right">Trade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((market) => (
              <tr
                key={market.id}
                className="border-t border-emerald-400/10 bg-black/20 transition-colors hover:bg-emerald-500/5"
              >
                <td className="px-4 py-4 align-top text-left">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg" aria-hidden>
                      {market.icon ?? "🪙"}
                    </span>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-emerald-100">{market.question}</p>
                        <span className="rounded-full border border-emerald-400/30 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-300/80">
                          {market.status}
                        </span>
                      </div>
                      <p className="text-[12px] text-emerald-200/70">
                        {market.category}
                        {market.subcategory ? ` · ${market.subcategory}` : ""}
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px] uppercase tracking-wide text-emerald-200/50">
                        {market.tags.map((tag) => (
                          <span key={tag} className="rounded border border-emerald-400/20 bg-emerald-400/5 px-1.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-emerald-200">
                  {percentFormatter.format(market.yesPrice)}
                </td>
                <td className="px-4 py-4 text-right text-emerald-200/80">
                  {percentFormatter.format(market.spread)}
                </td>
                <td className="px-4 py-4 text-right">
                  {usdFormatter.format(market.volume24h)}
                </td>
                <td className="px-4 py-4 text-right">
                  {usdFormatter.format(market.liquidity)}
                </td>
                <td className="px-4 py-4 text-right text-emerald-100/90">
                  {usdFormatter.format(market.liquidityIncentiveBand)}
                </td>
                <td className="px-4 py-4 text-right text-emerald-200">
                  {market.rewardRate.toFixed(1)}%
                </td>
                <td className="px-4 py-4 text-right text-emerald-200/80">
                  {formatDate(market.endDate)}
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    className="rounded border border-emerald-400/50 bg-emerald-400/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/20"
                  >
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && (
        <div className="border-t border-emerald-400/10 bg-[#071021] px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-300/70">
          Updating...
        </div>
      )}
    </div>
  );
}
