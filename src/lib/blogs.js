import prisma from "@/lib/prisma";
import { OFFICIAL_CATEGORIES } from "@/lib/blog-categories";

export { OFFICIAL_CATEGORIES } from "@/lib/blog-categories";

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
  category = "",
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
  const rawTag = (tag || category || "").trim();
  const cleanTag = rawTag;

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
    const lowerTag = cleanTag.toLowerCase();
    const tagConditions = [
      { tags: { has: cleanTag } },
      { tags: { has: lowerTag } },
      { tags: { has: cleanTag.toUpperCase() } },
    ];

    if (lowerTag === "gen ai" || lowerTag === "generative ai") {
      tagConditions.push(
        { tags: { has: "generative ai" } },
        { title: { contains: "Generative AI", mode: "insensitive" } },
        { title: { contains: "Gen AI", mode: "insensitive" } },
        { excerpt: { contains: "Generative AI", mode: "insensitive" } }
      );
    } else if (lowerTag === "prompt engineering") {
      tagConditions.push(
        { tags: { has: "prompt engineering" } },
        { title: { contains: "Prompt Engineering", mode: "insensitive" } },
        { excerpt: { contains: "Prompt Engineering", mode: "insensitive" } }
      );
    } else if (lowerTag === "machine learning") {
      tagConditions.push(
        { tags: { has: "machine learning" } },
        { tags: { has: "ml" } },
        { title: { contains: "Machine Learning", mode: "insensitive" } },
        { excerpt: { contains: "Machine Learning", mode: "insensitive" } }
      );
    } else if (lowerTag.includes("career") || lowerTag.includes("course")) {
      tagConditions.push(
        { tags: { has: "career and course" } },
        { title: { contains: "Course", mode: "insensitive" } },
        { title: { contains: "Career", mode: "insensitive" } },
        { title: { contains: "Placement", mode: "insensitive" } }
      );
    } else if (lowerTag.includes("tools") || lowerTag.includes("resources")) {
      tagConditions.push(
        { tags: { has: "tools and resources" } },
        { title: { contains: "Tools", mode: "insensitive" } },
        { title: { contains: "Resources", mode: "insensitive" } }
      );
    } else if (lowerTag.includes("brand")) {
      tagConditions.push(
        { tags: { has: "brand strategy" } },
        { title: { contains: "Brand", mode: "insensitive" } }
      );
    } else if (lowerTag.includes("news")) {
      tagConditions.push(
        { tags: { has: "latest news" } },
        { title: { contains: "News", mode: "insensitive" } },
        { title: { contains: "Update", mode: "insensitive" } },
        { title: { contains: "2026", mode: "insensitive" } }
      );
    } else {
      tagConditions.push(
        { title: { contains: cleanTag, mode: "insensitive" } },
        { excerpt: { contains: cleanTag, mode: "insensitive" } }
      );
    }

    filters.push({ OR: tagConditions });
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
}

export async function getBlogBySlug(slug) {
  if (!slug) return null;
  const normalizedSlug = slug.trim();

  return prisma.blog.findFirst({
    where: {
      published: true,
      OR: [
        { slug: normalizedSlug },
        { slug: normalizedSlug.toLowerCase() },
      ],
    },
  });
}

export async function getBlogSidebarData() {
  const [latestPosts, publishedPosts] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        slug: true,
        title: true,
        coverImg: true,
        tags: true,
        createdAt: true,
      },
    }),
    prisma.blog.findMany({
      where: { published: true },
      select: { tags: true },
    }),
  ]);

  const categories = Array.from(
    new Set([
      ...OFFICIAL_CATEGORIES,
      ...publishedPosts.flatMap((post) => post.tags || []),
    ])
  ).slice(0, 12);

  return {
    latestPosts,
    categories,
  };
}
