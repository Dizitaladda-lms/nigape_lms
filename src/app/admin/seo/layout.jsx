import AdminLayout from "@/components/AdminLayout";
import { requireAdminUser } from "@/lib/auth";

export const metadata = {
  title: {
    default: "On-Page SEO Manager",
    template: "%s | Admin",
  },
};

export const dynamic = "force-dynamic";

export default async function AdminSeoLayout({ children }) {
  await requireAdminUser();
  return <AdminLayout>{children}</AdminLayout>;
}
