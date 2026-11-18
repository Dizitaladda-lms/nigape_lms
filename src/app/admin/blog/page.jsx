import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import ExportBlogsButton from "@/components/ExportBlogsButton";
import ImportBlogsButton from "@/components/ImportBlogsButton";
import prisma from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requireAdminUser();
  const blogs = await prisma.blog.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const publishedCount = blogs.filter((blog) => blog.published).length;

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <header className="admin-dashboard__header">
          <div>
            <p>NIGAPE Admin</p>
            <h1>Blog dashboard</h1>
            <p>Manage articles and publication status.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <ExportBlogsButton />
            <ImportBlogsButton />
            <Link href="/admin/blog/create" className="btn btn--primary">
              Create post
            </Link>
          </div>
        </header>

        <div className="admin-kpi-grid">
          <article className="admin-kpi-card">
            <div><h3>{blogs.length}</h3><p>Total posts</p></div>
          </article>
          <article className="admin-kpi-card">
            <div><h3>{publishedCount}</h3><p>Published</p></div>
          </article>
          <article className="admin-kpi-card">
            <div><h3>{blogs.length - publishedCount}</h3><p>Drafts</p></div>
          </article>
        </div>

        <section className="admin-table-card" aria-labelledby="admin-posts-heading">
          <div className="admin-table-card__header">
            <h2 id="admin-posts-heading">All posts</h2>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Post</th>
                  <th scope="col">Status</th>
                  <th scope="col">Updated</th>
                  <th scope="col" className="admin-table__action-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link
                        href={`/admin/blog/edit/${blog.id}`}
                        className="admin-table__title"
                      >
                        {blog.title}
                      </Link>
                      <span className="admin-table__meta">/blog/{blog.slug}</span>
                    </td>
                    <td>{blog.published ? "Published" : "Draft"}</td>
                    <td>{new Date(blog.updatedAt).toLocaleDateString("en-IN")}</td>
                    <td className="admin-table__actions">
                      <Link href={`/admin/blog/edit/${blog.id}`} className="btn btn--ghost">
                        Edit
                      </Link>
                      <DeleteBlogButton id={blog.id} title={blog.title} />
                    </td>
                  </tr>
                ))}
                {!blogs.length ? (
                  <tr>
                    <td colSpan={4}>No posts yet. Create your first post to get started.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </AdminLayout>
  );
}
