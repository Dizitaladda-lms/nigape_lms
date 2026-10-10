"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { generateBlogDocHtml, buildFullDocDocument, downloadDocFile } from "@/lib/export-doc";

export default function ExportSingleBlogButton({ blog }) {
  const [downloading, setDownloading] = useState(false);

  const handleExport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setDownloading(true);
      const innerHtml = generateBlogDocHtml(blog);
      const fullDoc = buildFullDocDocument(blog.title || "Blog Post", innerHtml);
      const safeSlug = (blog.slug || "blog-post").replace(/[^a-z0-9_-]/gi, "-");
      downloadDocFile(`${safeSlug}.doc`, fullDoc);
    } catch (err) {
      console.error("Export single blog failed:", err);
      alert("Failed to export blog: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={downloading}
      title="Export as Document (.doc) to publish on another website"
      className="btn btn--ghost admin-btn--sm"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        color: "#c084fc",
        borderColor: "rgba(192, 132, 252, 0.3)",
      }}
    >
      {downloading ? (
        <Loader2 size={13} className="animate-spin" />
      ) : (
        <FileDown size={13} />
      )}
      <span>Export .doc</span>
    </button>
  );
}
