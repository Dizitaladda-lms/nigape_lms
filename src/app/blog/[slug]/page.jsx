import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogSidebar from "@/components/BlogSidebar";
import BlogShell from "@/components/BlogShell";
import { getBlogBySlug, OFFICIAL_CATEGORIES } from "@/lib/blogs";
import "@/styles/blog.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const metadata = {
  title: "Generative AI & Prompt Engineering Blog | NIGAPE",
  description:
    "Explore Generative AI and Prompt Engineering guides, trends, tools, tutorials, and career insights from NIGAPE.",
};

function getCoverSrc(coverImg) {
  const value = coverImg?.trim();
  if (!value) return null;
  if (value.startsWith("//")) return `https:${value}`;
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return `/${value.replace(/^\/+/, "")}`;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const coverSrc = getCoverSrc(blog.coverImg);
  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  const date = new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
    new Date(blog.createdAt)
  );

  return (
    <BlogShell>
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
            latestPosts={[]}
            categories={OFFICIAL_CATEGORIES}
            tags={tags}
          />
        </div>
      </main>
    </BlogShell>
  );
}
