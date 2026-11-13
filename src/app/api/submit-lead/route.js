import { NextResponse } from "next/server";

function normalizeUrl(rawUrl) {
  if (!rawUrl) return "";
  return rawUrl.trim().replace(/^['\"]|['\"]$/g, "");
}

const DEFAULT_SITE_URL = "https://www.nigape.com";

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

    const asText = (value) => (typeof value === "string" ? value.trim() : "");
    const name = asText(parsed.name);
    const email = asText(parsed.email);
    const phone = asText(parsed.phone || parsed.mobile);
    const course = asText(parsed.course || parsed.subject);
    const city = asText(parsed.city);
    const message = asText(parsed.message);

    // The source is controlled by the server, regardless of frontend input.
    const leadPayload = {
      ...parsed,
      name,
      email,
      phone,
      course,
      city,
      message,
      source: process.env.SITE_SOURCE || "nigape.com",
      domain: "nigape",
      submittedAt: parsed.submittedAt || new Date().toISOString(),
    };

    // Submit leads to the CRM endpoint configured on the server.
    const crmEndpoint = normalizeUrl(process.env.CRM_API_URL);

    if (!crmEndpoint) {
      console.error("CRM_API_URL is undefined; lead was not sent.");
      return NextResponse.json(
        {
          ok: false,
          error: "Lead could not be sent because CRM is not configured. Please try again later.",
        },
        { status: 503 }
      );
    }

    const configuredSiteUrl = normalizeUrl(process.env.SITE_URL);
    const siteUrl = new URL(
      process.env.NODE_ENV === "development"
        ? configuredSiteUrl || "http://localhost:3000"
        : configuredSiteUrl || DEFAULT_SITE_URL
    );
    const origin = siteUrl.origin;
    const referer = `${origin}/`;

    try {
      const res = await fetch(crmEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": origin,
          "Referer": referer,
        },
        body: JSON.stringify(leadPayload),
      });

      const responseBody = await res.text();

      if (!res.ok) {
        console.error("CRM submission failed:", { status: res.status, body: responseBody });
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
