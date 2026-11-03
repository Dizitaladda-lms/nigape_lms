import { NextResponse } from "next/server";
import { ensureAdminApi } from "@/lib/auth";
import { getAllSeoEntries, saveSeoEntry, resetSeoEntry, getSeoForPath } from "@/lib/seo";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetPath = searchParams.get("path");

    if (targetPath) {
      const single = await getSeoForPath(targetPath);
      return NextResponse.json({ entry: single });
    }

    const entries = await getAllSeoEntries();
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("GET /api/admin/seo error:", error);
    return NextResponse.json(
      { error: "Failed to load SEO configurations" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip = await getClientIp(request);
    const body = await request.json();

    const { path: targetPath, entityType, entityName, metaTitle, metaDescription, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, noIndex } = body;

    if (!targetPath || typeof targetPath !== "string") {
      return NextResponse.json(
        { error: "Target path is required" },
        { status: 400 }
      );
    }

    const saved = await saveSeoEntry({
      path: targetPath,
      entityType,
      entityName,
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      noIndex,
    });

    await recordAudit("admin.seo.update", {
      actor: session.user || "admin",
      ip,
      entity: "SeoMetadata",
      entityId: targetPath,
      metadata: {
        path: targetPath,
        metaTitle,
        hasCanonical: Boolean(canonicalUrl),
      },
    });

    return NextResponse.json({
      success: true,
      message: `SEO settings saved for ${targetPath}`,
      entry: saved,
    });
  } catch (error) {
    console.error("POST /api/admin/seo error:", error);
    return NextResponse.json(
      { error: "Failed to save SEO settings" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await ensureAdminApi(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip = await getClientIp(request);
    const { searchParams } = new URL(request.url);
    let targetPath = searchParams.get("path");

    if (!targetPath) {
      try {
        const body = await request.json();
        targetPath = body?.path;
      } catch {
        // empty body
      }
    }

    if (!targetPath) {
      return NextResponse.json(
        { error: "Path parameter is required to reset SEO" },
        { status: 400 }
      );
    }

    await resetSeoEntry(targetPath);

    await recordAudit("admin.seo.reset", {
      actor: session.user || "admin",
      ip,
      entity: "SeoMetadata",
      entityId: targetPath,
    });

    return NextResponse.json({
      success: true,
      message: `SEO reset to default for ${targetPath}`,
    });
  } catch (error) {
    console.error("DELETE /api/admin/seo error:", error);
    return NextResponse.json(
      { error: "Failed to reset SEO settings" },
      { status: 500 }
    );
  }
}
