import { NextResponse } from "next/server";
import { ensureAdminApi } from "@/lib/auth";
import { makeUniqueBlogSlug, normalizeBlogInput } from "@/lib/admin-blog";
import { slugify } from "@/lib/slugify";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const session = await ensureAdminApi(request);
  if (!session) {
    return NextResponse.json({ error: "Authentication or CSRF validation failed." }, { status: 401 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "A JSON import payload is required." }, { status: 400 });
  }

  if (!Array.isArray(input?.blogs)) {
    return NextResponse.json({ error: "blogs must be an array." }, { status: 400 });
  }

  let createdCount = 0;
  let updatedCount = 0;

  try {
    for (const rawBlog of input.blogs) {
      const normalized = normalizeBlogInput(rawBlog);
      if (normalized.error) {
        return NextResponse.json({ error: normalized.error }, { status: 400 });
      }

      const requestedSlug = slugify(normalized.slugInput);
      const existing = await prisma.blog.findUnique({ where: { slug: requestedSlug } });
      if (existing) {
        if (input.updateExisting !== true) continue;
        await prisma.blog.update({
          where: { id: existing.id },
          data: { ...normalized.data, slug: requestedSlug },
        });
        updatedCount += 1;
      } else {
        const slug = await makeUniqueBlogSlug(requestedSlug);
        await prisma.blog.create({ data: { ...normalized.data, slug } });
        createdCount += 1;
      }
    }
  } catch (error) {
    console.error("POST /api/admin/import-blogs failed:", error);
    return NextResponse.json({ error: "Unable to import blog posts." }, { status: 503 });
  }

  return NextResponse.json({
    message: "Blog import completed.",
    createdCount,
    updatedCount,
  });
}
