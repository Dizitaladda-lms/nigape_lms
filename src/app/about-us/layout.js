import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/about-us",
    defaultTitle: "Generative AI & Prompt Engineering Institute Delhi | NIGAPE",
    defaultDescription:
      "Discover NIGAPE, a Delhi institute for Generative AI and Prompt Engineering with practical projects, expert mentorship, career support, and AI programs.",
    defaultCanonical: "https://www.nigape.com/about-us",
  });
}

export default function AboutUsLayout({ children }) {
  return children;
}
