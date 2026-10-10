import Link from "next/link";
import { Archive, CircleCheckBig, Clock3, FileText, PenSquare } from "lucide-react";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import ExportBlogsButton from "@/components/ExportBlogsButton";
import ExportSingleBlogButton from "@/components/ExportSingleBlogButton";
import ImportBlogsButton from "@/components/ImportBlogsButton";
import prisma from "@/lib/prisma";

const fetchBlogs = async () =>
  prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

export default async function AdminBlogPage() {
  let blogs = [];
  try {
    blogs = await fetchBlogs();
  } catch (error) {
    console.error(error);
  }

  const totalPosts = blogs.length;
  const publishedCount = blogs.filter((b) => b.published).length;
  const draftsCount = blogs.filter((b) => !b.published).length;
  const archivedCount = 0;
  const stats = [
    { label: "Total Posts", value: totalPosts, icon: FileText, tone: "total" },
    { label: "Published", value: publishedCount, icon: CircleCheckBig, tone: "published" },
    { label: "Drafts", value: draftsCount, icon: Clock3, tone: "drafts" },
    { label: "Archived", value: archivedCount, icon: Archive, tone: "archived" },
  ];

  return (
    <section className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your blog</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <ImportBlogsButton />
          <ExportBlogsButton />
          <Link href="/admin/blog/create" className="btn btn--primary admin-new-post-btn">
            <PenSquare size={18} aria-hidden="true" />
            <span>New Post</span>
          </Link>
        </div>
      </header>

      <div className="admin-kpi-grid" aria-label="Blog metrics">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.label} className={`admin-kpi-card admin-kpi-card--${item.tone}`}>
              <span className="admin-kpi-card__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <div>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            </article>
          );
        })}
      </div>

      <section className="admin-table-card" aria-label="All posts">
        <header className="admin-table-card__header">
          <h2>All Posts</h2>
        </header>

        {blogs.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col" className="admin-table__action-col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <p className="admin-table__title">{blog.title}</p>
                      <p className="admin-table__meta">/blog/{blog.slug}</p>
                    </td>
                    <td>
                      <span className={`admin-status-pill${blog.published ? "" : " admin-status-pill--draft"}`}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>{formatDate(blog.createdAt)}</td>
                    <td>
                      <div className="admin-table__actions">
                        <ExportSingleBlogButton blog={blog} />
                        <Link href={`/admin/blog/edit/${blog.id}`} className="btn btn--ghost admin-btn--sm">
                          Edit
                        </Link>
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="btn btn--ghost admin-btn--sm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </Link>
                        <DeleteBlogButton id={blog.id} title={blog.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty">No posts yet. Click New Post to publish your first article.</p>
        )}
      </section>
    </section>
  );
}
