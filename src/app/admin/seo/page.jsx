"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Globe,
  Search,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Edit3,
  X,
  Save,
  AlertCircle,
  Tag,
  Link as LinkIcon,
  BookOpen,
  FileCode,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminSeoPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "page" | "course"
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "custom" | "default"

  // Modal / Drawer state for editing
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogImage: "",
    noIndex: false,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Load entries on mount
  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/seo", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to load SEO entries (Status: ${res.status})`);
      }
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err) {
      setError(err.message || "Failed to fetch SEO data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  // Show temporary toast message
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Open Edit Modal
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      metaTitle: entry.metaTitle || entry.defaultMetaTitle || "",
      metaDescription: entry.metaDescription || entry.defaultMetaDescription || "",
      keywords: entry.keywords || entry.defaultKeywords || "",
      canonicalUrl: entry.canonicalUrl || entry.defaultCanonicalUrl || "",
      ogImage: entry.ogImage || "/Nigapepic/nigape1.png",
      noIndex: Boolean(entry.noIndex),
    });
  };

  // Close Modal
  const handleClose = () => {
    setEditingEntry(null);
  };

  // Save changes
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!editingEntry) return;

    try {
      setSaving(true);
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: editingEntry.path,
          entityType: editingEntry.entityType,
          entityName: editingEntry.entityName,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          keywords: formData.keywords,
          canonicalUrl: formData.canonicalUrl,
          ogImage: formData.ogImage,
          noIndex: formData.noIndex,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to save SEO");
      }

      showToast(`On-Page SEO saved successfully for "${editingEntry.entityName}"!`);
      handleClose();
      await loadEntries();
    } catch (err) {
      showToast(err.message || "Error saving SEO", "error");
    } finally {
      setSaving(false);
    }
  };

  // Reset to default
  const handleReset = async (entry) => {
    if (!window.confirm(`Reset custom SEO for "${entry.entityName}" back to baseline defaults?`)) {
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`/api/admin/seo?path=${encodeURIComponent(entry.path)}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to reset SEO");
      }

      showToast(`SEO for "${entry.entityName}" reset to defaults!`);
      if (editingEntry?.path === entry.path) {
        handleClose();
      }
      await loadEntries();
    } catch (err) {
      showToast(err.message || "Error resetting SEO", "error");
    } finally {
      setSaving(false);
    }
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      // Tab filter
      if (activeTab === "page" && item.entityType !== "page") return false;
      if (activeTab === "course" && item.entityType !== "course") return false;

      // Status filter
      if (statusFilter === "custom" && !item.isCustomized) return false;
      if (statusFilter === "default" && item.isCustomized) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.entityName?.toLowerCase().includes(q);
        const matchPath = item.path?.toLowerCase().includes(q);
        const matchTitle = item.metaTitle?.toLowerCase().includes(q);
        const matchDesc = item.metaDescription?.toLowerCase().includes(q);
        const matchKw = item.keywords?.toLowerCase().includes(q);
        return matchName || matchPath || matchTitle || matchDesc || matchKw;
      }

      return true;
    });
  }, [entries, activeTab, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = entries.length;
    const pagesCount = entries.filter((e) => e.entityType === "page").length;
    const coursesCount = entries.filter((e) => e.entityType === "course").length;
    const customizedCount = entries.filter((e) => e.isCustomized).length;
    const defaultCount = total - customizedCount;
    return { total, pagesCount, coursesCount, customizedCount, defaultCount };
  }, [entries]);

  return (
    <section className="admin-dashboard">
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            backgroundColor: toast.type === "error" ? "#ef5b6e" : "#25c36c",
            color: "#ffffff",
            padding: "14px 22px",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "600",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {toast.type === "error" ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="admin-dashboard__header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1>On-Page SEO Manager</h1>
            <span
              style={{
                backgroundColor: "rgba(146, 52, 235, 0.2)",
                color: "#a855f7",
                border: "1px solid rgba(146, 52, 235, 0.4)",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              All Pages &amp; Courses
            </span>
          </div>
          <p>
            Configure custom Meta Titles, Meta Descriptions, Keywords, and Canonical URLs across every page and course.
          </p>
        </div>
        <button
          onClick={loadEntries}
          className="btn"
          disabled={loading}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RotateCcw size={16} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </header>

      {/* KPI Cards */}
      <div className="admin-kpi-grid" aria-label="SEO metrics">
        <article className="admin-kpi-card admin-kpi-card--total">
          <span className="admin-kpi-card__icon" aria-hidden="true">
            <Layers size={22} />
          </span>
          <div>
            <h3>{stats.total}</h3>
            <p>Total Manageable URLs</p>
          </div>
        </article>

        <article className="admin-kpi-card admin-kpi-card--published">
          <span className="admin-kpi-card__icon" aria-hidden="true">
            <BookOpen size={22} />
          </span>
          <div>
            <h3>{stats.coursesCount}</h3>
            <p>Courses Available</p>
          </div>
        </article>

        <article className="admin-kpi-card admin-kpi-card--drafts">
          <span className="admin-kpi-card__icon" aria-hidden="true">
            <FileCode size={22} />
          </span>
          <div>
            <h3>{stats.pagesCount}</h3>
            <p>Main &amp; Static Pages</p>
          </div>
        </article>

        <article className="admin-kpi-card admin-kpi-card--archived">
          <span className="admin-kpi-card__icon" aria-hidden="true">
            <Sparkles size={22} />
          </span>
          <div>
            <h3>{stats.customizedCount}</h3>
            <p>Custom Overrides Active</p>
          </div>
        </article>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          padding: "1rem",
          backgroundColor: "var(--admin-panel)",
          border: "1px solid var(--admin-border)",
          borderRadius: "14px",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", gap: "6px", backgroundColor: "#070c18", padding: "4px", borderRadius: "10px" }}>
          <button
            onClick={() => setActiveTab("all")}
            className={`btn ${activeTab === "all" ? "btn--primary" : ""}`}
            style={{ height: "2.2rem", padding: "0 14px", fontSize: "13px" }}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab("course")}
            className={`btn ${activeTab === "course" ? "btn--primary" : ""}`}
            style={{ height: "2.2rem", padding: "0 14px", fontSize: "13px" }}
          >
            Courses ({stats.coursesCount})
          </button>
          <button
            onClick={() => setActiveTab("page")}
            className={`btn ${activeTab === "page" ? "btn--primary" : ""}`}
            style={{ height: "2.2rem", padding: "0 14px", fontSize: "13px" }}
          >
            Pages ({stats.pagesCount})
          </button>
        </div>

        {/* Status Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              height: "2.5rem",
              padding: "0 12px",
              borderRadius: "10px",
              backgroundColor: "#111a30",
              color: "#e8eefb",
              border: "1px solid var(--admin-border)",
              fontSize: "13px",
              outline: "none",
            }}
          >
            <option value="all">Status: All</option>
            <option value="custom">Customized Only ({stats.customizedCount})</option>
            <option value="default">Default Only ({stats.defaultCount})</option>
          </select>

          {/* Search Box */}
          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--admin-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search title, slug, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "2.5rem",
                paddingLeft: "36px",
                paddingRight: "14px",
                borderRadius: "10px",
                backgroundColor: "#111a30",
                color: "#e8eefb",
                border: "1px solid var(--admin-border)",
                fontSize: "13px",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <section className="admin-table-card" aria-label="SEO list">
        <header className="admin-table-card__header">
          <h2>
            {activeTab === "all" ? "All Managed URLs" : activeTab === "course" ? "Courses SEO" : "Pages SEO"} (
            {filteredEntries.length})
          </h2>
        </header>

        {loading ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--admin-muted)" }}>
            <RotateCcw size={32} className="animate-spin" style={{ margin: "0 auto 12px" }} />
            <p>Loading on-page SEO data...</p>
          </div>
        ) : error ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#ff808f" }}>
            <AlertCircle size={32} style={{ margin: "0 auto 10px" }} />
            <p>{error}</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--admin-muted)" }}>
            <p>No matching pages or courses found.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "22%" }}>Page / Course</th>
                  <th style={{ width: "26%" }}>Meta Title</th>
                  <th style={{ width: "30%" }}>Meta Description &amp; Keywords</th>
                  <th style={{ width: "12%" }}>Status</th>
                  <th style={{ width: "10%", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((item) => (
                  <tr key={item.path}>
                    {/* Entity Info */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "700", color: "#f2f7ff", fontSize: "14px" }}>
                            {item.entityName}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              backgroundColor:
                                item.entityType === "course"
                                  ? "rgba(168, 85, 247, 0.15)"
                                  : "rgba(47, 120, 255, 0.15)",
                              color: item.entityType === "course" ? "#c084fc" : "#8fb4ff",
                              border:
                                item.entityType === "course"
                                  ? "1px solid rgba(168, 85, 247, 0.3)"
                                  : "1px solid rgba(47, 120, 255, 0.3)",
                            }}
                          >
                            {item.entityType === "course" ? "Course" : "Page"}
                          </span>
                        </div>
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: "12px",
                            color: "var(--admin-link)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            textDecoration: "none",
                          }}
                        >
                          <code>{item.path}</code>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </td>

                    {/* Meta Title */}
                    <td>
                      <div>
                        <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: "600", color: "#e8eefb" }}>
                          {item.metaTitle}
                        </p>
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            backgroundColor:
                              item.metaTitle?.length >= 50 && item.metaTitle?.length <= 60
                                ? "rgba(37, 195, 108, 0.15)"
                                : "rgba(240, 163, 41, 0.15)",
                            color:
                              item.metaTitle?.length >= 50 && item.metaTitle?.length <= 60 ? "#25c36c" : "#f0a329",
                          }}
                        >
                          {item.metaTitle?.length || 0} chars
                        </span>
                      </div>
                    </td>

                    {/* Meta Description & Keywords */}
                    <td>
                      <div>
                        <p
                          style={{
                            margin: "0 0 6px",
                            fontSize: "12px",
                            color: "var(--admin-muted)",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.metaDescription}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              backgroundColor:
                                item.metaDescription?.length >= 140 && item.metaDescription?.length <= 160
                                  ? "rgba(37, 195, 108, 0.15)"
                                  : "rgba(240, 163, 41, 0.15)",
                              color:
                                item.metaDescription?.length >= 140 && item.metaDescription?.length <= 160
                                  ? "#25c36c"
                                  : "#f0a329",
                            }}
                          >
                            {item.metaDescription?.length || 0} chars
                          </span>
                          {item.canonicalUrl && (
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#8fb4ff",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                              title={`Canonical: ${item.canonicalUrl}`}
                            >
                              <LinkIcon size={11} /> Canonical Set
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      {item.isCustomized ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#25c36c",
                            backgroundColor: "rgba(37, 195, 108, 0.12)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid rgba(37, 195, 108, 0.3)",
                          }}
                        >
                          <CheckCircle2 size={13} /> Custom SEO
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "var(--admin-muted)",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          Default
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn--primary"
                          style={{
                            height: "2.1rem",
                            padding: "0 10px",
                            fontSize: "12px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        {item.isCustomized && (
                          <button
                            onClick={() => handleReset(item)}
                            className="btn btn--danger"
                            title="Reset to default baseline"
                            style={{
                              height: "2.1rem",
                              padding: "0 8px",
                              fontSize: "12px",
                            }}
                          >
                            <RotateCcw size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Edit SEO Modal / Drawer */}
      {editingEntry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--admin-panel)",
              border: "1px solid var(--admin-border)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.2rem 1.5rem",
                borderBottom: "1px solid var(--admin-border)",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#fff" }}>
                  Edit On-Page SEO
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--admin-muted)" }}>
                  Target: <code style={{ color: "#a855f7" }}>{editingEntry.path}</code> ({editingEntry.entityName})
                </p>
              </div>
              <button
                onClick={handleClose}
                className="btn"
                style={{ height: "2rem", width: "2rem", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* Google SERP Live Preview */}
              <div
                style={{
                  backgroundColor: "#1a1f2c",
                  borderRadius: "10px",
                  padding: "14px 18px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <Globe size={14} color="#8ab4f8" />
                  <span style={{ fontSize: "12px", color: "#bdc1c6" }}>
                    {formData.canonicalUrl || `https://www.nigape.com${editingEntry.path}`}
                  </span>
                </div>
                <h4
                  style={{
                    margin: "0 0 6px",
                    color: "#8ab4f8",
                    fontSize: "17px",
                    fontWeight: "500",
                    lineHeight: "1.3",
                    cursor: "pointer",
                  }}
                >
                  {formData.metaTitle || editingEntry.defaultMetaTitle || "Page Title Preview"}
                </h4>
                <p
                  style={{
                    margin: 0,
                    color: "#bdc1c6",
                    fontSize: "13px",
                    lineHeight: "1.45",
                  }}
                >
                  {formData.metaDescription ||
                    editingEntry.defaultMetaDescription ||
                    "Page meta description preview will appear here as search engines display it."}
                </p>
              </div>

              {/* Meta Title Input */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#f2f7ff" }}>
                    Meta Title <span style={{ color: "#ef5b6e" }}>*</span>
                  </label>
                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60
                          ? "#25c36c"
                          : formData.metaTitle.length > 60
                          ? "#ef5b6e"
                          : "var(--admin-muted)",
                    }}
                  >
                    {formData.metaTitle.length}/60 chars (Optimal: 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Enter SEO meta title..."
                  style={{
                    width: "100%",
                    height: "2.7rem",
                    padding: "0 14px",
                    borderRadius: "10px",
                    backgroundColor: "#111a30",
                    color: "#fff",
                    border: "1px solid var(--admin-border)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Meta Description Input */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#f2f7ff" }}>
                    Meta Description <span style={{ color: "#ef5b6e" }}>*</span>
                  </label>
                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        formData.metaDescription.length >= 140 && formData.metaDescription.length <= 160
                          ? "#25c36c"
                          : formData.metaDescription.length > 160
                          ? "#ef5b6e"
                          : "var(--admin-muted)",
                    }}
                  >
                    {formData.metaDescription.length}/160 chars (Optimal: 140-160)
                  </span>
                </div>
                <textarea
                  required
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Enter compelling search snippet description..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    backgroundColor: "#111a30",
                    color: "#fff",
                    border: "1px solid var(--admin-border)",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Keywords Input */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#f2f7ff" }}>
                    Keywords (comma-separated)
                  </label>
                  <span style={{ fontSize: "12px", color: "var(--admin-muted)" }}>
                    e.g. generative ai, prompt engineering, delhi course
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="genai course, prompt engineering delhi, diploma in ai..."
                  style={{
                    width: "100%",
                    height: "2.7rem",
                    padding: "0 14px",
                    borderRadius: "10px",
                    backgroundColor: "#111a30",
                    color: "#fff",
                    border: "1px solid var(--admin-border)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Canonical URL Input */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#f2f7ff" }}>
                    Canonical URL (carodnical)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        canonicalUrl: `https://www.nigape.com${editingEntry.path}`,
                      })
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--admin-link)",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Auto-Fill Standard Canonical
                  </button>
                </div>
                <input
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  placeholder={`https://www.nigape.com${editingEntry.path}`}
                  style={{
                    width: "100%",
                    height: "2.7rem",
                    padding: "0 14px",
                    borderRadius: "10px",
                    backgroundColor: "#111a30",
                    color: "#fff",
                    border: "1px solid var(--admin-border)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              {/* OG Image */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#f2f7ff", marginBottom: "6px" }}>
                  OpenGraph Share Image URL
                </label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="/Nigapepic/nigape1.png or https://..."
                  style={{
                    width: "100%",
                    height: "2.7rem",
                    padding: "0 14px",
                    borderRadius: "10px",
                    backgroundColor: "#111a30",
                    color: "#fff",
                    border: "1px solid var(--admin-border)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Robots Index / NoIndex Toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  backgroundColor: "#070c18",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <input
                  type="checkbox"
                  id="noIndexToggle"
                  checked={formData.noIndex}
                  onChange={(e) => setFormData({ ...formData, noIndex: e.target.checked })}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <label htmlFor="noIndexToggle" style={{ fontSize: "13px", color: "#e8eefb", cursor: "pointer" }}>
                  <strong>noindex</strong> (Tell Google and search engines NOT to index this page)
                </label>
              </div>

              {/* Modal Footer Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "0.8rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--admin-border)",
                }}
              >
                {editingEntry.isCustomized ? (
                  <button
                    type="button"
                    onClick={() => handleReset(editingEntry)}
                    className="btn btn--danger"
                    disabled={saving}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px" }}
                  >
                    <RotateCcw size={14} /> Reset to Defaults
                  </button>
                ) : (
                  <div />
                )}

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={saving}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0 22px" }}
                  >
                    <Save size={16} />
                    <span>{saving ? "Saving..." : "Save On-Page SEO"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
