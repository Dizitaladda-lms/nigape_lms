import { getSitemapData } from "@/lib/sitemap-data";

export const dynamic = "force-dynamic";

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });

export async function GET() {
  const { baseUrl, sections } = await getSitemapData();
  const urls = sections.flatMap((section) =>
    section.links.map((link) => {
      const lastModified = new Date(link.lastModified).toISOString();
      return [
        "  <url>",
        `    <loc>${escapeXml(new URL(link.path, baseUrl).toString())}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        `    <priority>${link.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
  );
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
