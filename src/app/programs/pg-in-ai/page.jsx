"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap, BookOpen, Users, Globe, Star, Trophy, Heart,
  MapPin, Calendar, Music, Camera, Briefcase, ChevronDown,
  ArrowRight, CheckCircle, Zap, Building2, Award, Lightbulb, Target
} from "lucide-react";

/* ─────────────────────────────────────────────── FAQ ── */
function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className="border border-gray-800 rounded-xl overflow-hidden hover:border-[#FF40EB]/50 transition-all duration-300">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 text-left flex items-center justify-between bg-black hover:bg-[#FF40EB]/5 transition-colors"
          >
            <span className="text-white font-semibold pr-4">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-[#FF40EB]" : "text-gray-400"}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-800">
              <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────── DATA ── */
const whyUs = [
  { icon: Award, title: "Post-Graduate Credential", desc: "Earn a fully recognised 2-year PG degree in Artificial Intelligence from DU SOL or Manipal University — your ticket to senior roles and PhDs." },
  { icon: Zap, title: "Research + Industry Track", desc: "Choose between a research-focused track (thesis, publications) or an industry-focused track (capstone, internship). Both lead to strong outcomes." },
  { icon: Target, title: "Specialised AI Tracks", desc: "Choose deep specialisations — GenAI Systems, Computer Vision, NLP & LLM Engineering, AI for Business, or AI Ethics & Policy." },
  { icon: Globe, title: "Global Collaboration", desc: "Participate in international AI research papers, open-source contributions, and global hackathons as part of your curriculum." },
  { icon: Lightbulb, title: "Startup Launchpad", desc: "Year 2 includes an optional startup track where you can build and pitch your own AI startup with mentorship and seed funding guidance." },
  { icon: Heart, title: "Premium Campus Culture", desc: "International business trips, research summits, leadership workshops, and a vibrant professional network." },
];

const degrees = [
  {
    color: "from-[#FF40EB]/20 to-black",
    border: "border-[#FF40EB]/40",
    badge: "Government University",
    badgeColor: "bg-[#FF40EB]/20 text-[#FF40EB]",
    logoFallback: "DU SOL",
    name: "MA / MCA (AI) — DU SOL",
    university: "University of Delhi – School of Open Learning",
    duration: "2 Years (4 Semesters)",
    mode: "Online + Campus Support",
    highlights: [
      "Fully UGC & DEB-recognised post-graduate degree",
      "Eligible for PhD admission, NET, and government PG scholarships",
      "Affordable fees with NIGAPE's advanced AI specialisation",
      "Delhi placement drives and alumni network of 300,000+ DU graduates",
    ],
  },
  {
    color: "from-[#9234eb]/20 to-black",
    border: "border-[#9234eb]/40",
    badge: "Private University",
    badgeColor: "bg-[#9234eb]/20 text-[#9234eb]",
    logoFallback: "MU",
    name: "M.Tech / MCA (AI & ML) — Manipal University",
    university: "Manipal Academy of Higher Education (MAHE)",
    duration: "2 Years (4 Semesters)",
    mode: "Online + Residency Sessions",
    highlights: [
      "NAAC A++ | Ranked among India's top 10 private universities",
      "Industry-attached curriculum with quarterly Manipal campus visits",
      "Strong international alumni network in USA, UK, Canada, and UAE",
      "Research thesis option with publication support and lab access",
    ],
  },
];

const curriculum = [
  {
    year: "Year 1 — Core PG Foundations",
    color: "border-[#FF40EB]",
    modules: [
      "Advanced Machine Learning & Statistical Learning",
      "Deep Learning Architectures (CNNs, Transformers, Diffusion)",
      "Natural Language Processing & Large Language Models",
      "Computer Vision & Multimodal AI",
      "Research Methodology & AI Ethics",
      "Semester Project: End-to-End AI System Build",
    ],
  },
  {
    year: "Year 2 — Specialisation & Launch",
    color: "border-[#9234eb]",
    modules: [
      "Advanced GenAI Systems & Agent Architectures",
      "MLOps, LLMOps & Production AI Engineering",
      "Elective Deep-Dives (choose 2 of 5 specialisation tracks)",
      "Research Thesis OR Industry Capstone Project",
      "8-Month Industry Internship / Startup Build",
      "Career Symposium & Final Dissertation",
    ],
  },
];

const campusLife = [
  { icon: Globe, title: "International Business Study Tour", desc: "A yearly 7-day tour to Singapore / Dubai / London — visiting AI research labs, fintech firms, and innovation hubs. Fully organised.", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10" },
  { icon: MapPin, title: "Bi-Weekly Industry Visits", desc: "Every two weeks, the cohort visits leading Delhi NCR companies — from AI startups to enterprise tech giants.", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10" },
  { icon: Heart, title: "Research & Social Impact Lab", desc: "Every student contributes to at least one social-impact AI project — healthcare, education, environment, or governance.", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10" },
  { icon: Trophy, title: "AI Research Summits", desc: "Present your research at internal and inter-university AI summits. Best papers get submitted to national AI conferences.", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10" },
  { icon: Music, title: "Leadership & Soft Skills Circle", desc: "Monthly leadership workshops, public speaking sessions, and professional networking dinners with industry executives.", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10" },
  { icon: Camera, title: "Startup & Entrepreneurship Club", desc: "Work with fellow PG students to ideate, prototype, and pitch real AI startups. Top teams get mentored by NIGAPE's startup advisors.", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10" },
];

const testimonials = [
  { name: "Dr. Aisha Rahman", role: "Completed MCA AI, DU SOL", avatar: "https://i.pravatar.cc/60?img=47", quote: "The international study tour to Singapore opened my mind. I met my co-founder there. We launched an AI startup 6 months after graduating." },
  { name: "Sameer Khan", role: "M.Tech AI, Manipal University", avatar: "https://i.pravatar.cc/60?img=8", quote: "I came from a non-CS background. NIGAPE's PG program gave me the depth I needed. Published a paper and got hired at ₹22L CTC." },
  { name: "Priya Joshi", role: "MA AI, DU SOL", avatar: "https://i.pravatar.cc/60?img=31", quote: "Pursuing PhD at IIT Delhi after this program. The research methodology sessions and thesis support were genuinely world-class." },
  { name: "Aryan Sen", role: "MCA AI, Manipal University", avatar: "https://i.pravatar.cc/60?img=52", quote: "The startup track in Year 2 is a masterclass in entrepreneurship. Our team built an AI SaaS tool that now has paying customers!" },
];

const faqs = [
  { q: "Who is eligible for the 2-year PG program?", a: "Any graduate (Engineering, Science, Commerce, Arts) with a bachelor's degree is eligible. DU SOL requires 50%+ in graduation. No prior coding experience needed — the program starts from where your graduation left off." },
  { q: "Can I do this alongside a job?", a: "Yes. The online-first mode is designed for working professionals. Live classes happen on evenings and weekends. Campus and industry visits are scheduled on weekends throughout the year." },
  { q: "What is the international study tour?", a: "Every registered PG student goes on a 7-day business study tour (international destination varies yearly — Singapore, Dubai, or London). You visit AI lab offices, attend panel discussions, network with global professionals, and explore career opportunities. Tour cost is included in the program fee." },
  { q: "What specialisations are available in Year 2?", a: "You can specialise in: (1) Generative AI & LLMs, (2) Computer Vision & Robotics, (3) NLP & Conversational AI, (4) AI for Business & Product, or (5) AI Ethics & Policy. Each specialisation has its own project track." },
  { q: "What postgraduate fee should I expect?", a: "DU SOL PG fees are ₹15,000–₹25,000/year. Manipal University online PG fees are ₹75,000–₹1,20,000/year. NIGAPE's program fee is separate. Full fee breakdowns are shared during counselling." },
  { q: "Is the degree valid for PhD applications abroad?", a: "Yes. DU SOL and Manipal University degrees are recognised by AIU (Association of Indian Universities) and accepted by universities in the UK, USA, Canada, and Australia for PhD applications." },
];

/* ─────────────────────────────────────────────── PAGE ── */
export default function PGInAIPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9234eb]/20 via-black to-[#FF40EB]/10 z-0" />
        <div className="absolute inset-0 z-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 15% 50%, #9234eb 0%, transparent 50%), radial-gradient(circle at 85% 20%, #FF40EB 0%, transparent 40%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#9234eb]/40 bg-[#9234eb]/10 px-4 py-2 text-sm font-semibold text-[#9234eb] mb-6">
              <Award className="h-4 w-4" />
              2-Year Post Graduation Program
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Post Graduation Program in{" "}
              <span className="bg-gradient-to-r from-[#9234eb] to-[#FF40EB] bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              A 2-year university-level PG program in AI — built for graduates who want to lead, research, or build at the frontier. With international exposure, deep specialisations, and elite placement support.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { label: "2 Years", sub: "Post-Graduate Degree" },
                { label: "2 Options", sub: "Govt + Private Univ." },
                { label: "International", sub: "Business Study Tour" },
                { label: "Research", sub: "Publication Support" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[100px]">
                  <p className="text-xl font-bold text-[#9234eb]">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="?enroll=1" className="rounded-full bg-gradient-to-r from-[#9234eb] to-[#FF40EB] px-10 py-3.5 font-bold text-white shadow-[0_0_35px_rgba(146,52,235,0.5)] hover:shadow-[0_0_55px_rgba(146,52,235,0.7)] hover:scale-105 transition text-center">
                Apply Now — Free Counselling
              </Link>
              <a href="#degrees" className="rounded-full border-2 border-[#9234eb] px-10 py-3.5 font-bold hover:bg-[#9234eb]/10 transition text-center">
                See PG Options ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PG WITH US ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="why-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9234eb] font-semibold">The NIGAPE PG Difference</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Why Choose a PG With Us?</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">This is not a regular master&apos;s program. It&apos;s an elite 2-year experience that combines rigorous academics with real industry immersion, global exposure, and personal mentorship.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#9234eb]/50 hover:bg-[#9234eb]/5 transition-all duration-300">
                <item.icon className="w-8 h-8 text-[#9234eb] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 px-4 sm:px-6 bg-black" id="gallery">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#9234eb] font-semibold">PG Life at NIGAPE</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Research. Network. Explore.</h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">Your 2 years here are packed with research, industry exposure, international travel, and the connections that define your career.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className={`relative overflow-hidden rounded-2xl border border-[#9234eb]/20 group ${n === 1 ? "col-span-2 row-span-2 h-[320px] md:h-[440px]" : "h-[160px] md:h-[210px]"}`}>
                <Image
                  src={`/Nigapepic/${n}.webp`}
                  alt={`PG campus ${n}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT PG WE PROVIDE ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="degrees">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9234eb] font-semibold">Your PG Degree Choice</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Two Post-Graduate Pathways</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">An affordable government PG degree through DU SOL, or a premium private PG degree through Manipal University — both powered by NIGAPE&apos;s AI excellence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {degrees.map((deg) => (
              <div key={deg.name} className={`rounded-2xl border ${deg.border} bg-gradient-to-b ${deg.color} p-8 hover:shadow-[0_0_60px_rgba(146,52,235,0.12)] transition-all duration-300`}>
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${deg.badgeColor}`}>
                    {deg.badge}
                  </span>
                  <span className="text-4xl font-black text-white/20">{deg.logoFallback}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{deg.name}</h3>
                <p className="text-[#9234eb] text-sm mb-1 flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> {deg.university}
                </p>
                <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {deg.duration} &nbsp;·&nbsp; {deg.mode}
                </p>

                <ul className="space-y-3 mb-8">
                  {deg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#9234eb] mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link href="?enroll=1" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9234eb] to-[#FF40EB] px-6 py-2.5 text-sm font-bold text-white hover:brightness-110 transition">
                  Apply for This Track <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section className="py-20 px-4 sm:px-6 bg-black/50" id="curriculum">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9234eb] font-semibold">2-Year Journey</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Year-by-Year Curriculum</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {curriculum.map((yr, i) => (
              <div key={yr.year} className={`rounded-2xl border ${yr.color} bg-gradient-to-b from-white/5 to-black p-8`}>
                <span className="text-xs uppercase tracking-widest text-[#9234eb]">Year {i + 1}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-6">{yr.year}</h3>
                <ul className="space-y-3">
                  {yr.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9234eb] mt-2 flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS & EXPERIENCES ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="campus-life">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#9234eb] font-semibold">Beyond Academics</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Experiences That Shape Leaders</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">From international business tours to social impact labs, your PG journey is as much about who you become as what you learn.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusLife.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#9234eb]/40 hover:bg-[#9234eb]/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Annual International Tour" },
              { label: "Research Publication Support" },
              { label: "Social Impact AI Projects" },
              { label: "Startup Launchpad Track" },
            ].map((a) => (
              <div key={a.label} className="rounded-2xl border border-[#9234eb]/20 bg-[#9234eb]/5 p-5 text-center">
                <p className="text-sm font-semibold text-white">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 sm:px-6 bg-black/50" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#9234eb] mb-12">What Our PG Graduates Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-6 shadow-xl">
                <p className="text-2xl text-[#9234eb] mb-3">&ldquo;</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">{t.quote}</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-[#9234eb] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT OUTCOMES ── */}
      <section className="py-16 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">PG Placement & Career Outcomes</h2>
          <p className="text-gray-400 mb-10">PG graduates from NIGAPE land senior roles, research positions, and global opportunities.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { stat: "₹14L–₹30L", label: "Avg. Starting CTC" },
              { stat: "98%+", label: "Placement Rate" },
              { stat: "20+", label: "Research Publications" },
              { stat: "3 Months", label: "Avg. Time to Hire" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#9234eb]/30 bg-[#9234eb]/5 p-5">
                <p className="text-2xl font-black text-[#9234eb]">{s.stat}</p>
                <p className="text-gray-400 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">Frequently Asked Questions</h2>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-[#9234eb]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Lead the Next Wave of AI.
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Book a free PG counselling session and find out which university track unlocks your research, career, or startup goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="?enroll=1" className="rounded-full bg-gradient-to-r from-[#9234eb] to-[#FF40EB] px-10 py-4 font-bold text-white shadow-[0_0_35px_rgba(146,52,235,0.5)] hover:shadow-[0_0_55px_rgba(146,52,235,0.7)] hover:scale-105 transition text-center">
              Book Free Counselling
            </Link>
            <Link href="/contact-us" className="rounded-full border-2 border-[#9234eb] px-10 py-4 font-bold hover:bg-[#9234eb]/10 transition text-center">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
