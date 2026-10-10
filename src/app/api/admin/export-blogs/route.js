import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApi } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await ensureAdminApi(request, { requireCsrf: false });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (blogId) {
      const blog = await prisma.blog.findUnique({
        where: { id: blogId },
      });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: blog,
      });
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Export blogs failed:", error);
    return NextResponse.json(
      { error: "Failed to export blogs", message: error.message },
      { status: 500 }
    );
  }
}
