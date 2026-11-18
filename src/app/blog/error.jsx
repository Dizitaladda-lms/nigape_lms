"use client";

export default function BlogError({ reset }) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center text-white">
      <h1 className="text-2xl font-bold">Blog temporarily unavailable</h1>
      <p className="max-w-lg text-gray-300">
        We couldn&apos;t load blog content right now. Please try again shortly.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-[#FF40EB] px-5 py-2 font-semibold text-black"
      >
        Try again
      </button>
    </main>
  );
}
