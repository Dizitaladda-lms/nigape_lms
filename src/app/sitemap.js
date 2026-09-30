import { courses } from "@/Data/data";
import prisma from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.nigape.com").replace(/\/+$/, "");

  const staticEntries = [
    { route: "", priority: 1.0 },
    { route: "/about-us", priority: 1.0 },
    { route: "/courses", priority: 1.0 },
    { route: "/blog", priority: 1.0 },
    { route: "/contact-us", priority: 1.0 },
    { route: "/privacy-policy", priority: 0.5 },
    { route: "/terms-of-service", priority: 0.5 },
    { route: "/terms-and-conditions", priority: 0.5 },
    { route: "/disclaimer", priority: 0.5 },
    { route: "/sitemap.html", priority: 0.5 },
    { route: "/programs/pg-in-ai", priority: 0.8 },
    { route: "/programs/degree-in-ai", priority: 0.8 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority,
  }));

  const courseEntries = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  let blogEntries = [];
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, createdAt: true },
      orderBy: { updatedAt: "desc" },
    });

    blogEntries = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.createdAt,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Unable to load blogs for sitemap", error);
  }

  return [
    ...staticEntries,
    ...courseEntries,
    ...blogEntries,
  ];
}
