"use client";

import { useMemo } from "react";
import type { MarketFilters, SortDirection, SortKey } from "@/lib/filter";

export interface FiltersState extends MarketFilters {}

interface FiltersPanelProps {
  filters: FiltersState;
  availableCategories: string[];
  onChange: (next: FiltersState) => void;
  onReset: () => void;
}

const numberOrEmpty = (value?: number) => (typeof value === "number" ? String(value) : "");

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Highest Liquidity", value: "liquidity" },
  { label: "24h Volume", value: "volume24h" },
  { label: "Incentive Band", value: "liquidityIncentiveBand" },
  { label: "Reward APY", value: "rewardRate" },
  { label: "Probability", value: "probability" },
  { label: "Soonest Expiry", value: "endDate" }
];

const sortDirections: { label: string; value: SortDirection }[] = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" }
];

export function FiltersPanel({ filters, availableCategories, onChange, onReset }: FiltersPanelProps) {
  const selectedCategories = useMemo(() => new Set(filters.categories ?? []), [filters.categories]);
  const selectedStatuses = useMemo(() => new Set(filters.statuses ?? []), [filters.statuses]);

  const toggleValue = (value: string, values: Set<string>) => {
    const updated = new Set(values);
    if (updated.has(value)) {
      updated.delete(value);
    } else {
      updated.add(value);
    }
    return Array.from(updated);
  };

  const update = (patch: Partial<FiltersState>) => {
    onChange({
      ...filters,
      ...patch
    });
  };

  return (
    <aside className="flex flex-col gap-6 rounded-2xl border border-emerald-400/30 bg-[#040b18]/80 p-6 font-mono text-[13px] text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
      <div className="space-y-2">
        <label htmlFor="search" className="block text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">
          Search markets
        </label>
        <div className="relative">
          <input
            id="search"
            type="search"
            placeholder="Search by question, tag, category..."
            className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-4 py-2.5 text-sm text-emerald-100 placeholder:text-emerald-200/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            value={filters.search ?? ""}
            onChange={(event) => update({ search: event.target.value })}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-200/40">⌕</span>
        </div>
      </div>

      <section className="space-y-3">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Categories</header>
        <div className="flex flex-wrap gap-2">
          {availableCategories.map((category) => {
            const active = selectedCategories.has(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  update({
                    categories: toggleValue(category, selectedCategories)
                  })
                }
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide transition ${
                  active
                    ? "border-emerald-400/80 bg-emerald-400/10 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "border-emerald-400/20 bg-black/30 text-emerald-200/60 hover:border-emerald-400/40 hover:text-emerald-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Status</header>
        <div className="flex flex-wrap gap-2">
          {["open", "resolved", "upcoming"].map((status) => {
            const active = selectedStatuses.has(status);
            return (
              <button
                key={status}
                type="button"
                onClick={() =>
                  update({
                    statuses: toggleValue(status, selectedStatuses)
                  })
                }
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold capitalize tracking-wide transition ${
                  active
                    ? "border-emerald-400/80 bg-emerald-400/10 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "border-emerald-400/20 bg-black/30 text-emerald-200/60 hover:border-emerald-400/40 hover:text-emerald-200"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Liquidity &amp; Volume</header>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Min Liquidity ($)</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.minLiquidity)}
              onChange={(event) =>
                update({
                  minLiquidity: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Max Liquidity ($)</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.maxLiquidity)}
              onChange={(event) =>
                update({
                  maxLiquidity: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Min 24h Volume ($)</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.minVolume24h)}
              onChange={(event) =>
                update({
                  minVolume24h: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Max 24h Volume ($)</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.maxVolume24h)}
              onChange={(event) =>
                update({
                  maxVolume24h: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Liquidity Incentive Band</header>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Min ($)</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.minLiquidityBand)}
              onChange={(event) =>
                update({
                  minLiquidityBand: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Max ($)</span>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.maxLiquidityBand)}
              onChange={(event) =>
                update({
                  maxLiquidityBand: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Reward &amp; Probability</header>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Min Reward %</span>
            <input
              type="number"
              min={0}
              step={0.1}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.minRewardRate)}
              onChange={(event) =>
                update({
                  minRewardRate: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Max Reward %</span>
            <input
              type="number"
              min={0}
              step={0.1}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.maxRewardRate)}
              onChange={(event) =>
                update({
                  maxRewardRate: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Min Probability (0-1)</span>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.minProbability)}
              onChange={(event) =>
                update({
                  minProbability: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Max Probability (0-1)</span>
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={numberOrEmpty(filters.maxProbability)}
              onChange={(event) =>
                update({
                  maxProbability: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Event Window</header>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">From</span>
            <input
              type="date"
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={filters.endDateFrom ?? ""}
              onChange={(event) => update({ endDateFrom: event.target.value || undefined })}
            />
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">To</span>
            <input
              type="date"
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={filters.endDateTo ?? ""}
              onChange={(event) => update({ endDateTo: event.target.value || undefined })}
            />
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <header className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/70">Sorting</header>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Sort by</span>
            <select
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={filters.sortBy ?? "liquidity"}
              onChange={(event) => update({ sortBy: event.target.value as SortKey })}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#040b18] text-emerald-100">
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-emerald-300/60">Direction</span>
            <select
              className="w-full rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none focus:ring-emerald-400/30"
              value={filters.sortDir ?? "desc"}
              onChange={(event) => update({ sortDir: event.target.value as SortDirection })}
            >
              {sortDirections.map((direction) => (
                <option key={direction.value} value={direction.value} className="bg-[#040b18] text-emerald-100">
                  {direction.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <button
        type="button"
        className="rounded-lg border border-emerald-400/40 bg-black/40 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-emerald-200/80 transition hover:border-emerald-300 hover:text-emerald-100"
        onClick={onReset}
      >
        Reset filters
      </button>
    </aside>
  );
}
