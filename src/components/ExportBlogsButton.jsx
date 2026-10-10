"use client";

import { useState } from "react";
import { Download, FileText, Code, Loader2 } from "lucide-react";
import { withAdminCsrf } from "@/lib/client-csrf";
import { generateBlogDocHtml, buildFullDocDocument, downloadDocFile } from "@/lib/export-doc";

export default function ExportBlogsButton() {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchBlogs = async () => {
    const res = await fetch(
      "/api/admin/export-blogs",
      withAdminCsrf({
        credentials: "include",
      })
    );
    if (res.status === 401) {
      throw new Error("Admin session expired. Please refresh the page or login again at /admin/login");
    }
    if (!res.ok) {
      throw new Error("Failed to fetch blogs for export");
    }
    const json = await res.json();
    return json.data || [];
  };

  const exportAllAsDoc = async () => {
    setLoading(true);
    setMenuOpen(false);
    try {
      const blogs = await fetchBlogs();
      if (!blogs.length) {
        alert("No blogs available to export.");
        return;
      }

      let innerHtml = `
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #9234eb; padding-bottom: 20px;">
          <h1 style="color: #9234eb; margin-bottom: 8px;">NIGAPE - All Blog Posts Archive</h1>
          <p style="color: #6b7280; font-size: 11pt;">
            Export Date: ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} | Total Articles: <strong>${blogs.length}</strong>
          </p>
          <p style="color: #9ca3af; font-size: 10pt;">
            Ready for cross-posting to WordPress, Medium, LinkedIn, Ghost, or any CMS.
          </p>
        </div>
      `;

      blogs.forEach((blog, index) => {
        innerHtml += `
          <div class="page-break">
            <p style="font-size: 10pt; color: #9234eb; font-weight: bold; text-transform: uppercase; margin-bottom: 4px;">
              Article #${index + 1} of ${blogs.length}
            </p>
            ${generateBlogDocHtml(blog)}
          </div>
        `;
      });

      const fullDoc = buildFullDocDocument("NIGAPE All Blogs Export", innerHtml);
      const dateStr = new Date().toISOString().split("T")[0];
      downloadDocFile(`nigape-all-blogs-export-${dateStr}.doc`, fullDoc);
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

      const jsonString =
        "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blogs, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", jsonString);
      downloadAnchor.setAttribute(
        "download",
        `nigape-blogs-backup-${new Date().toISOString().split("T")[0]}.json`
      );
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
        style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} aria-hidden="true" />
        )}
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
            minWidth: "220px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <button
            type="button"
            onClick={exportAllAsDoc}
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
            <span>Export All as Docs (.doc)</span>
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
