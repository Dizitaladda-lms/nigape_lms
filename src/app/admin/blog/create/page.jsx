import AdminLayout from "@/components/AdminLayout";
import BlogForm from "@/components/BlogForm";
import { requireAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function CreateBlogPage() {
  await requireAdminUser();
  return (
    <AdminLayout>
      <BlogForm />
    </AdminLayout>
  );
}
