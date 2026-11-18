import { notFound } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import BlogForm from "@/components/BlogForm";
import { requireAdminUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }) {
  await requireAdminUser();
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id } });

  if (!blog) {
    notFound();
  }

  return (
    <AdminLayout>
      <BlogForm initialData={blog} mode="edit" />
    </AdminLayout>
  );
}
