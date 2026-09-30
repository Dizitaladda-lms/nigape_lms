import Link from "next/link";
import Image from "next/image";
import { courses } from "@/Data/data";

function getPopularDiplomaCourses(limit = 3) {
  const diplomaFirst = courses.filter((course) => {
    const title = String(course.title || "").toLowerCase();
    const level = String(course.level || "").toLowerCase();
    const duration = String(course.duration || "").toLowerCase();

    // Prioritize true diploma-tagged records; then include long-form diploma-style courses.
    return (
      title.includes("diploma") ||
      level.includes("diploma") ||
      duration.includes("month")
    );
  });

  return diplomaFirst.slice(0, limit);
}

function getCourseImage(course) {
  const courseGraphicMap = {
    "Diploma in Generative AI & Prompt Engineering": "/coursegraphic/21.webp",
    "Advanced Generative AI & Prompt Engineering": "/coursegraphic/13.webp",
    "Advanced Certification in Generative AI & Prompt Engineering": "/coursegraphic/14.webp",
    "AI Literacy for Everyone": "/coursegraphic/19.webp",
    "Generative AI for Professionals": "/coursegraphic/16.webp",
    "NLP Professional": "/coursegraphic/15.webp",
    "Computer Vision Professional": "/coursegraphic/20.webp",
    "Deep Learning Professional": "/coursegraphic/17.webp",
  };

  return courseGraphicMap[course.title] || course.image || "https://via.placeholder.com/800x450?text=Course+Image";
}

export default function PopularDiplomaCourses() {
  const popularCourses = getPopularDiplomaCourses(3);

  if (!popularCourses.length) {
    return null;
  }

  return (
    <section className="relative px-6 py-16 bg-black text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#FF40EB]">Popular Courses</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Top Diploma Programs</h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Explore our most in-demand diploma-focused programs with project-based learning and mentorship.
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
  {popularCourses.map((course) => (
    <article
      key={course.id}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm transition hover:border-[#FF40EB]/60 hover:shadow-[0_12px_40px_rgba(255,64,235,0.18)]"
    >
      {/* Image */}
      <div className="relative w-full aspect-video bg-black">
        <Image
          src={getCourseImage(course)}
          alt={course.title}
          fill
          quality={90}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">

        {/* Badge + Duration */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF40EB]">
            Diploma Track
          </span>
          <span className="text-xs text-gray-300">{course.duration}</span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold leading-snug min-h-[56px] line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-300 line-clamp-3 min-h-[60px]">
          {course.description}
        </p>

        {/* Bottom - pinned */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>{course.mode}</span>
            <span>{course.rating} / 5</span>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="mt-4 inline-flex items-center rounded-full bg-[#FF40EB] px-5 py-2.5 text-sm font-semibold text-black transition group-hover:brightness-110"
          >
            View Course
          </Link>
        </div>

      </div>
    </article>
  ))}
</div>
      </div>
    </section>
  );
}
