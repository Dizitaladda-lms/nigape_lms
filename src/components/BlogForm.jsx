"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/BlogEditor";
import { withAdminCsrf } from "@/lib/client-csrf";

const baseState = {
  title: "",
  slug: "",
  coverImg: "",
  tags: "",
  content: "",
  excerpt: "",
  author: "",
  metaTitle: "",
  metaDescription: "",
  published: true,
};

const clientSlugify = (raw = "") =>
  raw
    .toString()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const slugHelpId = "blog-form-slug-help";
const tagsHelpId = "blog-form-tags-help";
const statusHelpId = "blog-form-status-help";
const excerptHelpId = "blog-form-excerpt-help";
const metaTitleHelpId = "blog-form-meta-title-help";
const metaDescHelpId = "blog-form-meta-desc-help";

const formatDateTimeInput = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const BlogForm = ({ initialData = null, mode = "create" }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(() => ({
    ...baseState,
    ...initialData,
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    coverImg: initialData?.coverImg ?? "",
    tags: Array.isArray(initialData?.tags) ? initialData.tags.join(", ") : (initialData?.tags || ""),
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    author: initialData?.author || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    published: initialData?.published !== false,
  }));
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [activeTab, setActiveTab] = useState("content");
  const [schemaCopied, setSchemaCopied] = useState(false);
  const [schemaOverride, setSchemaOverride] = useState(() => initialData?.schemaJsonLd || "");
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const formTitle = useMemo(() => (mode === "edit" ? "Update Post" : "Create Post"), [mode]);
  const titleLength = formValues.title.trim().length;
  const contentText = formValues.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = contentText ? contentText.split(" ").length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));
  const normalizedSlug = (formValues.slug || clientSlugify(formValues.title) || "").trim();
  const postDate = formatDateTimeInput(initialData?.createdAt);
  const tagCount = formValues.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean).length;
  const checklist = [
    { label: "Title added", ok: Boolean(formValues.title.trim()) },
    { label: "Slug ready", ok: Boolean(normalizedSlug) },
    { label: "Content added", ok: wordCount > 0 },
    { label: "Cover image set", ok: Boolean(formValues.coverImg.trim()) },
    { label: "Meta description set", ok: Boolean(formValues.metaDescription.trim()) },
  ];

  useEffect(() => {
    if (!slugTouched && formValues.title) {
      setFormValues((prev) => ({
        ...prev,
        slug: clientSlugify(prev.title) || prev.slug,
      }));
    }
  }, [formValues.title, slugTouched]);

  const setField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event, field) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus({ type: null, message: "" });

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const response = await fetch(
        "/api/upload",
        withAdminCsrf({
          method: "POST",
          body: uploadData,
        })
      );
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }
      setField(field, result.url);
      setStatus({ type: "success", message: "Image uploaded" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      if (!formValues.title.trim() || !formValues.content.trim()) {
        throw new Error("Title and content are required");
      }

      const payload = {
        title: formValues.title.trim(),
        slug: formValues.slug.trim() || clientSlugify(formValues.title),
        coverImg: formValues.coverImg?.trim() || "",
        tags: formValues.tags,
        content: formValues.content,
        excerpt: formValues.excerpt?.trim() || "",
        author: formValues.author?.trim() || "",
        metaTitle: formValues.metaTitle?.trim() || "",
        metaDescription: formValues.metaDescription?.trim() || "",
        schemaJsonLd: schemaOverride?.trim() || "",
        published: formValues.published,
      };

      const isEdit = mode === "edit" && initialData?.id;
      const endpoint = isEdit ? `/api/blog/${initialData.id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(
        endpoint,
        withAdminCsrf({
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error(result.error || "Unable to save blog");
      }

      setStatus({ type: "success", message: isEdit ? "Post updated" : "Post created" });
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} aria-busy={submitting || uploading}>
      <header className="admin-form__header">
        <div>
          <h2>{mode === "edit" ? "Edit Blog Post" : "Create New Blog Post"}</h2>
          <p>Write your content and optimize for search engines</p>
        </div>
        <div className="admin-form__meta" aria-label="Writing stats">
          <span>{wordCount} words</span>
          <span>{readTime} min read</span>
          <span>{tagCount} tags</span>
        </div>
      </header>

      <div className="admin-form__tabs" role="tablist" aria-label="Editor sections">
        <button
          type="button"
          className={`admin-form__tab${activeTab === "content" ? " is-active" : ""}`}
          role="tab"
          aria-selected={activeTab === "content"}
          onClick={() => setActiveTab("content")}
        >
          Content
        </button>
        <button
          type="button"
          className={`admin-form__tab${activeTab === "seo" ? " is-active" : ""}`}
          role="tab"
          aria-selected={activeTab === "seo"}
          onClick={() => setActiveTab("seo")}
        >
          SEO
        </button>
        <button
          type="button"
          className={`admin-form__tab${activeTab === "schema" ? " is-active" : ""}`}
          role="tab"
          aria-selected={activeTab === "schema"}
          onClick={() => setActiveTab("schema")}
        >
          Schema / JSON-LD
        </button>
      </div>

      <section className="admin-form__content" aria-label="Post editor" style={{ display: activeTab === "content" ? undefined : "none" }}>
        <label className="field field--title">
          <span>Title *</span>
          <input
            type="text"
            name="title"
            required
            maxLength={140}
            value={formValues.title}
            onChange={(event) => setField("title", event.target.value)}
            placeholder="Post title"
          />
          <small>{titleLength}/140</small>
        </label>

        <label className="field">
          <span>Slug *</span>
          <div className="field__slug-row">
            <span className="field__slug-prefix">/blog/</span>
            <input
              type="text"
              name="slug"
              value={formValues.slug}
              onChange={(event) => {
                setSlugTouched(true);
                setField("slug", clientSlugify(event.target.value));
              }}
              aria-describedby={slugHelpId}
              placeholder="post-slug"
            />
          </div>
          <small id={slugHelpId}>Auto-generated from title. You can edit it before publishing.</small>
        </label>

        <p className="slug-preview">Final URL: /blog/{normalizedSlug || "your-post-slug"}</p>

        <label className="editor-label">
          <span>Content *</span>
          <BlogEditor value={formValues.content} onChange={(html) => setField("content", html)} />
        </label>

        <section className="admin-card">
          <h3>Cover Image</h3>
          <div className="admin-cover-grid">
            <div>
              <label className="field field--file">
                <span>Upload image</span>
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleImageUpload(event, "coverImg")} disabled={uploading} />
                <small>
                  {uploading ? "Uploading..." : "JPEG, PNG, and WebP only. Upload goes to ImgBB and URL is filled automatically."}
                </small>
              </label>

              <label className="field field--cover-url">
                <span>Or paste an image URL</span>
                <input
                  type="text"
                  name="coverImg"
                  placeholder="https://"
                  value={formValues.coverImg}
                  onChange={(event) => setField("coverImg", event.target.value)}
                />
              </label>
            </div>

            {formValues.coverImg?.trim() ? (
              <div className="cover-preview">
                <Image
                  src={formValues.coverImg}
                  alt="Cover preview"
                  width={480}
                  height={270}
                  unoptimized
                  style={{ width: "100%", height: "auto", maxHeight: 225, objectFit: "cover" }}
                />
              </div>
            ) : (
              <p className="cover-preview--empty">No cover selected yet.</p>
            )}
          </div>
        </section>

        <section className="admin-card">
          <h3>Post Settings</h3>

          <div className="admin-settings-grid">
            <label className="field">
              <span>Tags</span>
              <input
                type="text"
                name="tags"
                placeholder="marketing, release, seo"
                value={formValues.tags}
                onChange={(event) => setField("tags", event.target.value)}
                aria-describedby={tagsHelpId}
              />
              <small id={tagsHelpId}>Comma-separated topics used for search and related posts.</small>
            </label>

            <label className="field">
              <span>Status</span>
              <select
                name="published"
                value={formValues.published ? "published" : "draft"}
                onChange={(event) => setField("published", event.target.value === "published")}
                aria-describedby={statusHelpId}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <small id={statusHelpId}>Published posts are visible publicly. Drafts are only visible in the admin panel.</small>
            </label>

            <label className="field">
              <span>Published At</span>
              <input type="text" value={postDate || "Will be set after publishing"} readOnly />
            </label>

            <label className="field">
              <span>Author Name</span>
              <input
                type="text"
                name="author"
                placeholder="Admin"
                value={formValues.author}
                onChange={(event) => setField("author", event.target.value)}
              />
            </label>
          </div>

          <ul className="publish-checklist">
            {checklist.map((item) => (
              <li key={item.label} className={item.ok ? "is-complete" : ""}>
                <span aria-hidden="true">{item.ok ? "✓" : "•"}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <section className="admin-form__content" aria-label="SEO settings">
          <section className="admin-card">
            <h3>SEO Settings</h3>
            <p style={{ marginBottom: "1rem", color: "var(--text-muted, #888)" }}>These fields control how your post appears in search engine results.</p>

            <label className="field">
              <span>Meta Title</span>
              <input
                type="text"
                name="metaTitle"
                maxLength={70}
                placeholder={formValues.title || "SEO-optimized title (max 70 chars)"}
                value={formValues.metaTitle}
                onChange={(event) => setField("metaTitle", event.target.value)}
                aria-describedby={metaTitleHelpId}
              />
              <small id={metaTitleHelpId}>
                {formValues.metaTitle.length}/70 — Leave blank to use the post title.
              </small>
            </label>

            <label className="field">
              <span>Meta Description</span>
              <textarea
                name="metaDescription"
                maxLength={160}
                rows={3}
                placeholder="Brief description shown in search results (max 160 chars)"
                value={formValues.metaDescription}
                onChange={(event) => setField("metaDescription", event.target.value)}
                aria-describedby={metaDescHelpId}
                style={{ resize: "vertical", width: "100%" }}
              />
              <small id={metaDescHelpId}>
                {formValues.metaDescription.length}/160 — Aim for 120–160 characters.
              </small>
            </label>

            <label className="field">
              <span>Excerpt / Summary</span>
              <textarea
                name="excerpt"
                rows={3}
                placeholder="Short summary shown on blog listing cards"
                value={formValues.excerpt}
                onChange={(event) => setField("excerpt", event.target.value)}
                aria-describedby={excerptHelpId}
                style={{ resize: "vertical", width: "100%" }}
              />
              <small id={excerptHelpId}>Used on blog cards and as fallback meta description.</small>
            </label>
          </section>

          <section className="admin-card">
            <h3>SEO Preview</h3>
            <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "1rem", background: "#fff" }}>
              <p style={{ color: "#1a0dab", fontSize: "1.1rem", marginBottom: "0.25rem", fontWeight: 500 }}>
                {formValues.metaTitle.trim() || formValues.title.trim() || "Post Title"}
              </p>
              <p style={{ color: "#006621", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                {typeof window !== "undefined" ? window.location.origin : "https://yoursite.com"}/blog/{normalizedSlug || "post-slug"}
              </p>
              <p style={{ color: "#545454", fontSize: "0.9rem" }}>
                {formValues.metaDescription.trim() || formValues.excerpt.trim() || "No meta description set. Add one to improve click-through rates."}
              </p>
            </div>
          </section>
        </section>
      )}

      {/* Schema / JSON-LD Tab */}
      {activeTab === "schema" && (
        <section className="admin-form__content" aria-label="Schema JSON-LD">
          <section className="admin-card">
            <h3>JSON-LD Structured Data</h3>
            <p style={{ marginBottom: "1rem", color: "var(--text-muted, #888)" }}>
              Add your custom JSON-LD here. Only this value will be saved and used on the blog page.
            </p>
            <div style={{ position: "relative" }}>
              <textarea
                rows={20}
                value={schemaOverride}
                onChange={(e) => setSchemaOverride(e.target.value)}
                spellCheck={false}
                style={{ width: "100%", fontFamily: "monospace", fontSize: "0.82rem", background: "#1e1e1e", color: "#d4d4d4", borderRadius: "8px", padding: "1rem", resize: "vertical", border: "none", outline: "none" }}
              />
              <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", display: "flex", gap: "0.4rem" }}>
                <button
                  type="button"
                  className="btn btn--ghost"
                  style={{ fontSize: "0.78rem", padding: "0.25rem 0.75rem" }}
                  onClick={() => {
                    setSchemaOverride("");
                  }}
                  title="Clear schema"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  style={{ fontSize: "0.78rem", padding: "0.25rem 0.75rem" }}
                  onClick={() => {
                    navigator.clipboard.writeText(schemaOverride).then(() => {
                      setSchemaCopied(true);
                      setTimeout(() => setSchemaCopied(false), 2000);
                    });
                  }}
                >
                  {schemaCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <small style={{ marginTop: "0.5rem", display: "block" }}>
              {schemaOverride.trim() ? "Custom schema is ready to save." : "No schema added yet."}
            </small>
          </section>
        </section>
      )}

      {status.message ? (
        <p
          className={`form-status form-status--${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </p>
      ) : null}

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={() => router.push("/admin/blog")}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={submitting || uploading}>
          {submitting ? "Saving..." : formTitle}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
