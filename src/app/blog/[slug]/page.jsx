import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/base-url";
import { getBlogBySlug, getBlogSidebarData } from "@/lib/blogs";
import BlogShell from "@/components/BlogShell";
import BlogSidebar from "@/components/BlogSidebar";
import BlogToc from "@/components/BlogToc";
import "@/styles/blog.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(value));

const toText = (html) => (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const prepareBlogContentAndToc = (rawHtml) => {
  if (!rawHtml) return { content: "", toc: [] };

  // 1. Convert h1 inside body content to h2
  let html = rawHtml.replace(/<\/?h1\b/gi, (tag) => tag.replace(/h1/i, "h2"));

  // 2. Strip inline font-family / font-size / line-height styles from pasted rich-text so nidads typography rules take full effect
  html = html.replace(/\sstyle="([^"]*)"/gi, (match, styleStr) => {
    const cleaned = styleStr
      .split(";")
      .map((s) => s.trim())
      .filter(
        (s) =>
          s &&
          !/^(font-family|font-size|line-height|font)\s*:/i.test(s)
      )
      .join("; ");
    return cleaned ? ` style="${cleaned}"` : "";
  });

  // 3. Extract h2 headings for Table of Contents and inject anchor IDs
  const toc = [];
  const usedIds = new Set();
  let counter = 0;

  html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, inner) => {
    const plain = inner
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!plain) return match;

    // Check if an id attribute already exists
    const existingIdMatch = attrs.match(/\bid=["']([^"']+)["']/i);
    let slugId = existingIdMatch ? existingIdMatch[1] : "";

    if (!slugId) {
      slugId = plain
        .toLowerCase()
        .replace(/&[a-z0-9#]+;/gi, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }

    if (!slugId) {
      slugId = `section-${++counter}`;
    }

    let uniqueId = slugId;
    let dup = 2;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${slugId}-${dup++}`;
    }
    usedIds.add(uniqueId);

    toc.push({ id: uniqueId, text: plain, level: "h2" });

    if (existingIdMatch) {
      return match;
    }
    return `<h2 id="${uniqueId}"${attrs}>${inner}</h2>`;
  });

  return { content: html, toc };
};

const calculateReadingMinutes = (html) => {
  const words = toText(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

const parseJsonLd = (value) => {
  if (!value || typeof value !== "string") {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export async function generateMetadata(props) {
  const params = await props?.params;
  const slug = params?.slug;
  const blog = slug ? await getBlogBySlug(slug) : null;

  if (!blog) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = await getBaseUrl();
  const description = (blog.metaDescription || blog.excerpt || blog.content || "")
    .replace(/<[^>]+>/g, " ")
    .slice(0, 160);
  const isExternalCover = Boolean(blog.coverImg && /^(https?:)?\/\//i.test(blog.coverImg));
  const image = blog.coverImg
    ? isExternalCover
      ? blog.coverImg
      : new URL(blog.coverImg, baseUrl).toString()
    : undefined;
  const canonical = new URL(`/blog/${blog.slug}`, baseUrl).toString();

  return {
    title: blog.metaTitle || blog.title,
    description,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description,
      images: image ? [image] : undefined,
      type: "article",
      url: canonical,
    },
    alternates: { canonical },
  };
}

export default async function BlogDetails(props) {
  const params = await props?.params;
  const slug = params?.slug;
  const blog = slug ? await getBlogBySlug(slug) : null;

  if (!blog) {
    notFound();
  }

  const { latestPosts, categories } = await getBlogSidebarData();
  const cover = blog.coverImg?.trim();
  const { content, toc } = prepareBlogContentAndToc(blog.content);
  const isExternalCover = Boolean(cover && /^(https?:)?\/\//i.test(cover));
  const hasCover = Boolean(cover);
  const imageSrc = hasCover ? cover : "/placeholder.svg";
  const isPlaceholder = !hasCover;
  const readingMinutes = calculateReadingMinutes(blog.content);
  const publishedDate = formatDate(blog.createdAt);
  const updatedDate = formatDate(blog.updatedAt ?? blog.createdAt);
  const customJsonLd = parseJsonLd(blog.schemaJsonLd);
  const authorName = blog.author?.trim() || "Editorial Team";
  const showAuthorBox = Boolean(blog.author || blog.authorImage || blog.authorDescription);
  const authorImageIsExternal = Boolean(
    blog.authorImage && /^(https?:)?\/\//i.test(blog.authorImage)
  );

  return (
    <BlogShell>
      <main id="main-content" className="blog-detail" role="main">
        <div className="blog-detail__layout">
          <article className="blog-detail__main" aria-labelledby="blog-title">
            {customJsonLd ? (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(customJsonLd) }}
              />
            ) : null}
            <header className="blog-detail__header">
              <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span>{blog.title}</span>
              </nav>

              <p className="eyebrow">{publishedDate}</p>
              <h1 id="blog-title">{blog.title}</h1>

              <div className="blog-detail__meta" aria-label="Post details">
                <span>{readingMinutes} min read</span>
                <span>Updated {updatedDate}</span>
                <span>By {authorName}</span>
              </div>

              {blog.tags?.length ? (
                <div className="tags" aria-label="Post tags">
                  {blog.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      #{tag}
                    </Link>
                  ))}
                </div>
              ) : null}
            </header>

            <div className={`cover${isPlaceholder ? " cover--placeholder" : ""}`}>
              <Image
                src={imageSrc}
                alt={blog.title}
                fill
                sizes="(max-width: 900px) 100vw, 840px"
                priority
                style={{ objectFit: "cover" }}
                unoptimized={isExternalCover}
              />
              {isPlaceholder ? (
                <span className="cover__hint">
                  Upload a cover image from the admin panel to replace this default artwork.
                </span>
              ) : null}
            </div>

            <BlogToc items={toc} />

            <div className="content" dangerouslySetInnerHTML={{ __html: content }} />

            {/* About the Author box */}
            {showAuthorBox ? (
              <section className="blog-author" aria-labelledby="blog-author-title">
                {blog.authorImage ? (
                  <Image
                    className="blog-author__image"
                    src={blog.authorImage}
                    alt={authorName}
                    width={112}
                    height={112}
                    sizes="112px"
                    unoptimized={authorImageIsExternal}
                  />
                ) : (
                  <div className="blog-author__placeholder" aria-hidden="true">
                    {authorName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="blog-author__body">
                  <h2 id="blog-author-title">About the Author</h2>
                  <h3>{authorName}</h3>
                  {blog.authorDescription ? (
                    <p>{blog.authorDescription}</p>
                  ) : (
                    <p>Contributor to the NIGAPE Generative AI & Prompt Engineering blog.</p>
                  )}
                </div>
              </section>
            ) : null}

            <section className="blog-detail__footer-cta" aria-label="Continue reading">
              <p>Want more insights like this?</p>
              <div>
                <Link href="/blog" className="btn btn--ghost">
                  Browse all posts
                </Link>
                <Link href="/contact-us" className="btn btn--primary">
                  Contact team
                </Link>
              </div>
            </section>
          </article>

          {/* Right Sidebar: Latest Posts, Enquire Now form, Categories, Tags */}
          <BlogSidebar
            latestPosts={latestPosts}
            categories={categories}
            tags={blog.tags || []}
          />
        </div>
      </main>
    </BlogShell>
  );
}
