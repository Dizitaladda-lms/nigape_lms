"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { parseBlogsFromText } from "@/lib/import-doc-parser";
import { withAdminCsrf } from "@/lib/client-csrf";

export default function ImportBlogsButton() {
  const fileInputRef = useRef(null);
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parsedBlogs, setParsedBlogs] = useState([]);
  const [fileName, setFileName] = useState("");
  const [updateExisting, setUpdateExisting] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    setFileName(file.name);
    setResultMsg(null);

    try {
      const text = await file.text();
      const blogs = parseBlogsFromText(text, file.name);

      if (!blogs || blogs.length === 0) {
        alert(
          "No blog posts could be detected in this file. Please make sure it is a valid Word (.doc) export or HTML document containing articles."
        );
        return;
      }

      setParsedBlogs(blogs);
      setModalOpen(true);
    } catch (err) {
      console.error("File parse error:", err);
      alert("Failed to parse file: " + err.message);
    } finally {
      setParsing(false);
      // Reset input so user can pick same file again if desired
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImportSubmit = async () => {
    if (!parsedBlogs.length) return;

    setImporting(true);
    setResultMsg(null);

    try {
      const res = await fetch(
        "/api/admin/import-blogs",
        withAdminCsrf({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            blogs: parsedBlogs,
            updateExisting,
          }),
        })
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || json.message || "Import failed");
      }

      setResultMsg({
        success: true,
        message: json.message || "All blogs successfully saved into database!",
        details: `Created: ${json.createdCount} | Updated: ${json.updatedCount}`,
      });

      // Reload dashboard after short delay so the user sees all imported posts
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Import submit failed:", err);
      setResultMsg({
        success: false,
        message: err.message,
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".doc,.docx,.htm,.html,.json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="btn btn--ghost"
        disabled={parsing}
        onClick={() => fileInputRef.current?.click()}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#22d3ee",
          borderColor: "rgba(34, 211, 238, 0.3)",
        }}
        title="Upload Word (.doc) file to import all blogs directly into database"
      >
        {parsing ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Upload size={16} aria-hidden="true" />
        )}
        <span>{parsing ? "Reading File..." : "Import Word File"}</span>
      </button>

      {/* Confirmation & Preview Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#0d0d1a",
              border: "1px solid rgba(146, 52, 235, 0.4)",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
                  Import Blogs into Database
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "rgba(255, 255, 255, 0.5)" }}>
                  File: <strong style={{ color: "#c084fc" }}>{fileName}</strong> (Detected{" "}
                  <strong style={{ color: "#22d3ee" }}>{parsedBlogs.length}</strong> posts)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={importing}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Posts Preview List */}
            <div
              style={{
                padding: "16px 20px",
                overflowY: "auto",
                flex: 1,
                maxHeight: "360px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "4px" }}>
                Preview of detected articles ready to be posted in DB:
              </div>

              {parsedBlogs.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#fff",
                      }}
                    >
                      {idx + 1}. {b.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", marginTop: "2px" }}>
                      {b.slug ? `/blog/${b.slug}` : "(Auto slug)"} · {b.author || "Editorial"}
                      {b.tags?.length ? ` · ${b.tags.slice(0, 3).join(", ")}` : ""}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      backgroundColor: b.published ? "rgba(34, 197, 94, 0.15)" : "rgba(234, 179, 8, 0.15)",
                      color: b.published ? "#4ade80" : "#facc15",
                      border: `1px solid ${b.published ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>

            {/* Options */}
            <div
              style={{
                padding: "12px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.8)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={updateExisting}
                  onChange={(e) => setUpdateExisting(e.target.checked)}
                  style={{ accentColor: "#9234eb", width: "16px", height: "16px" }}
                />
                <span>Update existing posts if URL slug already exists in database</span>
              </label>
            </div>

            {/* Status message */}
            {resultMsg && (
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: resultMsg.success
                    ? "rgba(34, 197, 94, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                  color: resultMsg.success ? "#4ade80" : "#f87171",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {resultMsg.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <div>
                  <strong>{resultMsg.message}</strong>
                  {resultMsg.details && (
                    <div style={{ fontSize: "11px", opacity: 0.85 }}>{resultMsg.details}</div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div
              style={{
                padding: "14px 20px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setModalOpen(false)}
                disabled={importing}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleImportSubmit}
                disabled={importing}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(135deg, #9234eb, #FF40EB)",
                }}
              >
                {importing ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                <span>
                  {importing
                    ? "Saving to Database..."
                    : `Save All ${parsedBlogs.length} Posts to DB`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
