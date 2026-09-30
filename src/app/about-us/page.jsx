// app/about/page.jsx
"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Contact,
  BookOpen,
  ArrowRight,
  Lock,
  Brain,
  Zap,
  Moon,
} from "lucide-react";



const features = [
  {
    icon: <BookOpen />,
    title: "Industry-Aligned Programs",
    desc: "Co-designed with AI experts to mirror real workflows and hiring trends.",
  },
  {
    icon: <Brain />,
    title: "Hands-On Projects",
    desc: "Complete capstone AI projects reviewed in sprints like in tech companies.",
  },
  {
    icon: <Zap />,
    title: "Corporate-Style Environment",
    desc: "Classes run like professional teams with code reviews and collaborations.",
  },
  {
    icon: <Lock />,
    title: "Career-Ready Skills",
    desc: "Build an AI portfolio that stands out to employers.",
  },
];

const team = [
  {
    name: "Miss . Shagun ",
    role: "AI Expert",
    img: "/shagun.png",
    colorFrom: "#ec4899",
    colorTo: "#be123c",
  },
  {
    name: "Mr Deepanshu",
    role: "Data Analyst",
    img: "/Nigapepic/me.webp",
    colorFrom: "#f59e0b",
    colorTo: "#d97706",
  },
  {
    name: " Dr Gulshan Kumar",
    role: "Founder & CEO",
    img: "/gulshan-kumar.avif",
    colorFrom: "#06b6d4",
    colorTo: "#0e7490",
  },
 
];



/**
 * Feature Card
 */
const FeatureCard = memo(({ icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12 }}
    whileHover={{ scale: 1.04, y: -8 }}
    className="group relative bg-gray-900 bg-opacity-70 border border-purple-500 border-opacity-30 rounded-3xl p-6 md:p-8 overflow-hidden cursor-pointer backdrop-blur-xl"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
    <div className="relative z-10">
      <div className="text-5xl md:text-6xl mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base">{desc}</p>
    </div>
  </motion.div>
));

/**
 * Team Card
 */
const TeamCard = memo(({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.12 }}
    whileHover={{ scale: 1.03, y: -6 }}
    className="group"
  >
    <div className="relative mx-auto w-full max-w-xs">
      <div
        className="p-0.5 rounded-3xl shadow-2xl group-hover:shadow-purple-500/30 transition-shadow duration-500"
        style={{
          background: `linear-gradient(to bottom right, ${member.colorFrom}, ${member.colorTo})`,
        }}
      >
        <div className=" bg-gray-900 rounded-3xl px-2 py-3 md:px-3 md:py-4 h-auto flex flex-col  justify-between overflow-hidden">
          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-3 flex items-center justify-center bg-gray-900">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-contain md:object-cover object-top transition-transform duration-500 max-h-56 md:max-h-64"
              loading="lazy"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{member.name}</h3>
            <p className="text-gray-400 text-sm md:text-base">{member.role}</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

/**
 * PAGE
 */
export default function About() {
  // smooth cursor glow
  const cursorRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // scroll transforms
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  const updateCursor = useCallback(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;

    // Smooth lerp
    smoothRef.current.x += (cursorRef.current.x - smoothRef.current.x) * 0.15;
    smoothRef.current.y += (cursorRef.current.y - smoothRef.current.y) * 0.15;

    el.style.background = `radial-gradient(circle 600px at ${smoothRef.current.x}px ${smoothRef.current.y}px, rgba(139,92,246,0.14), transparent 80%)`;

    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouse);
    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Floating Cursor Glow */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle 600px at 50% 50%, rgba(139,92,246,0.12), transparent 80%)",
        }}
      />


      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-indigo-600" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-6 sm:left-20 w-56 sm:w-96 h-56 sm:h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-16 right-6 sm:right-32 w-48 sm:w-80 h-48 sm:h-80 bg-pink-600 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
        </div>

        <motion.div style={{ opacity, scale }} className="relative z-10 text-center max-w-5xl mt-16 md:mt-24 px-2">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            About NIGAPE: India's Dedicated
            <br className="hidden sm:block" />
            GenAI & Prompt Engineering Institute
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 1 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            NIGAPE is a Generative AI and Prompt Engineering institute in Delhi. Learn through campus and online cohorts, build practical AI projects with expert mentorship, and graduate with career support and a portfolio built for AI hiring teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <Link
              href="/courses"
              className="group px-8 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold text-white text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <span>Explore Our Programs</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 text-gray-400">
              <div className="flex -space-x-3">
                {[
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=faces",
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=faces",
                  "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?w=100&h=100&fit=crop&crop=faces",
                  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=faces"
                ].map((img, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-gray-900 overflow-hidden"
                  >
                    <img src={img} alt={`Student ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm sm:text-base">Join learners building practical AI careers with NIGAPE</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Real Humans Section */}
      <section className="py-16 sm:py-24 md:py-20 px-4 sm:px-6 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Built for{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                India's AI Future
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              We designed our programs around one core belief:{" "}
              <strong className="text-purple-400">India needs practical AI and Prompt Engineering talent at scale</strong> — and we're training that talent with project-driven, career-focused programs.
            </p>
            <p className="mt-4 text-sm sm:text-base text-gray-500">No textbook theories. No outdated content. Just hands-on AI projects that mirror what tech companies actually do.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl animate-pulse" />
            <div className="relative bg-gray-900 bg-opacity-70 backdrop-blur-xl border border-purple-500 border-opacity-30 rounded-3xl p-6 md:p-10 text-center">
              <div className="text-6xl md:text-9xl mb-4"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Industry-Driven Learning</h3>
              <p className="text-gray-300 text-sm md:text-base">Live projects, corporate workflows, and mentorship from top AI professionals.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 md:py-10 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-10 md:mb-16">
            What Makes NIGAPE Different
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 px-4 sm:px-6 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-transparent to-indigo-900/30" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Meet Our Expert Team
          </motion.h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8">Our mentors help learners become role-ready for GenAI teams across India.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 blur-3xl opacity-30 bg-black" />
        <div className="relative max-w-4xl mx-auto text-center z-10 px-2">
          <motion.h2
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 md:mb-8 leading-tight"
          >
            Start Your AI Career
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              With India's Best
            </span>
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link
              href="/courses"
              className="inline-block px-10 sm:px-12 md:px-16 py-3.5 sm:py-4 text-white text-lg md:text-2xl font-bold rounded-full shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <span className="relative z-10">Explore Programs</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}