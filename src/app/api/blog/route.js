import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { normalizeTags } from "@/lib/tags";
import { ensureAdminApi } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";
import { getBlogListing } from "@/lib/blogs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    return NextResponse.json(await getBlogListing(searchParams));
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
    const {
      title,
      content,
      coverImg,
      tags,
      slug,
      excerpt,
      author,
      authorImage,
      authorDescription,
      metaTitle,
      metaDescription,
      schemaJsonLd,
      published,
    } = payload;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const finalSlug = await generateUniqueSlug(slug || title);
    const preparedTags = normalizeTags(tags);

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        content,
        coverImg: coverImg?.trim() || null,
        tags: preparedTags,
        slug: finalSlug,
        excerpt: excerpt?.trim() || null,
        author: author?.trim() || null,
        authorImage: authorImage?.trim() || null,
        authorDescription: authorDescription?.trim() || null,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        schemaJsonLd: schemaJsonLd?.trim() || null,
        published: published !== false,
      },
    });

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
