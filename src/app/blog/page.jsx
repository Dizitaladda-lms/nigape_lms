import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import BlogShell from "@/components/BlogShell";
import { getBaseUrl } from "@/lib/base-url";
import { getBlogListing, OFFICIAL_CATEGORIES } from "@/lib/blogs";
import "@/styles/blog.css";

export const metadata = {
  title: "Generative AI & Prompt Engineering Blog | NIGAPE",
  description:
    "Explore Generative AI and Prompt Engineering guides, trends, tools, tutorials, and career insights from NIGAPE, built for practical AI learning.",
  keywords: [
    "generative AI trends 2026",
    "prompt engineering techniques",
    "how to write prompts for AI",
    "generative AI use cases",
    "prompt engineering tools",
    "LLM prompting best practices",
    "AI prompt templates",
    "prompt engineering examples",
    "generative AI applications",
    "career in prompt engineering",
  ],
  alternates: {
    canonical: "https://www.nigape.com/blog",
  },
  openGraph: {
    title: "Generative AI & Prompt Engineering Blog | NIGAPE",
    description:
      "Practical Generative AI and Prompt Engineering guides, tools, tutorials, use cases, and career insights from NIGAPE.",
    url: "https://www.nigape.com/blog",
    type: "website",
  },
};

export default async function BlogPage({ searchParams }) {
  const params = (await searchParams) || {};
  const resolvedParams = { ...params };
  const page = Number(resolvedParams.page) || 1;
  const searchQuery = resolvedParams.search || "";
  const currentCategory = (resolvedParams.category || resolvedParams.tag || "").trim();
  const baseUrl = await getBaseUrl();

  let data;
  try {
    data = await getBlogListing({
      page,
      search: searchQuery,
      category: currentCategory,
      limit: 18,
      useCache: true,
    });
  } catch (error) {
    console.error("Error fetching blog listing:", error);
    data = { data: [], pagination: { page: 1, totalPages: 1, limit: 18, total: 0 } };
  }

  const blogs = data?.data || [];
  const hasFilters = Boolean(searchQuery || currentCategory);
  const gridBlogs = blogs;
  const totalArticles = data?.pagination?.total ?? blogs.length;

  return (
    <BlogShell>
      <main id="main-content" className="blog-index blog-index--simple" role="main">
        {/* Simple Header (Matching nidads.com) */}
        <header className="blog-simple-header">
          <div className="blog-simple-header__top">
            <p className="blog-index__eyebrow">
              <span className="blog-index__eyebrow-dot" />
              Stories &amp; Updates
            </p>
          </div>

          <h1>
            Insights that move{" "}
            <span className="blog-index__hero-accent">Generative AI forward</span>
          </h1>

          <p className="blog-simple-header__sub">
            Explore our latest articles, guides, and practical industry insights on Generative AI and Prompt Engineering.
          </p>

          <div className="blog-index__hero-tags">
            <Link href="/blog?category=Gen%20AI" className="blog-index__hero-tag">🤖 Gen AI</Link>
            <Link href="/blog?category=Prompt%20Engineering" className="blog-index__hero-tag">⚡ Prompt Engineering</Link>
            <Link href="/blog?category=Machine%20Learning" className="blog-index__hero-tag">🧠 Machine Learning</Link>
            <Link href="/blog?category=Career%20and%20Course" className="blog-index__hero-tag">🎓 Career &amp; Course</Link>
            <Link href="/blog?category=Tools%20and%20Resources" className="blog-index__hero-tag">🛠️ Tools &amp; Resources</Link>
          </div>

          <div className="blog-simple-controls">
            <form
              className="blog-simple-search"
              role="search"
              aria-label="Blog search"
              action="/blog"
              method="GET"
            >
              {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
              <input
                type="search"
                placeholder="Search articles…"
                aria-label="Search blog posts"
                name="search"
                defaultValue={searchQuery}
              />
              <button type="submit">Search</button>
            </form>

            <nav className="blog-cat-bar" aria-label="Filter by category">
              <Link
                className={`blog-cat-pill ${!currentCategory ? "blog-cat-pill--active" : ""}`}
                href="/blog"
              >
                All
              </Link>
              {OFFICIAL_CATEGORIES.map((cat) => {
                const isActive = cat.toLowerCase() === currentCategory.toLowerCase();
                return (
                  <Link
                    key={cat}
                    className={`blog-cat-pill ${isActive ? "blog-cat-pill--active" : ""}`}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        {/* Filter Chip (if filtered) */}
        {hasFilters && (
          <div className="blog-filter-bar">
            <span className="blog-filter-chip">
              Filtering by: <strong>{currentCategory || searchQuery}</strong>
              <Link href="/blog" className="blog-filter-chip__clear" aria-label="Clear filter">
                ×
              </Link>
            </span>
          </div>
        )}

        {/* 3-Column Blog Grid (Matching nidads.com) */}
        {gridBlogs.length > 0 ? (
          <div className="blog-grid blog-grid--three-col">
            {gridBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} baseUrl={baseUrl} />
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <div className="blog-empty__icon">🔍</div>
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p>Try searching with another keyword or explore all topics.</p>
            <Link href="/blog" className="blog-empty__reset">
              Clear all filters
            </Link>
          </div>
        )}

        {/* Pagination (Matching nidads.com) */}
        {data?.pagination?.totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            {data.pagination.page > 1 && (
              <Link
                href={`/blog?${(() => {
                  const p = new URLSearchParams(resolvedParams);
                  p.set("page", String(data.pagination.page - 1));
                  return p.toString();
                })()}`}
                className="pagination__link"
                aria-label="Previous page"
              >
                ←
              </Link>
            )}
            {Array.from({ length: data.pagination.totalPages }).map((_, i) => {
              const n = i + 1;
              const isActive = n === data.pagination.page;
              const p = new URLSearchParams(resolvedParams);
              p.set("page", n.toString());
              return (
                <Link
                  key={n}
                  href={`/blog?${p.toString()}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`pagination__link ${isActive ? "pagination__link--active" : ""}`}
                >
                  {n}
                </Link>
              );
            })}
            {data.pagination.page < data.pagination.totalPages && (
              <Link
                href={`/blog?${(() => {
                  const p = new URLSearchParams(resolvedParams);
                  p.set("page", String(data.pagination.page + 1));
                  return p.toString();
                })()}`}
                className="pagination__link"
                aria-label="Next page"
              >
                →
              </Link>
            )}
          </nav>
        )}
      </main>
    </BlogShell>
  );
}
