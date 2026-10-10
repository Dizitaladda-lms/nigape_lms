import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import "@/styles/blog.css";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-black text-white font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ── Hero Skeleton ── */}
        <div className="relative rounded-3xl overflow-hidden border border-[#9234eb]/30 bg-gradient-to-br from-[#0d0d1a] to-[#120820] p-8 sm:p-12 mb-10 shadow-2xl">
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#9234eb]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#FF40EB]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-3">
            <div className="h-4 w-36 rounded-full skeleton-shimmer" />
            <div className="h-10 sm:h-12 w-3/4 max-w-lg rounded-xl skeleton-shimmer my-1" />
            <div className="space-y-2 max-w-xl">
              <div className="h-3.5 w-full rounded skeleton-shimmer" />
              <div className="h-3.5 w-4/5 rounded skeleton-shimmer" />
            </div>
            {/* Articles count text placeholder */}
            <div className="h-4 w-44 rounded-full skeleton-shimmer mt-3" />
          </div>
        </div>

        {/* ── Search + Filters Skeleton ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="h-11 flex-1 rounded-2xl skeleton-shimmer border border-white/10" />
        </div>

        {/* ── Tag Chips Skeleton ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-20 rounded-full skeleton-shimmer border border-[#9234eb]/20"
            />
          ))}
        </div>

        {/* ── Section Heading Skeleton ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-5 w-28 rounded-md skeleton-shimmer" />
          <div className="flex-1 h-px bg-white/10" />
          <div className="h-4 w-20 rounded-md skeleton-shimmer" />
        </div>

        {/* ── Grid Skeleton (6 cards) with min-height container ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 min-h-[700px]"
          aria-busy="true"
          aria-live="polite"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
