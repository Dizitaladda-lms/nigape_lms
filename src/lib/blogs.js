import prisma from "@/lib/prisma";

export const BLOG_CARD_SELECT = {
  id: true,
  title: true,
  slug: true,
  coverImg: true,
  tags: true,
  author: true,
  excerpt: true,
  createdAt: true,
  updatedAt: true,
  published: true,
};

// In-memory cache for ultra-fast listing response
const cacheStore = new Map();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function getCacheKey(params) {
  return JSON.stringify(params);
}

export function invalidateBlogListingCache() {
  cacheStore.clear();
}

/**
 * Fetch blog listing with selective column queries (omitting heavy `content` field)
 * and in-memory caching for sub-10ms response times.
 */
export async function getBlogListing({
  page = 1,
  limit = 18,
  search = "",
  tag = "",
  relatedTo = "",
  excludeId = "",
  excludeSlug = "",
  publishedOnly = true,
  useCache = true,
} = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 18, 1), 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;
  const cleanSearch = (search || "").trim();
  const cleanTag = (tag || "").trim();

  const cacheKey = getCacheKey({
    safePage,
    safeLimit,
    cleanSearch,
    cleanTag,
    relatedTo,
    excludeId,
    excludeSlug,
    publishedOnly,
  });

  if (useCache) {
    const cached = cacheStore.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  const filters = [];
  const excludedIds = [];

  if (cleanSearch) {
    filters.push({
      OR: [
        { title: { contains: cleanSearch, mode: "insensitive" } },
        { excerpt: { contains: cleanSearch, mode: "insensitive" } },
        { tags: { has: cleanSearch.toLowerCase() } },
      ],
    });
  }

  if (cleanTag) {
    filters.push({ tags: { has: cleanTag.toLowerCase() } });
  }

  if (excludeId) {
    excludedIds.push(excludeId);
  }

  if (excludeSlug) {
    const ref = await prisma.blog.findUnique({
      where: { slug: excludeSlug },
      select: { id: true },
    });
    if (ref) excludedIds.push(ref.id);
  }

  if (relatedTo) {
    const reference = await prisma.blog.findUnique({
      where: { slug: relatedTo },
      select: { id: true, tags: true },
    });

    if (reference) {
      excludedIds.push(reference.id);
      if (reference.tags?.length) {
        filters.push({ tags: { hasSome: reference.tags } });
      }
    }
  }

  if (excludedIds.length) {
    filters.push({ id: { notIn: excludedIds } });
  }

  if (publishedOnly) {
    filters.push({ published: true });
  }

  const where = filters.length ? { AND: filters } : undefined;

  const [items, count] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: safeLimit,
      select: BLOG_CARD_SELECT,
    }),
    prisma.blog.count({ where }),
  ]);

  const result = {
    data: items,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total: count,
      totalPages: Math.max(1, Math.ceil(count / safeLimit)),
    },
  };

  if (useCache) {
    cacheStore.set(cacheKey, { timestamp: Date.now(), data: result });
  }

  return result;
}

/**
 * Get distinct tags with top post counts across published blogs
 */
export async function getTopDiscoveredTags(limit = 10) {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { tags: true },
      take: 100,
    });
    const counts = {};
    for (const b of blogs) {
      for (const t of b.tags || []) {
        if (!t) continue;
        const normalized = t.toLowerCase();
        counts[normalized] = (counts[normalized] || 0) + 1;
      }
    }
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, limit);
  } catch (error) {
    console.error("Failed to get top tags:", error);
    return [];
  }
}
