import { markets } from "@/data/markets";
import { filterMarkets, parseFilters } from "@/lib/filter";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = parseFilters(url.searchParams);
  const filtered = filterMarkets(markets, filters);

  return NextResponse.json({
    total: filtered.length,
    results: filtered
  });
}
