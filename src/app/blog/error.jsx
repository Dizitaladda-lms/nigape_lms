"use client";

export default function BlogError({ error, reset }) {
  return (
    <main className="blog-error" role="alert">
      <div>
        <h1>Blogs could not be loaded</h1>
        <p>
          This deployment cannot read blog data from its configured database. For
          a subdomain deployment, check these settings in that deployment&apos;s
          environment:
        </p>
        <ol>
          <li>
            Confirm <code>DATABASE_URL</code> points to the database that contains
            your blog posts.
          </li>
          <li>
            Apply the included Prisma migration using <code>npm run db:migrate</code>
            against that same database.
          </li>
          <li>Redeploy the subdomain after the migration completes.</li>
        </ol>
        <div className="blog-error__actions">
          <button type="button" onClick={reset}>Try again</button>
          {error.digest ? (
            <small>Diagnostic reference: {error.digest}</small>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .blog-error {
          display: grid;
          min-height: 70vh;
          place-items: center;
          padding: 7rem 1rem 3rem;
          color: #172b4d;
          background: #f3f7ff;
        }
        .blog-error > div {
          width: min(100%, 36rem);
          padding: 2rem;
          border: 1px solid #d8e5fa;
          border-radius: 1.25rem;
          background: #fff;
          box-shadow: 0 12px 36px rgba(31, 68, 130, 0.08);
        }
        .blog-error h1 { margin: 0 0 0.75rem; font-size: 1.5rem; font-weight: 800; }
        .blog-error p { color: #617493; line-height: 1.6; }
        .blog-error ol { padding-left: 1.25rem; color: #617493; line-height: 1.8; }
        .blog-error code {
          padding: 0.12rem 0.35rem;
          border-radius: 0.35rem;
          color: #0757d5;
          background: #eff6ff;
          font-size: 0.9em;
        }
        .blog-error__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
        .blog-error button {
          padding: 0.65rem 1rem;
          border: 0;
          border-radius: 0.75rem;
          color: #fff;
          background: #1672f9;
          font-weight: 700;
          cursor: pointer;
        }
        .blog-error small { color: #617493; overflow-wrap: anywhere; }
      `}</style>
    </main>
  );
}
