"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const toImageSrc = (source) => {
  const value = source?.trim();
  if (!value) return "/placeholder.svg";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("/")) return value;
  return `/${value.replace(/^\/+/, "")}`;
};

export default function BlogSidebar({ latestPosts, categories, tags = [] }) {
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending enquiry..." });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      payload.set(key, String(value));
    }
    payload.set("source", "blog-sidebar-enquiry");

    try {
      const response = await fetch("/api/submit-lead", { method: "POST", body: payload });
      const result = await response.json();
      if (!response.ok || result.ok === false) {
        throw new Error(result.error || "Unable to submit your enquiry.");
      }
      form.reset();
      setStatus({ type: "success", message: "Thanks! Your enquiry was sent." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit your enquiry.",
      });
    }
  };

  return (
    <aside className="blog-sidebar" aria-label="Blog resources">
      <section className="blog-sidebar__panel">
        <h2>Latest posts</h2>
        <ul className="blog-latest-list">
          {latestPosts.map((post) => (
            <li key={post.id}>
              <Link className="blog-latest" href={`/blog/${post.slug}`}>
                <Image
                  src={toImageSrc(post.coverImg)}
                  alt=""
                  width={76}
                  height={76}
                  sizes="76px"
                  unoptimized={Boolean(post.coverImg && /^(https?:)?\/\//i.test(post.coverImg))}
                />
                <span className="blog-latest__copy">
                  <span className="blog-latest__title">{post.title}</span>
                  <span className="blog-latest__category">{post.tags?.[0] || "Latest news"}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="blog-sidebar__panel blog-enquiry">
        <h2>Enquire now</h2>
        <form onSubmit={submitEnquiry}>
          <label>
            Name
            <input name="name" autoComplete="name" placeholder="Your full name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" placeholder="your.email@example.com" required />
          </label>
          <label>
            Mobile
            <input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit number" required />
          </label>
          <label>
            Course interest
            <input name="course" placeholder="Course you are interested in" />
          </label>
          {status.message ? (
            <p className={`blog-enquiry__status blog-enquiry__status--${status.type}`} role="status">
              {status.message}
            </p>
          ) : null}
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Sending..." : "Submit enquiry"}
          </button>
        </form>
      </section>

      <section className="blog-sidebar__panel">
        <h2>Categories</h2>
        <div className="blog-category-list">
          {categories.map((category) => (
            <Link key={category} href={`/blog?tag=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          ))}
        </div>
        {!categories.length ? <p className="blog-sidebar__empty">Browse the latest posts for new topics.</p> : null}
      </section>

      <section className="blog-sidebar__panel">
        <h2>Tags</h2>
        <div className="blog-tag-list">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>
          ))}
        </div>
        {!tags.length ? <p className="blog-sidebar__empty">No tags for this post.</p> : null}
      </section>
    </aside>
  );
}
