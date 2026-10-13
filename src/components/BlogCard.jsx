import Link from "next/link";
import Image from "next/image";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

const resolveCoverSrc = (coverImg, baseUrl) => {
  const trimmed = coverImg?.trim();
  if (!trimmed) return null;
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("/")) return trimmed;
  if (!baseUrl) return `/${trimmed.replace(/^\/+/, "")}`;
  return new URL(trimmed, `${baseUrl}/`).toString();
};

const toExcerpt = (html) => {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
};

const BlogCard = ({ blog, baseUrl }) => {
  if (!blog) return null;
  const rawCover = resolveCoverSrc(blog.coverImg, baseUrl);
  const isExternal = Boolean(rawCover && /^(https?:)?\/\//i.test(rawCover));
  const hasCover = Boolean(rawCover);
  const cover = hasCover ? rawCover : null;
  const primaryTag = blog.tags?.[0] || "";

  return (
    <article className="blog-card">
      {/* Cover image */}
      <Link
        href={`/blog/${blog.slug}`}
        className="blog-card__image"
        aria-label={`Read ${blog.title}`}
      >
        {hasCover ? (
          <Image
            src={cover}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            style={{ objectFit: "cover" }}
            unoptimized={isExternal}
            loading="lazy"
          />
        ) : (
          <div className="blog-card__image--placeholder">
            <span>✍️ {blog.title}</span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="blog-card__body">
        {/* Meta */}
        <div className="blog-card__meta">
          <span>{formatDate(blog.createdAt)}</span>
          {primaryTag ? (
            <>
              <span>•</span>
              <span className="uppercase tracking-wider text-[11px] font-semibold">{primaryTag}</span>
            </>
          ) : null}
        </div>

        {/* Title */}
        <h3>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="blog-card__desc">
          {blog.excerpt || toExcerpt(blog.content)}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${blog.slug}`}
          className="blog-card__cta"
        >
          Continue reading →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
