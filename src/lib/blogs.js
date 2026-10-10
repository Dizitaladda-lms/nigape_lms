import { cache } from "react";
import prisma from "@/lib/prisma";

const DEFAULT_LIMIT = 18;
const MAX_LIMIT = 50;

export const getBlogBySlug = cache(async (slug) => {
  try {
    return await prisma.blog.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Error fetching blog by slug:", error.message || error);
    return null;
  }
});

export async function getBlogListing(searchParams) {
  const page = Math.max(1, Math.floor(Number(searchParams.get("page")) || 1));
  const limitParam = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
  const limit = Math.min(Math.max(limitParam, 1), MAX_LIMIT);
  const search = searchParams.get("search")?.trim();
  const tag = searchParams.get("tag")?.trim();
  const relatedTo = searchParams.get("relatedTo")?.trim();
  const excludeId = searchParams.get("excludeId")?.trim();
  const excludeSlug = searchParams.get("excludeSlug")?.trim();

  try {
    const filters = [];
    const excludedIds = [];

    if (search) {
      filters.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
          { tags: { has: search.toLowerCase() } },
        ],
      });
    }

    if (tag) {
      filters.push({ tags: { has: tag.toLowerCase() } });
    }

    if (excludeId) {
      excludedIds.push(excludeId);
    }

    const [excludedBlog, relatedBlog] = await Promise.all([
      excludeSlug
        ? prisma.blog.findUnique({
            where: { slug: excludeSlug },
            select: { id: true },
          })
        : null,
      relatedTo
        ? prisma.blog.findUnique({
            where: { slug: relatedTo },
            select: { id: true, tags: true },
          })
        : null,
    ]);

    if (excludedBlog) {
      excludedIds.push(excludedBlog.id);
    }

    if (relatedBlog) {
      excludedIds.push(relatedBlog.id);
      if (relatedBlog.tags.length) {
        filters.push({ tags: { hasSome: relatedBlog.tags } });
      }
    }

    if (excludedIds.length) {
      filters.push({ id: { notIn: excludedIds } });
    }

    filters.push({ published: true });
    const where = { AND: filters };
    const skip = (page - 1) * limit;

    const [items, count] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.max(1, Math.ceil(count / limit)),
      },
    };
  } catch (error) {
    console.error("Database connection error in getBlogListing:", error.message || error);
    return {
      data: [],
      pagination: {
        page: 1,
        limit,
        total: 0,
        totalPages: 1,
      },
      error: "Database unavailable",
    };
  }
}

export async function getRelatedBlogs(slug) {
  try {
    const blog = await getBlogBySlug(slug);
    if (!blog) {
      return [];
    }

    const where = {
      published: true,
      id: { not: blog.id },
      ...(blog.tags.length ? { tags: { hasSome: blog.tags } } : {}),
    };
    const relatedBlogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    if (relatedBlogs.length) {
      return relatedBlogs;
    }

    return await prisma.blog.findMany({
      where: { published: true, id: { not: blog.id } },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Error in getRelatedBlogs:", error.message || error);
    return [];
  }
}

export async function getBlogSidebarData() {
  try {
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

    return {
      latestPosts,
      categories: Array.from(new Set(publishedPosts.flatMap((post) => post.tags))).slice(0, 12),
    };
  } catch (error) {
    console.error("Error in getBlogSidebarData:", error.message || error);
    return {
      latestPosts: [],
      categories: [],
    };
  }
}
