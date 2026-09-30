'use client';
import Image from 'next/image';
import Link from 'next/link';
import Homsection7 from '@/Homesections/Homesection7';
import {
  BadgeCheck,
  BookOpenText,
  BriefcaseBusiness,
  ChevronDown,
  FolderKanban,
  MonitorSmartphone,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Accordion from './Accordion';
import { courses as allCourses } from '@/Data/data';
import 'swiper/css';
import 'swiper/css/pagination';

function CourseFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: "What is NIGAPE?", a: "NIGAPE is India's first dedicated Generative AI and Prompt Engineering institute with project-first training for students, graduates, and professionals." },
    { q: "Who can join this course?", a: "Anyone from Class 12 students to working professionals and career switchers can join. We provide beginner and advanced tracks." },
    { q: "Do I need coding experience?", a: "No. We have beginner-friendly pathways and guided labs for non-coders, plus advanced tracks for technical learners." },
    { q: "Will I get placement support?", a: "Yes. We provide resume refinement, mock interviews, project reviews, and role guidance for AI opportunities." },
    { q: "Is the course available online?", a: "Yes. Courses are available in hybrid mode — you can attend from our Delhi campus or join live online cohorts." },
    { q: "What certificate will I receive?", a: "Upon successful completion you receive an industry-recognised NIGAPE certificate." },
  ];
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-800 rounded-xl overflow-hidden hover:border-[#FF40EB]/50 transition-all duration-300">
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full px-6 py-4 text-left flex items-center justify-between bg-black hover:bg-[#FF40EB]/5 transition-colors duration-200">
            <span className="text-white font-semibold pr-4">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#FF40EB]' : 'text-gray-400'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-800">
              <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const CoursePage = ({ course }) => {
  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Course not found
      </div>
    );
  }

  // Map course title to image filename in public/coursegraphic/
  const courseGraphicMap = {
    "Diploma in Generative AI & Prompt Engineering": "/coursegraphic/21.webp",
    "Advanced Generative AI & Prompt Engineering": "/coursegraphic/13.webp",
    "Advanced Certification in Generative AI & Prompt Engineering": "/coursegraphic/14.webp",
    "AI Literacy for Everyone": "/coursegraphic/19.webp",
    "Generative AI for Professionals": "/coursegraphic/16.webp",
    "NLP Professional": "/coursegraphic/15.webp",
    "Computer Vision Professional": "/coursegraphic/20.webp",
    "Deep Learning Professional": "/coursegraphic/17.webp"
  };
  const courseGraphic = courseGraphicMap[course.title];
  const imageSrc = courseGraphic || course.image || "https://via.placeholder.com/600x300?text=Course+Image";
  const displayTitle = course.slug === "advanced-generative-ai-prompt-engineering"
    ? `${course.title} Course`
    : course.title;
  const testimonials = [
    {
      quote: "I joined NIGAPE's Generative AI and Prompt Engineering diploma after Class 12. Within 3 months I built my first AI support bot, portfolio website, and prompt library. The mentors made AI learning practical from day one.",
      name: 'Rohit Sharma',
      role: 'Class 12 Graduate',
      img: 'https://i.pravatar.cc/80?img=1',
      program: 'GenAI Diploma',
      outcome: 'Built AI bot + portfolio in the first quarter',
    },
    {
      quote: "As a working professional in marketing, I used NIGAPE to transition into AI automation consulting. The live Prompt Engineering classes, weekend support, and project reviews helped me switch roles with confidence.",
      name: 'Priya Verma',
      role: 'Working Professional',
      img: 'https://i.pravatar.cc/80?img=2',
      program: 'AI for Professionals',
      outcome: 'Moved from marketing to AI automation consulting',
    },
    {
      quote: "The best part of NIGAPE was the project-first structure. I completed six real Generative AI projects, practiced interviews, and learned how to present prompt engineering work clearly to hiring teams.",
      name: 'Vikram Nair',
      role: 'Software Engineer',
      img: 'https://i.pravatar.cc/80?img=6',
      program: 'Advanced GenAI',
      outcome: 'Created 6 portfolio-ready AI projects',
    },
    {
      quote: "After completing the Advanced Generative AI program, I got hired as a Prompt Engineer at a Delhi-based SaaS startup. The resume review, mock interviews, and capstone feedback made a direct difference.",
      name: 'Deepika Reddy',
      role: 'Prompt Engineer',
      img: 'https://i.pravatar.cc/80?img=9',
      program: 'Career Outcome',
      outcome: 'Landed a Prompt Engineer role after completion',
    },
    {
      quote: "NIGAPE changed how I think about AI. It was not just theory. We worked on RAG pipelines, agent workflows, prompt testing, and business use-cases that I now apply in my product role every week.",
      name: 'Karan Malhotra',
      role: 'Product Manager',
      img: 'https://i.pravatar.cc/80?img=11',
      program: 'Professional Track',
      outcome: 'Applied RAG and AI workflow design at work',
    },
    {
      quote: "I had zero coding background, but NIGAPE's AI Literacy and guided labs made LLMs, prompting, and AI tools easy to understand. In under two months I was confidently using AI for presentations and college work.",
      name: 'Simran Kaur',
      role: 'BBA Student',
      img: 'https://i.pravatar.cc/80?img=5',
      program: 'AI Literacy',
      outcome: 'Went from non-technical to confident AI user',
    },
    {
      quote: "I was looking for an AI course in Delhi with live mentorship, real projects, and placement help. NIGAPE delivered all three. The feedback cycles and peer reviews pushed me to build better GenAI applications.",
      name: 'Ankit Mehra',
      role: 'B.Tech Student',
      img: 'https://i.pravatar.cc/80?img=3',
      program: 'Offline + Live Cohort',
      outcome: 'Improved project quality through mentor feedback',
    },
    {
      quote: "Coming from a non-tech background, I needed a structured Prompt Engineering institute that explained concepts in business language. NIGAPE helped me understand AI strategy, prompt design, and automation thinking clearly.",
      name: 'Neha Srivastava',
      role: 'Business Analyst',
      img: 'https://i.pravatar.cc/80?img=16',
      program: 'Prompt Engineering',
      outcome: 'Applied AI strategy in client and internal workflows',
    },
    {
      quote: "The hybrid model worked perfectly for me. I attended online classes, submitted weekly AI assignments, and still got personalised guidance. It felt like a serious career program rather than a recorded course bundle.",
      name: 'Aisha Khan',
      role: 'Career Switcher',
      img: 'https://i.pravatar.cc/80?img=20',
      program: 'Hybrid Learning',
      outcome: 'Built consistency with live classes and weekly reviews',
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-black text-white font-pixel">
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content — Left 2/3 */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Section */}
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-[#FF40EB]/50 bg-gradient-to-br from-gray-900 to-black">
                  <Image
                    src={imageSrc}
                    alt={course.title}
                    width={1200}
                    height={600}
                    quality={90}
                    className="w-full h-auto object-contain min-h-[180px] max-h-[320px] sm:min-h-[220px] sm:max-h-[400px] md:min-h-[260px] md:max-h-[500px] lg:min-h-[320px] lg:max-h-[600px]"
                    priority
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}
                </div>
                <div className="mt-[-12px] sm:mt-0 space-y-2">
                  <span className="inline-block px-3 py-1 bg-[#FF40EB]/20 text-[#FF40EB] rounded-full text-sm">
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)} • {course.mode || "Hybrid Learning"}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF40EB] to-[#FF40EB] text-transparent bg-clip-text">
                    {displayTitle}
                  </h1>
                  <p className="text-gray-300 mt-2">{course.description}</p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>{course.duration}</span>
                <span className="text-gray-600">·</span>
                <span>{course.students.toLocaleString()} students</span>
                <span className="text-gray-600">·</span>
                <span className="text-yellow-400">{course.rating} ★ rating</span>
              </div>

              {/* What You’ll Learn */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#FF40EB]">What You’ll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FF40EB] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* CURRICULUM — ENHANCED WITH ACCORDION DROPDOWN */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#FF40EB]">Curriculum</h2>
                <Accordion modules={course.modulesByMonth} />
              </section>


              {/* Instructor */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#FF40EB]">Instructor</h2>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF40EB]">
                    <Image
                      src='/shagun.png'
                      alt={course.instructor.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{course.instructor.name}</h3>
                    <p className="text-[#FF40EB] text-sm">{course.instructor.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{course.instructor.bio}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {course.instructor.credentials.map((cred, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-[#FF40EB]/20 rounded"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Includes */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#FF40EB]">This Course Includes</h2>
                <div className="flex flex-wrap gap-2">
                  {course.includes.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#FF40EB]/20 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky Sidebar Card — Right 1/3 (Desktop only) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 hidden lg:block">
                <div className="bg-black/30 backdrop-blur-sm border border-[#FF40EB]/40 rounded-2xl p-6 space-y-5">
                  {/* Small Course Image */}
                  <div className="relative rounded-xl overflow-hidden ">
                    <Image
                      src={imageSrc}
                      alt={course.title}
                      width={300}
                      height={180}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#FF40EB]">Course Info</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Level</span>
                      <span className="text-white capitalize">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mode</span>
                      <span className="text-white">{course.mode || "Hybrid Learning"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Students</span>
                      <span className="text-white">{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating</span>
                      <span className="text-white">{course.rating} ★</span>
                    </div>
                  </div>

                  <Link href="?enroll=1" className="w-full py-3 mt-2 bg-gradient-to-r from-[#FF40EB] to-[#FF40EB] rounded-lg font-bold text-black hover:opacity-90 transition-opacity flex items-center justify-center">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── WHAT YOU WILL GAIN ── */}
        <section className="bg-black py-16 px-4 sm:px-6 border-t border-[#FF40EB]/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-[#FF40EB] to-[#9234eb] bg-clip-text text-transparent">
                What You Will Gain
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                At NIGAPE, you move beyond theory and graduate with measurable outcomes:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              {[
                { keyword: "Skills", description: "Master Generative AI, Prompt Engineering, LLM workflows, automation, and deployment through structured, mentor-led projects." },
                { keyword: "Confidence", description: "Build confidence by solving real business use-cases from startups, agencies, and operations teams." },
                { keyword: "Exposure", description: "Work in sprint-based cohorts, get feedback from industry mentors, and build a portfolio that demonstrates practical prompt engineering outcomes." },
                { keyword: "Clarity & Readiness", description: "Get career counseling, resume feedback, and interview prep tailored for AI roles hiring across India and remote teams." },
              ].map((item, i) => (
                <div key={i} className="group flex flex-col border-l-4 border-[#FF40EB] pl-6 hover:border-pink-700 transition-all duration-300">
                  <h3 className="text-2xl md:text-3xl font-black mb-3 text-[#FF40EB] group-hover:text-pink-700 transition-colors">{item.keyword}</h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="?enroll=1" className="inline-block px-8 py-4 bg-[#FF40EB] hover:bg-pink-600 text-white font-bold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-[#FF40EB]/30 transform hover:-translate-y-0.5">
                Enroll Now
              </Link>
            </div>
          </div>
        </section>

        {/* ── RECOMMENDED COURSES ── */}
        <section className="bg-black py-16 px-4 sm:px-6 border-t border-[#FF40EB]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
              Recommended <span className="text-[#FF40EB]">Courses</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-4xl">
              {allCourses.filter(c => c.id !== course.id).slice(0, 3).map((rec) => {
                const recImg = courseGraphicMap[rec.title] || rec.image || "https://via.placeholder.com/600x300?text=Course";
                const highlights = (rec.whatYouWillLearn?.length ? rec.whatYouWillLearn : rec.topics || []).slice(0, 2);
                return (
                  <Link key={rec.id} href={`/courses/${rec.slug}`} className="group block h-full bg-black/40 border border-[#FF40EB]/20 rounded-2xl overflow-hidden hover:border-[#FF40EB]/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,64,235,0.16)]">
                    <div className="relative aspect-video bg-black p-2">
                      <img src={recImg} alt={rec.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                    </div>
                    <div className="flex h-full flex-col p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em]">
                        <span className="text-[#FF40EB]">{rec.level || "Course"}</span>
                        <span className="text-gray-400">{rec.duration}</span>
                      </div>
                      <h3 className="mt-4 text-white font-bold text-lg leading-snug min-h-[56px] line-clamp-2">{rec.title}</h3>
                      <p className="mt-3 text-gray-400 text-sm leading-6 line-clamp-4 min-h-[96px]">{rec.fullDescription || rec.description}</p>

                      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                        <div>
                          <p className="text-gray-500 uppercase tracking-[0.16em]">Mode</p>
                          <p className="mt-1 text-white">{rec.mode || "Hybrid"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase tracking-[0.16em]">Rating</p>
                          <p className="mt-1 text-white">{rec.rating} / 5</p>
                        </div>
                      </div>

                      {highlights.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {highlights.map((item) => (
                            <div key={item} className="flex items-start gap-2 text-sm text-gray-300 leading-5">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF40EB] shrink-0" aria-hidden="true" />
                              <span className="line-clamp-2">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <span className="mt-5 text-[#FF40EB] text-sm font-semibold group-hover:underline">View Course →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ADVANTAGES OF JOINING US ── */}
        <section className="bg-black py-16 px-4 sm:px-6 border-t border-[#FF40EB]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
              Why Join <span className="text-[#FF40EB]">NIGAPE</span>?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Industry-Aligned Curriculum",
                  desc: "Built with real AI hiring needs in mind — not just theory.",
                  icon: BookOpenText,
                },
                {
                  title: "1-on-1 Mentor Support",
                  desc: "Get personal guidance from experienced AI practitioners.",
                  icon: UsersRound,
                },
                {
                  title: "Career & Placement Help",
                  desc: "Resume reviews, mock interviews, and job-readiness coaching.",
                  icon: BriefcaseBusiness,
                },
                {
                  title: "Project-First Learning",
                  desc: "Build a portfolio of 6+ real AI projects before you graduate.",
                  icon: FolderKanban,
                },
                {
                  title: "Campus + Online Modes",
                  desc: "Attend from our Delhi campus or join live online cohorts.",
                  icon: MonitorSmartphone,
                },
                {
                  title: "Recognised Certificate",
                  desc: "Industry-recognised certification upon completion.",
                  icon: BadgeCheck,
                },
              ].map((item, i) => (
                <div key={i} className="bg-black/40 border border-[#FF40EB]/20 rounded-2xl p-6 hover:border-[#FF40EB]/60 transition-all duration-300">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF40EB]/25 bg-[#FF40EB]/10 text-[#FF40EB]">
                    <item.icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="bg-black py-16 px-4 sm:px-6 border-t border-[#FF40EB]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
              Our <span className="text-[#FF40EB]">Campus & Learning Environment</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["/Nigapepic/1.webp","/Nigapepic/2.webp","/Nigapepic/3.webp","/Nigapepic/4.webp","/Nigapepic/5.webp","/Nigapepic/6.webp"].map((src, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-video group border border-[#FF40EB]/20">
                  <img
                    src={src}
                    alt={`NIGAPE campus ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="bg-black py-16 px-4 sm:px-6 border-t border-[#FF40EB]/10">
          <div className="max-w-7xl mx-auto">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                What Our <span className="text-[#FF40EB]">Students Say</span>
              </h2>
              <p className="mt-4 text-sm md:text-base leading-7 text-gray-400">
                Real student reviews from our Generative AI, Prompt Engineering, AI Literacy, and career-focused training cohorts at NIGAPE across classroom and online learning modes.
              </p>
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="pb-12"
              aria-label="Student testimonials carousel"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={`${t.name}-${i}`} className="!h-auto">
                  <article className="flex h-[430px] md:h-[460px] flex-col rounded-[28px] border border-white/10 bg-white p-6 shadow-[0_24px_60px_rgba(146,52,235,0.14)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#9234eb]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9234eb]">
                        <BadgeCheck size={14} aria-hidden="true" />
                        {t.program}
                      </span>
                      <span className="text-xs font-semibold text-[#9234eb]">5.0 ★ Review</span>
                    </div>

                    <div className="mt-5 text-3xl leading-none text-[#9234eb]">&ldquo;</div>

                    <p className="mt-3 flex-1 overflow-hidden text-sm leading-7 text-gray-700 line-clamp-6 md:text-[15px] md:line-clamp-7">
                      {t.quote}
                    </p>

                    <div className="mt-5 rounded-2xl border border-[#9234eb]/10 bg-[#faf5ff] p-4 min-h-[92px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9234eb]">Student Outcome</p>
                      <p className="mt-2 text-sm font-medium leading-6 text-gray-800 line-clamp-2">{t.outcome}</p>
                    </div>

                    <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                      <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ── FAQ ── */}
      
        <Homsection7 />



      </div>
    </>
  );
};

export default CoursePage;