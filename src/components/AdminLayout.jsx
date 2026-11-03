"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, BookOpenText, FileText, Globe, LayoutDashboard, PenSquare } from "lucide-react";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import "@/styles/admin.css";

const navItems = [
  { href: "/admin/blog", label: "Dashboard", icon: LayoutDashboard, match: (pathname) => pathname === "/admin/blog" },
  {
    href: "/admin/blog",
    label: "Posts",
    icon: FileText,
    match: (pathname) => pathname === "/admin/blog" || pathname.startsWith("/admin/blog/edit"),
  },
  { href: "/admin/blog/create", label: "New Post", icon: PenSquare, match: (pathname) => pathname.startsWith("/admin/blog/create") },
  { href: "/admin/seo", label: "On-Page SEO", icon: Globe, match: (pathname) => pathname.startsWith("/admin/seo") },
];

const AdminLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="admin-shell">
      <aside className="admin-nav" aria-label="Blog admin navigation">
        <div className="admin-nav__brand">
          <span className="admin-nav__brand-icon" aria-hidden="true">
            <BookOpenText size={18} />
          </span>
          <div>
            <h2>NIGAPE Admin</h2>
            <p>Blog &amp; SEO Portal</p>
          </div>
        </div>

        <nav className="admin-nav__menu">
          {navItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`admin-nav__item${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-nav__bottom">
          <AdminLogoutButton />
          <Link href="/blog" className="admin-nav__link">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to site</span>
          </Link>
        </div>
      </aside>

      <main id="main-content" className="admin-main" role="main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
