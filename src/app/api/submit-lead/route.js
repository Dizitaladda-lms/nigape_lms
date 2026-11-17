import { NextResponse } from "next/server";

function normalizeUrl(rawUrl) {
  if (!rawUrl) return "";
  return rawUrl.trim().replace(/^['"]|['"]$/g, "");
}

function parseRequestBody(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return Object.fromEntries(new URLSearchParams(raw).entries());
  }
}

async function postJson(endpoint, payload, headers = {}) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(payload),
    });

    return { ok: response.ok, status: response.status };
  } catch (error) {
    console.error("Lead destination request failed:", error);
    return { ok: false, status: null };
  }
}

async function postToGoogleSheet(endpoint, payload) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams(
        Object.entries(payload).map(([key, value]) => [key, String(value ?? "")])
      ).toString(),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = null;
    }

    return {
      ok: response.ok && responseData?.ok !== false,
      status: response.status,
    };
  } catch (error) {
    console.error("Google Sheets lead submission failed:", error);
    return { ok: false, status: null };
  }
}

export async function POST(request) {
  try {
    const parsed = parseRequestBody(await request.text());
    const asText = (value) => (typeof value === "string" ? value.trim() : "");
    const name = asText(parsed.name);
    const email = asText(parsed.email);
    const phone = asText(parsed.phone || parsed.mobile);
    const course = asText(parsed.course || parsed.subject);
    const city = asText(parsed.city);
    const message = asText(parsed.message);

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

    const crmEndpoint = normalizeUrl(process.env.CRM_API_URL);
    const sheetEndpoint = normalizeUrl(process.env.GOOGLE_APPS_SCRIPT_URL);

    const configuredSiteUrl = normalizeUrl(process.env.SITE_URL);
    const siteUrl = new URL(
      process.env.NODE_ENV === "development"
        ? configuredSiteUrl || "http://localhost:3000"
        : configuredSiteUrl || "https://www.nigape.com"
    );

    const [crm, sheet] = await Promise.all([
      crmEndpoint
        ? postJson(crmEndpoint, leadPayload, {
            Origin: siteUrl.origin,
            Referer: `${siteUrl.origin}/`,
          })
        : Promise.resolve({ ok: false, status: null }),
      sheetEndpoint
        ? postToGoogleSheet(sheetEndpoint, leadPayload)
        : Promise.resolve({ ok: false, status: null }),
    ]);

    if (!crm.ok || !sheet.ok) {
      console.error("Lead delivery incomplete:", {
        crm: { ok: crm.ok, status: crm.status },
        sheet: { ok: sheet.ok, status: sheet.status },
        crmConfigured: Boolean(crmEndpoint),
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to submit your lead to CRM and Google Sheets. Please try again.",
          crm: { ok: crm.ok },
          sheet: { ok: sheet.ok },
        },
        { status: crmEndpoint && sheetEndpoint ? 502 : 503 }
      );
    }

    return NextResponse.json({ ok: true, crm: true, sheet: true });
  } catch (error) {
    console.error("POST /api/submit-lead failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit your lead. Please try again." },
      { status: 500 }
    );
  }
}
