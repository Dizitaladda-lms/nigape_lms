"use client";

import { useState } from "react";

export default function BlogToc({ items = [] }) {
  const [expanded, setExpanded] = useState(false);

  if (!items || items.length < 2) {
    return null;
  }

  const visibleItems = expanded ? items : items.slice(0, 5);
  const hasMore = items.length > 5;

  return (
    <details className="blog-toc">
      <summary>Table of contents</summary>
      <nav aria-label="Table of contents">
        <ol>
          {visibleItems.map((item) => (
            <li
              key={item.id}
              className={`blog-toc__item--${item.level || "h2"}`}
            >
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ol>
        {hasMore ? (
          <button
            type="button"
            className="blog-toc__view-more"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "View less" : "View more"}
          </button>
        ) : null}
      </nav>
    </details>
  );
}
