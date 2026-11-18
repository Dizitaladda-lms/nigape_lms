import AdminLoginForm from "@/components/AdminLoginForm";
import "@/styles/admin.css";

export const metadata = {
  title: "Admin Login | NIGAPE",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Administrator sign in">
        <div className="auth-card__brand">
          <p className="auth-card__eyebrow">NIGAPE Admin</p>
          <h1>Blog &amp; SEO Portal</h1>
          <p>Sign in to manage published content and site metadata.</p>
        </div>
        <div className="auth-card__form">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
