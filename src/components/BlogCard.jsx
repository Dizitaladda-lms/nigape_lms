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
  const tags = blog.tags?.slice(0, 3) || [];
  const excerpt = toExcerpt(blog.excerpt || blog.content);

  return (
    <article className="blog-card group relative flex flex-col rounded-2xl overflow-hidden border border-[#9234eb]/25 bg-gradient-to-br from-[#0d0d1a] to-[#120820] hover:border-[#9234eb]/60 hover:shadow-xl hover:shadow-[#9234eb]/10 transition-all duration-300 h-full">
      {/* Cover image */}
      <Link
        href={`/blog/${blog.slug}`}
        className="block overflow-hidden"
        style={{ position: "relative", paddingTop: "56.25%" }}
        aria-label={`Read ${blog.title}`}
      >
        {hasCover ? (
          <Image
            src={cover}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            unoptimized={isExternal}
            className="group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#9234eb]/25 to-[#FF40EB]/15 flex items-center justify-center">
            <span className="text-4xl">✍️</span>
          </div>
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a]/80 via-transparent to-transparent" />
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Meta */}
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
          {tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{tags.length} topic{tags.length > 1 ? "s" : ""}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 group-hover:text-[#c084fc] transition-colors">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">{excerpt}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-2 py-0.5 rounded-full text-xs border border-[#9234eb]/30 bg-[#9234eb]/10 text-[#c084fc] hover:bg-[#9234eb]/25 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-auto inline-flex items-center gap-1 text-[#9234eb] hover:text-[#FF40EB] text-sm font-semibold transition-colors"
        >
          Read more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
