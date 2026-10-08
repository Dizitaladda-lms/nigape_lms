// pages/index.js
import Image from "next/image";
import Homee from "@/Homesections/Homee";
import HomeSection1 from "@/Homesections/Homesection1";
import HomeSection2 from "@/Homesections/Homesection2";
import HomeSection3 from "@/Homesections/Homesection3";
import HomeSection4 from "@/Homesections/Homesection4";
import HomeSection5 from "@/Homesections/Homesection5";
import HomeSection6 from "@/Homesections/Homesection6";
import Homesection1_1 from "@/Homesections/Homesection1_1";
// import Homesection0_1 from "@/Homesections/Homesection0_1";
import Homesection7 from "@/Homesections/Homesection7";
import Skills from "../Homesections/skills"
import HomesectionPGP from "@/Homesections/HomesectionPGP";
import HomesectionPG from "@/Homesections/HomesectionPG";
import PopularDiplomaCourses from "@/Homesections/PopularDiplomaCourses";

export const metadata = {
  title: "Generative AI & Prompt Engineering Course in Delhi | NIGAPE",
  description:
    "Join NIGAPE for Generative AI & Prompt Engineering in Delhi. Learn AI tools, LLMs, prompting, agents and real projects with mentor support.",
  keywords: [
    "generative AI course in Delhi",
    "prompt engineering course in Delhi",
    "generative AI and prompt engineering course",
    "generative AI certification course",
    "prompt engineering certification",
    "best generative AI course in Delhi",
    "generative AI training in Delhi",
    "AI prompt engineering course",
    "generative AI course with placement",
    "generative AI institute in Delhi",
  ],
  alternates: {
    canonical: "https://www.nigape.com/",
  },
  openGraph: {
    title: "Generative AI & Prompt Engineering Course in Delhi | NIGAPE",
    description:
      "Learn Generative AI and Prompt Engineering in Delhi through mentor-led projects, certification, and placement-focused training at NIGAPE.",
    url: "https://www.nigape.com/",
    type: "website",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://www.nigape.com/#organization",
      "name": "NIGAPE",
      "alternateName": [
        "National Institute of Generative AI & Prompt Engineering",
        "NIGAPE GK2 Delhi"
      ],
      "url": "https://www.nigape.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.nigape.com/#logo",
        "url": "https://www.nigape.com/Nigapepic/nigape.svg",
        "caption": "NIGAPE Logo"
      },
      "image": "https://www.nigape.com/Nigapepic/nigape1.png",
      "description": "India-first institute dedicated to Generative AI and Prompt Engineering careers, offering mentor-led, project-based diploma, degree and postgraduate programs in Delhi and online.",
      "slogan": "Build Your AI Career in GenAI & Prompt Engineering",
      "telephone": "+91-7428114918",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "GK2",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "City", "name": "Delhi" },
        { "@type": "Country", "name": "India" }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-7428114918",
          "contactType": "admissions",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"],
          "url": "https://www.nigape.com/contact-us"
        }
      ],
      "knowsAbout": [
        "Generative AI",
        "Prompt Engineering",
        "Large Language Models",
        "AI Agents",
        "Retrieval-Augmented Generation",
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision",
        "AI Automation"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381/",
        "https://www.instagram.com/nigape.official/"
      ],
      "hasOfferCatalog": { "@id": "https://www.nigape.com/#course-catalog" }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.nigape.com/#website",
      "url": "https://www.nigape.com/",
      "name": "NIGAPE",
      "description": "Generative AI & Prompt Engineering Course in Delhi",
      "inLanguage": "en-IN",
      "publisher": { "@id": "https://www.nigape.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.nigape.com/#webpage",
      "url": "https://www.nigape.com/",
      "name": "Generative AI & Prompt Engineering Course in Delhi | NIGAPE",
      "description": "Join NIGAPE for Generative AI & Prompt Engineering in Delhi. Learn AI tools, LLMs, prompting, agents and real projects with mentor support.",
      "inLanguage": "en-IN",
      "isPartOf": { "@id": "https://www.nigape.com/#website" },
      "about": { "@id": "https://www.nigape.com/#organization" },
      "primaryImageOfPage": { "@id": "https://www.nigape.com/#logo" },
      "breadcrumb": { "@id": "https://www.nigape.com/#breadcrumb" },
      "mainEntity": { "@id": "https://www.nigape.com/#course-catalog" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.nigape.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.nigape.com/"
        }
      ]
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://www.nigape.com/#navigation",
      "name": ["Home", "About", "Courses", "Blogs", "Contact"],
      "url": [
        "https://www.nigape.com/",
        "https://www.nigape.com/about-us",
        "https://www.nigape.com/courses",
        "https://www.nigape.com/blog",
        "https://www.nigape.com/contact-us"
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://www.nigape.com/#course-catalog",
      "name": "NIGAPE Programs",
      "itemListElement": [
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/diploma-in-generative-ai-prompt-engineering#course",
          "name": "Diploma in Generative AI & Prompt Engineering",
          "description": "Perfect for beginners, 12th-pass students, and career switchers. Build strong foundations in AI/ML, Python, prompt engineering, LLMs, RAG, and hands-on projects in text, vision, and multimodal AI with portfolio and placement support.",
          "url": "https://www.nigape.com/courses/diploma-in-generative-ai-prompt-engineering",
          "image": "https://www.nigape.com/coursegraphic/21.webp",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "educationalLevel": "Beginner",
          "inLanguage": "en",
          "timeRequired": "P12M",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/ai-literacy-for-everyone#course",
          "name": "AI Literacy for Everyone",
          "description": "No coding required. Learn essential AI concepts, practical prompting, and real-world applications for students and non-tech professionals.",
          "url": "https://www.nigape.com/courses/ai-literacy-for-everyone",
          "image": "https://www.nigape.com/coursegraphic/19.webp",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "educationalLevel": "Beginner",
          "inLanguage": "en",
          "timeRequired": "P1M15D",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/generative-ai-for-professionals#course",
          "name": "Generative AI for Professionals",
          "description": "Practical GenAI skills for working professionals. Learn to apply generative AI in business: text, image, data analysis, automation, and decision-making.",
          "url": "https://www.nigape.com/courses/generative-ai-for-professionals",
          "image": "https://www.nigape.com/coursegraphic/16.webp",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "educationalLevel": "Intermediate",
          "inLanguage": "en",
          "timeRequired": "P4M",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/advanced-generative-ai-prompt-engineering#course",
          "name": "Advanced Generative AI & Prompt Engineering",
          "description": "Advanced 6-month program in Generative AI and Prompt Engineering at NIGAPE, with mentor-led projects, LLM workflows and career support.",
          "url": "https://www.nigape.com/courses/advanced-generative-ai-prompt-engineering",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "educationalLevel": "Advanced",
          "inLanguage": "en",
          "timeRequired": "P6M",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/advanced-certification-in-generative-ai-prompt-engineering#course",
          "name": "Advanced Certification in Generative AI & Prompt Engineering",
          "description": "Advanced certification program in Generative AI and Prompt Engineering at NIGAPE, built around hands-on projects and mentor support.",
          "url": "https://www.nigape.com/courses/advanced-certification-in-generative-ai-prompt-engineering",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "educationalLevel": "Advanced",
          "inLanguage": "en",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/nlp-professional#course",
          "name": "NLP Professional",
          "description": "Professional program in Natural Language Processing at NIGAPE, covering language models and practical NLP projects.",
          "url": "https://www.nigape.com/courses/nlp-professional",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "teaches": "Natural Language Processing",
          "inLanguage": "en",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/computer-vision-professional#course",
          "name": "Computer Vision Professional",
          "description": "Professional program in Computer Vision at NIGAPE, with hands-on image and vision AI projects.",
          "url": "https://www.nigape.com/courses/computer-vision-professional",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "teaches": "Computer Vision",
          "inLanguage": "en",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "Course",
          "@id": "https://www.nigape.com/courses/deep-learning-professional#course",
          "name": "Deep Learning Professional",
          "description": "Professional program in Deep Learning at NIGAPE, covering neural networks and applied AI projects.",
          "url": "https://www.nigape.com/courses/deep-learning-professional",
          "provider": { "@id": "https://www.nigape.com/#organization" },
          "teaches": "Deep Learning",
          "inLanguage": "en",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"]
          }
        },
        {
          "@type": "EducationalOccupationalProgram",
          "name": "Degree Programs in Artificial Intelligence (UG, 3 Years)",
          "description": "A full 3-year university degree combining real AI skills, campus life, industry trips, and placement support, offered with DU SOL or Jain University.",
          "url": "https://www.nigape.com/programs/degree-in-ai",
          "timeToComplete": "P3Y",
          "educationalProgramMode": ["Onsite"],
          "provider": { "@id": "https://www.nigape.com/#organization" }
        },
        {
          "@type": "EducationalOccupationalProgram",
          "name": "Post Graduation Program in Artificial Intelligence (PG, 2 Years)",
          "description": "A research and industry-integrated 2-year PG in AI with international exposure, deep specialisations, and placement support, offered with DU SOL or Manipal University.",
          "url": "https://www.nigape.com/programs/pg-in-ai",
          "timeToComplete": "P2Y",
          "educationalProgramMode": ["Onsite"],
          "provider": { "@id": "https://www.nigape.com/#organization" }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.nigape.com/#faq",
      "isPartOf": { "@id": "https://www.nigape.com/#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is NIGAPE?",
          "acceptedAnswer": { "@type": "Answer", "text": "NIGAPE is an India-first institute dedicated to Generative AI and Prompt Engineering with project-first training for students, graduates, and professionals." }
        },
        {
          "@type": "Question",
          "name": "What makes NIGAPE different from other AI institutes?",
          "acceptedAnswer": { "@type": "Answer", "text": "Our curriculum is focused on real Prompt Engineering workflows, GenAI tools, sprint projects, and career mentoring instead of only theoretical lectures." }
        },
        {
          "@type": "Question",
          "name": "What kind of projects will I build?",
          "acceptedAnswer": { "@type": "Answer", "text": "You will build GenAI assistants, prompt libraries, automation workflows, chatbots, and domain projects relevant to real business use-cases." }
        },
        {
          "@type": "Question",
          "name": "Are classes available online or offline?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. NIGAPE offers hybrid learning options, so you can attend from our Delhi campus or join live online cohorts depending on the course format." }
        },
        {
          "@type": "Question",
          "name": "Will I receive a certificate after completing the course?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Students receive a NIGAPE course completion certificate after successfully finishing the program requirements, projects, and assessments where applicable." }
        },
        {
          "@type": "Question",
          "name": "Can non-technical students learn Generative AI here?",
          "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We have beginner-friendly programs designed for school students, college learners, business professionals, and career switchers with little or no technical background." }
        },
        {
          "@type": "Question",
          "name": "Will I build a portfolio during training?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our project-first structure helps students create portfolio-ready AI projects, prompt workflows, automation use-cases, and practical assignments that can be showcased to recruiters." }
        },
        {
          "@type": "Question",
          "name": "Do you provide weekend or flexible learning support?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Selected programs include flexible schedules, revision sessions, and guided support to help students and working professionals stay consistent with their learning." }
        },
        {
          "@type": "Question",
          "name": "Are the courses suitable for college students?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. NIGAPE courses are suitable for college students who want to build practical AI skills, strengthen their resumes, and start creating portfolio-ready projects early in their careers." }
        },
        {
          "@type": "Question",
          "name": "What kind of career roles can these courses help with?",
          "acceptedAnswer": { "@type": "Answer", "text": "Our training can support roles related to Prompt Engineering, AI operations, AI automation, GenAI project work, AI-assisted marketing, chatbot building, and other practical AI-focused opportunities." }
        },
        {
          "@type": "Question",
          "name": "Who can join NIGAPE courses?",
          "acceptedAnswer": { "@type": "Answer", "text": "Anyone from Class 12 students to working professionals and career switchers can join. We provide beginner and advanced tracks, with coding support where needed." }
        },
        {
          "@type": "Question",
          "name": "Do I need coding experience to start?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. We have beginner-friendly pathways and guided labs for non-coders, plus advanced tracks for technical learners." }
        },
        {
          "@type": "Question",
          "name": "Will I get placement support after the course?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide resume refinement, mock interviews, project reviews, and role guidance for opportunities across India and remote teams." }
        },
        {
          "@type": "Question",
          "name": "How long do NIGAPE courses usually last?",
          "acceptedAnswer": { "@type": "Answer", "text": "Course duration depends on the program. We offer short AI literacy courses, medium-duration professional certifications, and longer diploma programs for deeper career preparation." }
        },
        {
          "@type": "Question",
          "name": "Do the courses include live mentorship?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most NIGAPE programs include live mentor support, doubt sessions, feedback reviews, and guided assistance on assignments and portfolio work." }
        },
        {
          "@type": "Question",
          "name": "What tools and platforms will I learn during the course?",
          "acceptedAnswer": { "@type": "Answer", "text": "Depending on the course, you may work with prompting frameworks, LLM tools, chatbot builders, automation platforms, Python workflows, and real-world AI productivity tools." }
        },
        {
          "@type": "Question",
          "name": "Is NIGAPE suitable for career switchers?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many of our learners come from non-AI backgrounds and use NIGAPE to move into Prompt Engineering, AI operations, automation, and AI-assisted business roles." }
        },
        {
          "@type": "Question",
          "name": "Do I need my own laptop for the course?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. For most programs, students are expected to have access to a laptop so they can attend sessions, practice assignments, build projects, and work with AI tools independently." }
        },
        {
          "@type": "Question",
          "name": "Can working professionals join without leaving their job?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many working professionals join our programs alongside their jobs through scheduled live sessions, guided assignments, and flexible learning support depending on the course." }
        },
        {
          "@type": "Question",
          "name": "How do I choose the right NIGAPE course for my level?",
          "acceptedAnswer": { "@type": "Answer", "text": "You can choose based on your background, goals, and current experience. Beginners can start with AI literacy or foundational programs, while advanced learners can join professional or diploma tracks for deeper specialization." }
        }
      ]
    }
  ]
};

export default function Home() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Homee />
      <Homesection1_1/>
      <HomeSection1 />
      <HomesectionPGP />
      <HomesectionPG />
      <PopularDiplomaCourses />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      {/* <HomeSection6 /> */}
      <Skills/>
      <HomeSection5 />
      <Homesection7/>
    </div>
  );
}