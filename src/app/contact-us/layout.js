import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/contact-us",
    defaultTitle: "Generative AI & Prompt Engineering Course Contact | NIGAPE",
    defaultDescription:
      "Contact NIGAPE for Generative AI and Prompt Engineering courses in Delhi. Get fees, batches, syllabus, admission, registration, and career guidance from our team.",
    defaultCanonical: "https://www.nigape.com/contact-us",
  });
}

export default function ContactUsLayout({ children }) {
  return children;
}
