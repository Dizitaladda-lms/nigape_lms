import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApi } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slugify";
import { normalizeTags } from "@/lib/tags";
import { invalidateBlogListingCache } from "@/lib/blogs";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

export async function POST(request) {
  try {
    const session = await ensureAdminApi(request, { requireCsrf: false });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { blogs, updateExisting = true } = body;

    if (!Array.isArray(blogs) || blogs.length === 0) {
      return NextResponse.json(
        { error: "No blog data provided to import." },
        { status: 400 }
      );
    }

    let createdCount = 0;
    let updatedCount = 0;
    let errors = [];

    for (let i = 0; i < blogs.length; i++) {
      const b = blogs[i];
      const rawTitle = b.title?.trim();
      const rawContent = b.content?.trim();

      if (!rawTitle) {
        errors.push(`Row ${i + 1}: Skipped due to missing title.`);
        continue;
      }

      // Generate or clean slug
      let cleanSlug = (b.slug || "").trim().toLowerCase();
      cleanSlug = cleanSlug.replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

      if (!cleanSlug) {
        cleanSlug = await generateUniqueSlug(rawTitle);
      }

      // Excerpt extraction if not provided
      const finalExcerpt =
        b.excerpt?.trim() ||
        (rawContent
          ? rawContent
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 160) + "..."
          : null);

      const preparedTags = normalizeTags(b.tags);
      const isPublished = b.published !== false;

      try {
        // Check if blog with this slug already exists in database
        const existing = await prisma.blog.findUnique({
          where: { slug: cleanSlug },
        });

        if (existing) {
          if (updateExisting) {
            await prisma.blog.update({
              where: { id: existing.id },
              data: {
                title: rawTitle,
                content: rawContent || existing.content,
                coverImg: b.coverImg?.trim() || existing.coverImg,
                tags: preparedTags.length ? preparedTags : existing.tags,
                excerpt: finalExcerpt || existing.excerpt,
                author: b.author?.trim() || existing.author || "Editorial Team",
                metaTitle: b.metaTitle?.trim() || existing.metaTitle || rawTitle,
                metaDescription: b.metaDescription?.trim() || existing.metaDescription || finalExcerpt,
                published: isPublished,
              },
            });
            updatedCount++;
          } else {
            // Generate a unique new slug so we don't overwrite
            const uniqueSlug = await generateUniqueSlug(rawTitle);
            await prisma.blog.create({
              data: {
                title: rawTitle,
                slug: uniqueSlug,
                content: rawContent || "<p></p>",
                coverImg: b.coverImg?.trim() || null,
                tags: preparedTags,
                excerpt: finalExcerpt,
                author: b.author?.trim() || "Editorial Team",
                metaTitle: b.metaTitle?.trim() || rawTitle,
                metaDescription: b.metaDescription?.trim() || finalExcerpt,
                published: isPublished,
              },
            });
            createdCount++;
          }
        } else {
          // New blog creation
          await prisma.blog.create({
            data: {
              title: rawTitle,
              slug: cleanSlug,
              content: rawContent || "<p></p>",
              coverImg: b.coverImg?.trim() || null,
              tags: preparedTags,
              excerpt: finalExcerpt,
              author: b.author?.trim() || "Editorial Team",
              metaTitle: b.metaTitle?.trim() || rawTitle,
              metaDescription: b.metaDescription?.trim() || finalExcerpt,
              published: isPublished,
            },
          });
          createdCount++;
        }
      } catch (err) {
        console.error(`Error saving blog #${i + 1} (${rawTitle}):`, err);
        errors.push(`Row ${i + 1} (${rawTitle}): ${err.message}`);
      }
    }

    // Invalidate blog listing cache so all newly imported posts appear immediately
    invalidateBlogListingCache();

    const ip = await getClientIp(request);
    await recordAudit("blog.bulk_import", {
      actor: session.sub,
      entity: "Blog",
      entityId: "bulk",
      ip,
      metadata: {
        total: blogs.length,
        created: createdCount,
        updated: updatedCount,
        errorsCount: errors.length,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${createdCount + updatedCount} blogs in the database!`,
      total: blogs.length,
      createdCount,
      updatedCount,
      errors,
    });
  } catch (error) {
    console.error("POST /api/admin/import-blogs failed:", error);
    return NextResponse.json(
      { error: "Failed to import blogs into database", message: error.message },
      { status: 500 }
    );
  }
}
