# Polysearch

Polysearch is a Next.js dashboard for exploring Polymarket markets with powerful discovery tooling. It ships with an interactive filter sidebar for liquidity, 24h volume, liquidity incentive band, reward rates, event window, and more. Markets are displayed as rich cards alongside aggregate statistics for any filter combination.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 to explore the dashboard.

## Features

- Advanced filter controls for liquidity, 24h volume, incentive band, reward APY, and probability bands
- Full text search across market questions, categories, and tags
- Sorting by liquidity, volume, reward, or upcoming expiry
- Aggregated statistics block summarizing liquidity, volume, and average rewards for the current result set
- Responsive layout with a frosted glass theme inspired by Polymarket

## Tech stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [Tailwind CSS](https://tailwindcss.com/) for design
- [SWR](https://swr.vercel.app/) for data fetching

## Data

For demo purposes the app ships with a curated market dataset in `data/markets.ts`. The API route at `/api/markets` applies filtering logic server-side so the UI and any future data sources can share the same filtering semantics.
