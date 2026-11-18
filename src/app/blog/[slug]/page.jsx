import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogSidebar from "@/components/BlogSidebar";
import BlogShell from "@/components/BlogShell";
import { getBlogBySlug, getBlogSidebarData } from "@/lib/blogs";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const defaultDescription =
  "Explore Generative AI and Prompt Engineering guides, trends, tools, tutorials, and career insights from NIGAPE.";

function getCoverSrc(coverImg) {
  const value = coverImg?.trim();
  if (!value) return null;
  if (value.startsWith("//")) return `https:${value}`;
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return `/${value.replace(/^\/+/, "")}`;
}

function getAbsoluteCoverUrl(coverImg, siteUrl) {
  const coverSrc = getCoverSrc(coverImg);
  return coverSrc ? new URL(coverSrc, `${siteUrl}/`).toString() : undefined;
}

function getBlogStructuredData(blog, canonicalUrl, siteUrl) {
  if (blog.schemaJsonLd?.trim()) {
    try {
      return JSON.parse(blog.schemaJsonLd);
    } catch (error) {
      console.error(`Invalid JSON-LD for blog post "${blog.slug}".`, error);
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt || defaultDescription,
    image: getAbsoluteCoverUrl(blog.coverImg, siteUrl),
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: blog.author
      ? { "@type": "Person", name: blog.author }
      : { "@type": "Organization", name: "NIGAPE" },
    publisher: {
      "@type": "Organization",
      name: "NIGAPE",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/Nigapepic/nigape1.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    keywords: blog.tags?.length ? blog.tags.join(", ") : undefined,
  };
}

function serializeStructuredData(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog post not found | NIGAPE" };
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/blog/${blog.slug}`;
  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt || defaultDescription;
  const image = getAbsoluteCoverUrl(blog.coverImg, siteUrl);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: blog.author ? [blog.author] : undefined,
      tags: blog.tags?.length ? blog.tags : undefined,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { latestPosts, categories } = await getBlogSidebarData();
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/blog/${blog.slug}`;
  const structuredData = getBlogStructuredData(blog, canonicalUrl, siteUrl);
  const coverSrc = getCoverSrc(blog.coverImg);
  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  const date = new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
    new Date(blog.createdAt)
  );

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <main className="blog-detail">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/blog" prefetch={false}>Blog</Link>
          <span aria-hidden="true">/</span>
          <span>{blog.title}</span>
        </nav>

        <div className="blog-detail__layout">
          <article className="blog-detail__main">
            <header className="blog-detail__header">
              <span className="blog-category-chip">{tags[0] || "Generative AI"}</span>
              <h1 id="blog-title">{blog.title}</h1>
              {blog.excerpt ? <p>{blog.excerpt}</p> : null}
              <div className="blog-detail__meta">
                <span>{date}</span>
                {blog.author ? <span>{blog.author}</span> : null}
              </div>
              {tags.length ? (
                <div className="tags" aria-label="Article tags">
                  {tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : null}
            </header>

            {coverSrc ? (
              <div className="cover">
                <Image
                  src={coverSrc}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  unoptimized={/^https?:\/\//i.test(coverSrc)}
                  priority
                />
              </div>
            ) : null}

            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />
          </article>

          <BlogSidebar
            latestPosts={latestPosts}
            categories={categories}
            tags={tags}
          />
        </div>
      </main>
    </BlogShell>
  );
}
