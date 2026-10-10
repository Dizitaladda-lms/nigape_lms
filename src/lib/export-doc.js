/**
 * Helper to build Word/Google Docs compatible HTML document (.doc)
 * Preserves full typography, SEO fields, tables, lists, and images.
 */
export function generateBlogDocHtml(blog) {
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })
    : "N/A";
  const tags = Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags || "N/A");
  const coverImg = blog.coverImg?.trim() || "";

  return `
  <article style="margin-bottom: 40px;">
    <h1 style="font-size: 24pt; font-weight: bold; color: #111827; margin: 0 0 12px 0; line-height: 1.25;">
      ${blog.title || "Untitled Post"}
    </h1>

    <table class="post-meta-table" style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
      <tbody>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Post Title</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${blog.title || "N/A"}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">URL Slug / Permalink</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">/blog/${blog.slug || ""}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Published Date</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${formattedDate}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Author</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${blog.author || "Editorial Team"}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Status</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${blog.published ? "Published" : "Draft"}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Meta SEO Title</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${blog.metaTitle || blog.title || "N/A"}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Meta SEO Description</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${blog.metaDescription || blog.excerpt || "N/A"}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Excerpt / Summary</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${blog.excerpt || "N/A"}</td>
        </tr>
        <tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Tags / Categories</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${tags}</td>
        </tr>
        ${
          coverImg
            ? `<tr>
          <td class="label" style="font-weight: bold; width: 160px; background-color: #f3f4f6; color: #374151; padding: 8px 12px; border: 1px solid #e5e7eb;">Cover Image URL</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;"><a href="${coverImg}" target="_blank">${coverImg}</a></td>
        </tr>`
            : ""
        }
      </tbody>
    </table>

    ${
      coverImg
        ? `<div style="text-align: center; margin-bottom: 24px;">
      <p style="font-weight: bold; color: #6b7280; font-size: 10pt; margin-bottom: 6px;">[Featured / Cover Image]</p>
      <img src="${coverImg}" alt="${blog.title || "Cover"}" style="max-width: 650px; height: auto; border: 1px solid #e5e7eb; border-radius: 6px;" />
    </div>`
        : ""
    }

    <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
      <h2 style="font-size: 14pt; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">
        Post Content
      </h2>
      <div class="content-body" style="font-size: 11.5pt; line-height: 1.7; color: #1f2937;">
        ${blog.content || "<p>No content available.</p>"}
      </div>
    </div>
  </article>
`;
}

export function buildFullDocDocument(title, innerHtml) {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', 'Segoe UI', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 850px;
      margin: 0 auto;
      padding: 30px;
      background: #ffffff;
    }
    h1 { font-size: 24pt; font-weight: bold; color: #111827; margin: 0 0 12px 0; }
    h2 { font-size: 18pt; font-weight: bold; color: #1f2937; margin: 24px 0 10px 0; }
    h3 { font-size: 14pt; font-weight: bold; color: #374151; margin: 18px 0 8px 0; }
    h4 { font-size: 12pt; font-weight: bold; color: #4b5563; margin: 14px 0 6px 0; }
    p { margin: 0 0 12px 0; }
    ul, ol { margin: 0 0 16px 24px; padding: 0; }
    li { margin-bottom: 6px; }
    blockquote {
      border-left: 4px solid #9234eb;
      background-color: #faf5ff;
      padding: 10px 16px;
      margin: 16px 0;
      color: #4b5563;
      font-style: italic;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 8px 12px;
      vertical-align: top;
      text-align: left;
    }
    th {
      background-color: #f3f4f6;
      font-weight: bold;
    }
    pre {
      background-color: #1f2937;
      color: #f9fafb;
      padding: 12px;
      border-radius: 6px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 10pt;
      overflow-x: auto;
    }
    code {
      background-color: #f3f4f6;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: 'Consolas', monospace;
      font-size: 10pt;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    .page-break {
      page-break-after: always;
      margin: 40px 0;
      padding-bottom: 30px;
      border-bottom: 2px dashed #9234eb;
    }
  </style>
</head>
<body>
  ${innerHtml}
</body>
</html>`;
}

export function downloadDocFile(filename, htmlContent) {
  const blob = new Blob([htmlContent], { type: "application/msword;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
