import { courses } from "@/Data/data";
import prisma from "@/lib/prisma";

const staticPages = [
  { path: "/", title: "Home", priority: 1 },
  { path: "/about-us", title: "About NIGAPE", priority: 0.8 },
  { path: "/courses", title: "All Courses", priority: 0.8 },
  { path: "/blog", title: "Blog", priority: 0.8 },
  { path: "/contact-us", title: "Contact Us", priority: 0.8 },
  { path: "/programs/degree-in-ai", title: "Degree in AI", priority: 0.8 },
  { path: "/programs/pg-in-ai", title: "PG in AI", priority: 0.8 },
  { path: "/privacy-policy", title: "Privacy Policy", priority: 0.5 },
  { path: "/terms-of-service", title: "Terms of Service", priority: 0.5 },
  { path: "/terms-and-conditions", title: "Terms and Conditions", priority: 0.5 },
  { path: "/disclaimer", title: "Disclaimer", priority: 0.5 },
  { path: "/sitemap", title: "HTML Sitemap", priority: 0.5 },
];

export async function getSitemapData() {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.nigape.com").replace(/\/+$/, "");
  const generatedAt = new Date();
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { title: true, slug: true, updatedAt: true, createdAt: true },
    orderBy: { updatedAt: "desc" },
  });

  return {
    baseUrl,
    sections: [
      {
        title: "Main pages",
        links: staticPages.map((page) => ({
          ...page,
          lastModified: generatedAt,
        })),
      },
      {
        title: "Courses & programs",
        links: courses.map((course) => ({
          path: `/courses/${course.slug}`,
          title: course.title,
          priority: 0.8,
          lastModified: generatedAt,
        })),
      },
      {
        title: "Latest articles",
        links: blogs.map((blog) => ({
          path: `/blog/${blog.slug}`,
          title: blog.title,
          priority: 0.8,
          lastModified: blog.updatedAt || blog.createdAt,
        })),
      },
    ],
  };
}
