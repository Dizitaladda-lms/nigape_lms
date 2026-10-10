export default function BlogCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="relative flex flex-col rounded-2xl overflow-hidden border border-[#9234eb]/25 bg-gradient-to-br from-[#0d0d1a] to-[#120820] h-full shadow-lg"
    >
      {/* 16:9 Cover Thumbnail Placeholder */}
      <div className="relative w-full overflow-hidden" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Meta (Date + Topic Count) */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 rounded-full skeleton-shimmer" />
          <span className="text-white/20 text-xs">·</span>
          <div className="h-3 w-14 rounded-full skeleton-shimmer" />
        </div>

        {/* Title (2 lines) */}
        <div className="space-y-1.5 pt-0.5">
          <div className="h-4.5 w-11/12 rounded-md skeleton-shimmer" />
          <div className="h-4.5 w-2/3 rounded-md skeleton-shimmer" />
        </div>

        {/* Excerpt (3 lines) */}
        <div className="space-y-1.5 flex-1 pt-1">
          <div className="h-3.5 w-full rounded skeleton-shimmer" />
          <div className="h-3.5 w-11/12 rounded skeleton-shimmer" />
          <div className="h-3.5 w-4/5 rounded skeleton-shimmer" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <div className="h-5 w-16 rounded-full skeleton-shimmer border border-[#9234eb]/20" />
          <div className="h-5 w-20 rounded-full skeleton-shimmer border border-[#9234eb]/20" />
          <div className="h-5 w-14 rounded-full skeleton-shimmer border border-[#9234eb]/20" />
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <div className="h-4 w-24 rounded skeleton-shimmer" />
        </div>
      </div>
    </article>
  );
}
