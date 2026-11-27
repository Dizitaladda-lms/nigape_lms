import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ensureAdminApi } from "@/lib/auth";
import { makeUniqueBlogSlug, normalizeBlogInput } from "@/lib/admin-blog";
import { invalidateBlogCache } from "@/lib/blogs";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  const session = await ensureAdminApi(request);
  if (!session) {
    return NextResponse.json({ error: "Authentication or CSRF validation failed." }, { status: 401 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "A JSON blog post payload is required." }, { status: 400 });
  }

  const normalized = normalizeBlogInput(input);
  if (normalized.error) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const { id } = await params;
  try {
    const slug = await makeUniqueBlogSlug(normalized.slugInput, id);
    const blog = await prisma.blog.update({
      where: { id },
      data: { ...normalized.data, slug },
    });
    invalidateBlogCache();
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    return NextResponse.json({ data: blog });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }
    console.error("PUT /api/blog/[id] failed:", error);
    return NextResponse.json(
      { error: "Unable to update the blog post right now." },
      { status: 503 }
    );
  }
}

export async function DELETE(request, { params }) {
  const session = await ensureAdminApi(request);
  if (!session) {
    return NextResponse.json({ error: "Authentication or CSRF validation failed." }, { status: 401 });
  }

  const { id } = await params;
  try {
    const deleted = await prisma.blog.delete({
      where: { id },
      select: { slug: true },
    });
    invalidateBlogCache();
    revalidatePath("/blog");
    if (deleted?.slug) {
      revalidatePath(`/blog/${deleted.slug}`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }
    console.error("DELETE /api/blog/[id] failed:", error);
    return NextResponse.json(
      { error: "Unable to delete the blog post right now." },
      { status: 503 }
    );
  }
}
