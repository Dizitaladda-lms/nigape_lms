import { notFound } from "next/navigation";
import CoursePage from "@/Courses/dynamicpage";
import { courses, getCourseBySlug } from "@/Data/data";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found | NIGAPE" };
  }

  const path = `/courses/${course.slug}`;
  return buildPageMetadata({
    path,
    defaultTitle: `${course.title} | NIGAPE`,
    defaultDescription: course.description || `Explore ${course.title} at NIGAPE.`,
    defaultCanonical: `https://www.nigape.com${path}`,
  });
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CoursePage course={course} />;
}
