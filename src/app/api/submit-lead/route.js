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

    const tasks = [];

    // 1. Submit lead to CRM (fetched strictly from environment variable)
    const crmEndpoint = normalizeUrl(
      process.env.CRM_LEADS_URL || process.env.CRM_ENDPOINT
    );

    if (crmEndpoint) {
      const crmPromise = (async () => {
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
          return { ok: res.ok, status: res.status, data: json };
        } catch (err) {
          console.error("CRM submission error:", err);
          return { ok: false, error: err?.message || String(err) };
        }
      })();
      tasks.push(crmPromise);
    }

    // 2. Submit lead to Google Apps Script / Google Form (if configured)
    const appsScriptUrl = normalizeUrl(
      process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
    );

    if (appsScriptUrl) {
      const googlePromise = (async () => {
        try {
          const formBody = new URLSearchParams(leadPayload).toString();
          const res = await fetch(appsScriptUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody,
            redirect: "follow",
          });
          const text = await res.text();
          let json;
          try {
            json = JSON.parse(text);
          } catch {
            json = { ok: res.ok };
          }
          return { ok: res.ok, data: json };
        } catch (err) {
          console.error("Google Apps Script submission error:", err);
          return { ok: false, error: err?.message || String(err) };
        }
      })();
      tasks.push(googlePromise);
    }

    const results = await Promise.allSettled(tasks);
    const crmResult = results[0]?.status === "fulfilled" ? results[0].value : null;
    const googleResult = results[1]?.status === "fulfilled" ? results[1].value : null;

    // Check if at least one submission succeeded
    const isSuccess = Boolean(crmResult?.ok || googleResult?.ok);

    if (!isSuccess && !crmResult?.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: crmResult?.error || "Unable to submit lead at this moment. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Lead captured successfully",
      crm: crmResult?.ok ?? false,
      google: googleResult?.ok ?? (appsScriptUrl ? false : "not_configured"),
    });
  } catch (err) {
    console.error("POST /api/submit-lead general error:", err);
    return NextResponse.json({ ok: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
