import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, GraduationCap } from "lucide-react";
import { getSitemapData } from "@/lib/sitemap-data";

export const dynamic = "force-dynamic";

const sectionIcons = [FileText, GraduationCap, BookOpen];

export default async function SitemapPage() {
  const { sections } = await getSitemapData();
  const totalLinks = sections.reduce((total, section) => total + section.links.length, 0);

  return (
    <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 border-b border-[#FF40EB]/20 pb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#FF40EB]">
            NIGAPE · Explore
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Website Sitemap</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
                Browse all public pages, AI programs, courses, and articles from NIGAPE in one place.
              </p>
            </div>
            <Link
              href="/sitemap.xml"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FF40EB]/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#FF40EB] hover:bg-[#FF40EB]/10 hover:text-[#FF40EB]"
            >
              View XML sitemap <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {totalLinks} pages · Automatically updated with published articles
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section, sectionIndex) => {
            const Icon = sectionIcons[sectionIndex];

            return (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="flex items-center gap-3 text-xl font-semibold">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF40EB]/10 text-[#FF40EB]">
                      <Icon className="h-5 w-5" />
                    </span>
                    {section.title}
                  </h2>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {section.links.length}
                  </span>
                </div>

                <ul className="divide-y divide-white/[0.07]">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="group flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-gray-200 transition group-hover:text-[#FF40EB]">
                            {link.title}
                          </span>
                          <span className="mt-1 block truncate font-mono text-xs text-gray-500">
                            {link.path}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition group-hover:text-[#FF40EB]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
