"use client";

import { useState } from "react";
import { Download, FileText, Code } from "lucide-react";

export default function ExportBlogsButton() {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchBlogs = async () => {
    const res = await fetch("/api/admin/export-blogs");
    if (!res.ok) {
      throw new Error("Failed to fetch blogs for export");
    }
    const json = await res.json();
    return json.data || [];
  };

  const exportAsDoc = async () => {
    setLoading(true);
    setMenuOpen(false);
    try {
      const blogs = await fetchBlogs();
      if (!blogs.length) {
        alert("No blogs available to export.");
        return;
      }

      // Build formatted HTML document compatible with Microsoft Word & Google Docs
      let docContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>NIGAPE Blogs Export</title>
  <style>
    body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; color: #111; padding: 20px; }
    h1 { font-size: 26pt; color: #1a1a2e; margin-bottom: 8px; border-bottom: 2px solid #9234eb; padding-bottom: 6px; }
    h2 { font-size: 18pt; color: #333; margin-top: 18px; }
    h3 { font-size: 14pt; color: #555; }
    p { font-size: 11pt; margin-bottom: 12px; }
    .meta-box { background-color: #f7f4fc; border-left: 4px solid #9234eb; padding: 10px 14px; margin-bottom: 20px; font-size: 10pt; color: #444; }
    .meta-box strong { color: #111; }
    .excerpt { font-style: italic; color: #555; margin-bottom: 16px; }
    img { max-width: 100%; height: auto; border-radius: 6px; }
    .page-break { page-break-after: always; margin-top: 40px; border-bottom: 1px dashed #ccc; padding-bottom: 30px; }
  </style>
</head>
<body>
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="border: none; color: #9234eb;">NIGAPE - All Blogs Archive</h1>
    <p>Export Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })} | Total Articles: ${blogs.length}</p>
  </div>
`;

      blogs.forEach((blog, index) => {
        const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' });
        const tags = Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || 'N/A');

        docContent += `
  <article class="page-break">
    <h1>${index + 1}. ${blog.title || 'Untitled Post'}</h1>
    <div class="meta-box">
      <p><strong>Slug:</strong> /blog/${blog.slug || ''} | <strong>Status:</strong> ${blog.published ? 'Published' : 'Draft'}</p>
      <p><strong>Published Date:</strong> ${formattedDate} | <strong>Author:</strong> ${blog.author || 'Editorial Team'}</p>
      <p><strong>Tags:</strong> ${tags}</p>
    </div>
    ${blog.excerpt ? `<p class="excerpt"><strong>Excerpt:</strong> ${blog.excerpt}</p>` : ''}
    ${blog.coverImg ? `<p><img src="${blog.coverImg}" alt="${blog.title}" width="600" /></p>` : ''}
    <div class="content">
      ${blog.content || '<p>No content available.</p>'}
    </div>
  </article>
`;
      });

      docContent += `
</body>
</html>
`;

      // Download file with .doc extension
      const blob = new Blob([docContent], { type: "application/msword;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nigape-blogs-export-${new Date().toISOString().split("T")[0]}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Export failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportAsJson = async () => {
    setLoading(true);
    setMenuOpen(false);
    try {
      const blogs = await fetchBlogs();
      if (!blogs.length) {
        alert("No blogs available to export.");
        return;
      }

      const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blogs, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", jsonString);
      downloadAnchor.setAttribute("download", `nigape-blogs-backup-${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert("Export failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={() => setMenuOpen((prev) => !prev)}
        disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: "6px" }}
      >
        <Download size={16} aria-hidden="true" />
        <span>{loading ? "Exporting..." : "Export Blogs"}</span>
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 6px)",
            backgroundColor: "#161824",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            padding: "6px",
            zIndex: 50,
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <button
            type="button"
            onClick={exportAsDoc}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "13px",
              textAlign: "left",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <FileText size={16} color="#FF40EB" />
            <span>Export as Docs (.doc)</span>
          </button>

          <button
            type="button"
            onClick={exportAsJson}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "13px",
              textAlign: "left",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Code size={16} color="#9234eb" />
            <span>Export as JSON Backup</span>
          </button>
        </div>
      )}
    </div>
  );
}
