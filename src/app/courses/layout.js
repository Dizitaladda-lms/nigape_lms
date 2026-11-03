import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/courses",
    defaultTitle: "GenAI & Prompt Engineering Courses in Delhi | NIGAPE",
    defaultDescription:
      "Compare NIGAPE Generative AI and Prompt Engineering courses in Delhi, from AI literacy to advanced programs, with projects, mentorship, certification, and career support.",
    defaultCanonical: "https://www.nigape.com/courses",
  });
}

export default function CoursesLayout({ children }) {
  return children;
}
