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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "National Institute of Generative Ai + Prompt Engineering",
  "image": "https://nigape.com/Nigapepic/nigape.svg",
  "@id": "",
  "url": "https://nigape.com/",
  "telephone": "+91 74281 14918",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2 Floor, Design House Spacetime, Greater Kailash-1, Block S, Greater Kailash I, Greater Kailash, New Delhi, Delhi 110048",
    "addressLocality": "south delhi",
    "postalCode": "110048",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.54821,
    "longitude": 77.23797
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.instagram.com/nigape.official/",
    "https://in.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381"
  ]
};

export default function Home() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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