import { NextResponse } from "next/server";
import { getBlogListing } from "@/lib/blogs";

export const dynamic = "force-dynamic";

function parsePositiveInteger(value, defaultValue, maxValue = Number.MAX_SAFE_INTEGER) {
  if (value === null) return defaultValue;
  if (!/^[1-9]\d*$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed <= maxValue ? parsed : null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parsePositiveInteger(searchParams.get("limit"), 18, 50);
  const page = parsePositiveInteger(searchParams.get("page"), 1);

  if (limit === null || page === null || !Number.isSafeInteger((page - 1) * limit)) {
    return NextResponse.json(
      { error: "page must be a positive integer and limit must be between 1 and 50." },
      { status: 400 }
    );
  }

  try {
    const listing = await getBlogListing({
      page,
      limit,
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || searchParams.get("tag") || "",
      useCache: true,
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("GET /api/blog failed:", error);
    return NextResponse.json(
      { error: "Blog service is temporarily unavailable." },
      { status: 503 }
    );
  }
}
