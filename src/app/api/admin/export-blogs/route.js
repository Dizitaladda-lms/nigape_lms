import { NextResponse } from "next/server";
import { ensureAdminApi } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = await ensureAdminApi(request);
  if (!session) {
    return NextResponse.json({ error: "Authentication or CSRF validation failed." }, { status: 401 });
  }

  try {
    const data = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/admin/export-blogs failed:", error);
    return NextResponse.json({ error: "Unable to export blog posts." }, { status: 503 });
  }
}
