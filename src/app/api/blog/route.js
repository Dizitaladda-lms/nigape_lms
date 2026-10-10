import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { normalizeTags } from "@/lib/tags";
import { ensureAdminApi } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";
import { getBlogListing, invalidateBlogListingCache } from "@/lib/blogs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 18;
    const search = searchParams.get("search") || "";
    const tag = searchParams.get("tag") || "";
    const relatedTo = searchParams.get("relatedTo") || "";
    const excludeId = searchParams.get("excludeId") || "";
    const excludeSlug = searchParams.get("excludeSlug") || "";

    const result = await getBlogListing({
      page,
      limit,
      search,
      tag,
      relatedTo,
      excludeId,
      excludeSlug,
      publishedOnly: true,
      useCache: true,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/blog failed", error);
    return NextResponse.json({ error: "Unable to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();
    const { title, content, coverImg, tags, slug, excerpt, author, metaTitle, metaDescription, schemaJsonLd, published } = payload;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const finalSlug = await generateUniqueSlug(slug || title);
    const preparedTags = normalizeTags(tags);
    const safeExcerpt =
      excerpt?.trim() ||
      (content
        ? content
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160) + "..."
        : null);

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        content,
        coverImg: coverImg?.trim() || null,
        tags: preparedTags,
        slug: finalSlug,
        excerpt: safeExcerpt,
        author: author?.trim() || null,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        schemaJsonLd: schemaJsonLd?.trim() || null,
        published: published !== false,
      },
    });

    invalidateBlogListingCache();

    const ip = await getClientIp(request);
    await recordAudit("blog.create", {
      actor: session.sub,
      entity: "Blog",
      entityId: blog.id,
      ip,
      metadata: { title: blog.title, slug: blog.slug },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST /api/blog failed", error);
    return NextResponse.json({ error: "Unable to create blog" }, { status: 500 });
  }
}
