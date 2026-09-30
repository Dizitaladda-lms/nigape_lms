import React from "react";
import { notFound } from "next/navigation";
import CoursePage from "@/Courses/dynamicpage";
import { getCourseById } from "@/Data/data";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const course = getCourseById(resolvedParams?.slug);

  if (course?.slug === "diploma-in-generative-ai-prompt-engineering") {
    return {
      title: "Diploma in Generative AI & Prompt Engineering | NIGAPE",
      description:
        "Earn a Diploma in Generative AI and Prompt Engineering at NIGAPE. Learn Python, LLMs, prompting, RAG, multimodal AI, and build portfolio projects with placement support.",
      keywords: [
        "diploma in generative AI and prompt engineering",
        "generative AI diploma course",
        "generative AI diploma in Delhi",
        "prompt engineering diploma",
        "generative AI course after 12th",
        "generative AI diploma with placement",
        "advanced prompt engineering course",
        "generative AI certification Delhi",
        "LLM course with prompt engineering",
        "multimodal AI course Delhi",
      ],
      alternates: {
        canonical: "https://www.nigape.com/courses/diploma-in-generative-ai-prompt-engineering",
      },
      openGraph: {
        title: "Diploma in Generative AI & Prompt Engineering | NIGAPE",
        description:
          "Learn Python, LLMs, prompting, RAG, and multimodal AI while building portfolio projects in NIGAPE's Generative AI diploma program.",
        url: "https://www.nigape.com/courses/diploma-in-generative-ai-prompt-engineering",
        type: "website",
      },
    };
  }

  if (course?.slug === "advanced-generative-ai-prompt-engineering") {
    return {
      title: "Advanced Generative AI & Prompt Engineering | NIGAPE",
      description:
        "Master Advanced Generative AI and Prompt Engineering with agents, RAG, automation, LLMs, and real projects at NIGAPE for career-ready AI skills.",
      keywords: [
        "advanced generative AI course",
        "advanced prompt engineering course",
        "advanced generative AI course in Delhi",
        "advanced generative AI and prompt engineering course",
        "generative AI advanced certification",
        "advanced prompt engineering certification",
        "generative AI course with projects",
        "GenAI agent course",
        "RAG and prompt engineering course",
        "AI automation course with prompt engineering",
      ],
      alternates: {
        canonical: "https://www.nigape.com/courses/advanced-generative-ai-prompt-engineering",
      },
      openGraph: {
        title: "Advanced Generative AI & Prompt Engineering | NIGAPE",
        description:
          "Learn advanced LLMs, prompt engineering, AI agents, RAG, automation, and production-ready GenAI through real projects at NIGAPE.",
        url: "https://www.nigape.com/courses/advanced-generative-ai-prompt-engineering",
        type: "website",
      },
    };
  }

  return {
    title: course ? `${course.title} | NIGAPE` : "Course | NIGAPE",
    description: course?.description || "Explore Generative AI and Prompt Engineering courses at NIGAPE.",
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (slug) {
    let course = getCourseById(slug);
    if (!course) {
      const maybeNum = parseInt(slug, 10);
      if (!Number.isNaN(maybeNum)) {
        course = getCourseById(maybeNum);
      }
    }
    if (course) return <CoursePage course={course} />;
  }

  notFound();
}
