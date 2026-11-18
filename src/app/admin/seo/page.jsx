import AdminLayout from "@/components/AdminLayout";
import { requireAdminUser } from "@/lib/auth";
import { getAllSeoEntries } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  await requireAdminUser();
  const entries = await getAllSeoEntries();

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <header className="admin-dashboard__header">
          <div>
            <p>NIGAPE Admin</p>
            <h1>On-page SEO</h1>
            <p>Current metadata for site pages and courses.</p>
          </div>
        </header>
        <div className="admin-table-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Path</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.path}>
                    <td>{entry.path}</td>
                    <td>{entry.metaTitle}</td>
                    <td>{entry.metaDescription}</td>
                    <td>{entry.isCustomized ? "Customized" : "Default"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
