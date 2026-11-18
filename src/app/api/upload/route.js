import { NextResponse } from "next/server";
import { ensureAdminApi } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 32 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request) {
  const session = await ensureAdminApi(request);
  if (!session) {
    return NextResponse.json({ error: "Authentication or CSRF validation failed." }, { status: 401 });
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Image upload is not configured." }, { status: 503 });
  }

  let file;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "A valid multipart image upload is required." }, { status: 400 });
  }

  if (!(file instanceof File) || !ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, and WebP images are allowed." }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Image size must be 32 MB or less." }, { status: 413 });
  }

  try {
    const body = new FormData();
    body.append("image", file, file.name);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", body }
    );
    const result = await response.json();
    if (!response.ok || !result?.success || !result?.data?.url) {
      console.error("ImgBB upload failed:", result?.error || response.status);
      return NextResponse.json({ error: "Image upload failed." }, { status: 502 });
    }
    return NextResponse.json({ url: result.data.url });
  } catch (error) {
    console.error("POST /api/upload failed:", error);
    return NextResponse.json({ error: "Image upload service is unavailable." }, { status: 502 });
  }
}
