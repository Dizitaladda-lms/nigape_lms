/**
 * Utility to parse Word (.doc / .htm / .html) files or JSON backups
 * and extract blog posts into structured objects ready for database insertion.
 */

export function parseBlogsFromText(fileContent, filename = "") {
  const trimmed = fileContent.trim();

  // 1. Check if file is JSON
  if (trimmed.startsWith("[") || (trimmed.startsWith("{") && trimmed.includes('"data"'))) {
    try {
      const parsed = JSON.parse(trimmed);
      const blogs = Array.isArray(parsed) ? parsed : (parsed.data || []);
      if (Array.isArray(blogs) && blogs.length > 0) {
        return blogs.map((b) => ({
          title: b.title || "Untitled Post",
          slug: b.slug || "",
          content: b.content || "",
          coverImg: b.coverImg || null,
          tags: Array.isArray(b.tags) ? b.tags : [],
          excerpt: b.excerpt || null,
          author: b.author || null,
          metaTitle: b.metaTitle || null,
          metaDescription: b.metaDescription || null,
          published: b.published !== false,
        }));
      }
    } catch {
      // not json, continue to html/doc parsing
    }
  }

  // 2. Parse as HTML (.doc / .htm / .html)
  if (typeof window === "undefined" || !window.DOMParser) {
    throw new Error("DOMParser is required to parse HTML Word documents");
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, "text/html");

  const results = [];

  // Look for articles or page-break dividers
  let items = doc.querySelectorAll(".page-break, article");

  // If no .page-break or article found, check if entire document is a single blog post
  if (!items || items.length === 0) {
    const h1 = doc.querySelector("h1");
    if (h1) {
      const bodyHtml = doc.body ? doc.body.innerHTML : trimmed;
      items = [doc.body || doc];
    }
  }

  items.forEach((el, index) => {
    // 1. Title
    const h1 = el.querySelector("h1");
    let title = h1 ? h1.textContent.trim() : "";
    // Clean any leading numbering like "1. ", "Article #1 of 46: "
    title = title.replace(/^Article\s+#\d+[\s:—–-]+/i, "");
    title = title.replace(/^\d+[\.\)]\s+/, "");

    // 2. Metadata from Table
    const meta = {
      title,
      slug: "",
      author: "",
      published: true,
      metaTitle: "",
      metaDescription: "",
      excerpt: "",
      tags: [],
      coverImg: "",
    };

    const rows = el.querySelectorAll("tr");
    rows.forEach((tr) => {
      const tds = tr.querySelectorAll("td");
      if (tds.length >= 2) {
        const label = tds[0].textContent.trim().toLowerCase();
        const valueText = tds[1].textContent.trim();
        const anchor = tds[1].querySelector("a");

        if (label.includes("post title") || label === "title") {
          if (!meta.title) meta.title = valueText;
        } else if (label.includes("slug") || label.includes("permalink")) {
          meta.slug = valueText.replace(/^\/?blog\//i, "").trim();
        } else if (label.includes("author")) {
          meta.author = valueText;
        } else if (label.includes("status")) {
          meta.published = !valueText.toLowerCase().includes("draft");
        } else if (label.includes("meta seo title") || label.includes("meta title")) {
          meta.metaTitle = valueText;
        } else if (label.includes("meta seo description") || label.includes("meta description")) {
          meta.metaDescription = valueText;
        } else if (label.includes("excerpt") || label.includes("summary")) {
          meta.excerpt = valueText;
        } else if (label.includes("tags") || label.includes("categories")) {
          meta.tags = valueText
            .split(",")
            .map((t) => t.trim().replace(/^#/, ""))
            .filter((t) => t && t.toLowerCase() !== "n/a");
        } else if (label.includes("cover image") || label.includes("cover")) {
          meta.coverImg = anchor ? anchor.getAttribute("href") : valueText;
        }
      }
    });

    // 3. Metadata from .meta-box fallback
    const metaBox = el.querySelector(".meta-box");
    if (metaBox) {
      const mbText = metaBox.textContent;
      const slugM = mbText.match(/Slug:\s*(?:\/blog\/)?([^\s|]+)/i);
      if (slugM && !meta.slug) meta.slug = slugM[1];
      const authorM = mbText.match(/Author:\s*([^|\n]+)/i);
      if (authorM && !meta.author) meta.author = authorM[1].trim();
      const statusM = mbText.match(/Status:\s*([^\s|]+)/i);
      if (statusM) meta.published = !statusM[1].toLowerCase().includes("draft");
      const tagsM = mbText.match(/Tags:\s*([^|\n]+)/i);
      if (tagsM && (!meta.tags || meta.tags.length === 0)) {
        meta.tags = tagsM[1]
          .split(",")
          .map((t) => t.trim().replace(/^#/, ""))
          .filter(Boolean);
      }
    }

    // Excerpt fallback
    const excerptEl = el.querySelector(".excerpt");
    if (excerptEl && !meta.excerpt) {
      meta.excerpt = excerptEl.textContent.replace(/^Excerpt:\s*/i, "").trim();
    }

    // 4. Cover image fallback
    if (!meta.coverImg) {
      const img = el.querySelector("img");
      if (img) {
        meta.coverImg = img.getAttribute("src") || "";
      }
    }

    // 5. Content Body
    const contentEl = el.querySelector(".content-body, .content");
    let contentHtml = "";
    if (contentEl) {
      contentHtml = contentEl.innerHTML.trim();
    } else {
      // Clone element and strip headers and metadata tables
      const clone = el.cloneNode(true);
      clone
        .querySelectorAll(
          "h1, .post-meta-table, table.post-meta-table, .meta-box, .excerpt, p > strong:first-child"
        )
        .forEach((n) => n.remove());
      contentHtml = clone.innerHTML.trim();
    }

    // Validate that we have at least title or content
    if (meta.title || contentHtml) {
      results.push({
        title: meta.title || `Imported Post ${index + 1}`,
        slug: meta.slug || "",
        content: contentHtml || "<p></p>",
        coverImg: meta.coverImg?.startsWith("http") || meta.coverImg?.startsWith("/") ? meta.coverImg : null,
        tags: meta.tags || [],
        excerpt: meta.excerpt || null,
        author: meta.author || "Editorial Team",
        metaTitle: meta.metaTitle || meta.title || null,
        metaDescription: meta.metaDescription || meta.excerpt || null,
        published: meta.published !== false,
      });
    }
  });

  return results;
}
