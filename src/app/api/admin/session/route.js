import { NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  ensureAdminApi,
  getAdminConfigError,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const configError = getAdminConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  let credentials;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "A JSON username and password are required." }, { status: 400 });
  }

  if (!validateAdminCredentials(credentials?.username, credentials?.password)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  setAdminSessionCookie(response);
  return response;
}

export async function DELETE(request) {
  const session = await ensureAdminApi(request);
  if (!session) {
    return NextResponse.json({ error: "Authentication or CSRF validation failed." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  clearAdminSessionCookie(response);
  return response;
}
