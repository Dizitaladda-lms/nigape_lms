import { NextResponse } from "next/server";

function normalizeUrl(rawUrl) {
  if (!rawUrl) return "";
  return rawUrl.trim().replace(/^['\"]|['\"]$/g, "");
}

function parseRequestBody(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const params = new URLSearchParams(raw);
    return Object.fromEntries(params.entries());
  }
}

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const parsed = parseRequestBody(rawBody);

    const name = (parsed.name || "").trim();
    const email = (parsed.email || "").trim();
    const phone = (parsed.phone || parsed.mobile || "").trim();
    const course = (parsed.course || parsed.subject || "").trim();
    const city = (parsed.city || "").trim();
    const message = (parsed.message || "").trim();

    // Standardized payload:
    // User requirement: source: "main website", domain: "nigape"
    const leadPayload = {
      ...parsed,
      name,
      email,
      phone,
      course,
      city,
      message,
      source: "main website",
      domain: "nigape",
      submittedAt: parsed.submittedAt || new Date().toISOString(),
    };

    // Submit lead strictly to CRM (fetched from environment variable)
    const crmEndpoint = normalizeUrl(
      process.env.CRM_LEADS_URL || process.env.CRM_ENDPOINT
    );

    if (!crmEndpoint) {
      console.warn("CRM endpoint is not configured (CRM_LEADS_URL / CRM_ENDPOINT).");
      return NextResponse.json({
        ok: true,
        message: "Lead received (CRM endpoint not configured)",
        crm: false,
      });
    }

    try {
      const res = await fetch(crmEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("CRM submission returned non-OK status:", res.status, json);
        return NextResponse.json(
          {
            ok: false,
            error: "Unable to submit lead to CRM. Please try again.",
          },
          { status: res.status >= 500 ? 502 : 400 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Lead captured successfully",
        crm: true,
      });
    } catch (crmErr) {
      console.error("CRM submission error:", crmErr);
      return NextResponse.json(
        {
          ok: false,
          error: "Unable to reach CRM server. Please try again later.",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("POST /api/submit-lead general error:", err);
    return NextResponse.json({ ok: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
