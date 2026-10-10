"use client";

export default function BlogError({ error, reset }) {
  return (
    <main className="blog-error" role="alert">
      <div>
        <h1>Blogs could not be loaded</h1>
        <p>
          Check that this deployment uses the correct database and that its Prisma
          migrations have been applied.
        </p>
        <p className="blog-error__details">{error.message}</p>
        <button type="button" onClick={reset}>Try again</button>
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
        .blog-error__details { overflow-wrap: anywhere; font-size: 0.85rem; }
        .blog-error button {
          margin-top: 0.75rem;
          padding: 0.65rem 1rem;
          border: 0;
          border-radius: 0.75rem;
          color: #fff;
          background: #1672f9;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
