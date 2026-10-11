"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap, BookOpen, Users, Globe, Star, Trophy, Heart,
  MapPin, Calendar, Music, Camera, Smile, Briefcase, ChevronDown,
  ArrowRight, CheckCircle, Zap, Building2, Award
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
  { icon: GraduationCap, title: "University-Recognised Degree", desc: "Get a full 3-year BCA / BSc degree in Artificial Intelligence from DU SOL or our partner private university — fully recognised by UGC." },
  { icon: Zap, title: "Industry-First Curriculum", desc: "Learn GenAI, Machine Learning, Deep Learning, Computer Vision, NLP, and MLOps with real project sprints every semester." },
  { icon: Users, title: "Small Cohorts & Personal Mentors", desc: "Max 30 students per batch. Every student gets a dedicated mentor for academics, projects, and career guidance." },
  { icon: Globe, title: "Hybrid Learning Mode", desc: "Attend live campus classes in Delhi + access recorded lectures online. Study from anywhere without compromising on experience." },
  { icon: Trophy, title: "100% Placement Assistance", desc: "Resume workshops, mock interviews, internship drives, and job referrals for every graduating student." },
  { icon: Heart, title: "Vibrant Campus Culture", desc: "Weekly trips, hackathons, club activities, social impact projects, and annual outstation business tours make learning unforgettable." },
];

const degrees = [
  {
    color: "from-[#FF40EB]/20 to-black",
    border: "border-[#FF40EB]/40",
    badge: "Government University",
    badgeColor: "bg-[#FF40EB]/20 text-[#FF40EB]",
    logo: "/logos/du_sol.png",
    logoFallback: "DU SOL",
    name: "BCA / BSc (AI) — DU SOL",
    university: "University of Delhi – School of Open Learning",
    duration: "3 Years (6 Semesters)",
    mode: "Online + Campus Support",
    highlights: [
      "UGC-recognised degree from India's top central university",
      "Affordable fee structure with scholarship options",
      "Dual benefit: NIGAPE certificate + DU degree",
      "Delhi-based access to placement & networking events",
    ],
  },
  {
    color: "from-[#9234eb]/20 to-black",
    border: "border-[#9234eb]/40",
    badge: "Private University",
    badgeColor: "bg-[#9234eb]/20 text-[#9234eb]",
    logo: "/logos/jain.png",
    logoFallback: "JU",
    name: "B.Tech / BCA (AI & ML) — Jain University",
    university: "Jain (Deemed-to-be University), Bengaluru",
    duration: "3 Years (6 Semesters)",
    mode: "Online + On-Campus Residency",
    highlights: [
      "NAAC A++ accredited private university",
      "Industry-integrated curriculum with live projects",
      "Quarterly residency sessions at Bengaluru campus",
      "Strong alumni network across MNCs and startups",
    ],
  },
];

const curriculum = [
  {
    year: "Year 1 — Foundation",
    color: "border-[#FF40EB]",
    modules: [
      "Mathematics for AI & Statistics",
      "Python Programming Fundamentals",
      "Data Structures & Algorithms",
      "Introduction to Machine Learning",
      "AI Ethics & Digital Literacy",
      "GenAI Orientation & Prompt Engineering Basics",
    ],
  },
  {
    year: "Year 2 — Specialisation",
    color: "border-[#9234eb]",
    modules: [
      "Deep Learning & Neural Networks",
      "Natural Language Processing",
      "Computer Vision Fundamentals",
      "LLM Fine-tuning & RAG Pipelines",
      "MLOps & Model Deployment",
      "Industry Capstone Project (Semester 4)",
    ],
  },
  {
    year: "Year 3 — Career Launch",
    color: "border-[#FF40EB]",
    modules: [
      "Advanced Generative AI Systems",
      "AI Product Management",
      "Research Project / Thesis",
      "Internship (6 months, Industry Partner)",
      "Mock Interviews & Resume Bootcamp",
      "Graduation Capstone Presentation",
    ],
  },
];

const campusLife = [
  { icon: MapPin, title: "Weekly Campus Day Trips", desc: "Every Friday, cohorts visit Delhi's tech hubs, innovation labs, and startup offices for live exposure.", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10" },
  { icon: Globe, title: "Annual Outstation Business Tour", desc: "A 5-day yearly trip to Bengaluru / Hyderabad / Pune — visiting tech parks, AI labs, and company HQs.", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10" },
  { icon: Heart, title: "Social Impact Projects", desc: "Every semester students build an AI solution for an NGO, school, or local business — real impact, real learning.", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10" },
  { icon: Music, title: "Fun Clubs & Activities", desc: "AI Art Club, Debate Club, Film-Making with AI, Music & Tech, Gaming Guild — something for every personality.", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10" },
  { icon: Camera, title: "Content Creator Program", desc: "Students get studio access, YouTube filming workshops, and help to build their personal AI brand online.", color: "text-[#FF40EB]", bg: "bg-[#FF40EB]/10" },
  { icon: Trophy, title: "Monthly Hackathons", desc: "Internal and inter-college hackathons with prizes, networking, and direct industry exposure every month.", color: "text-[#9234eb]", bg: "bg-[#9234eb]/10" },
];

const testimonials = [
  { name: "Aryan Kapoor", role: "2nd Year, DU SOL AI", avatar: "https://i.pravatar.cc/60?img=12", quote: "The weekly trips to Delhi startups completely changed how I look at AI. Theory + real visits = actual learning." },
  { name: "Sneha Pillai", role: "3rd Year, Jain University AI", avatar: "https://i.pravatar.cc/60?img=25", quote: "The outstation business tour to Bengaluru was life-changing. I met my recruiter there and now have an internship offer at 21." },
  { name: "Rohit Batra", role: "Graduate, DU SOL AI", avatar: "https://i.pravatar.cc/60?img=33", quote: "Best decision of my life. A recognised degree + top-tier AI skills. I got placed at ₹12L CTC fresh out of college." },
  { name: "Meera Joshi", role: "2nd Year, Jain University AI", avatar: "https://i.pravatar.cc/60?img=44", quote: "The Social Impact Project in Year 2 helped me build an AI tool for a rural school. It's now being used by 300 students!" },
];

const faqs = [
  { q: "Is the degree from DU SOL valid for government jobs and higher studies?", a: "Yes. DU SOL degrees are fully UGC-recognised, eligible for UPSC / PSU / government roles, and accepted for M.Tech, MBA, and MS admissions across India and abroad." },
  { q: "What is the fee structure for the 3-year program?", a: "DU SOL track fees range from ₹15,000–₹20,000/year (university fees) plus NIGAPE's program fee. Jain University online fees range ₹50,000–₹80,000/year. EMI options and scholarships are available." },
  { q: "Do I need prior coding knowledge to join?", a: "No. Year 1 covers Python from scratch. Students from any stream (Arts, Commerce, Science) can apply after Class 12." },
  { q: "Will I get an internship during the degree?", a: "Yes. Year 3 includes a mandatory 6-month internship with NIGAPE's industry partners. We actively facilitate placements throughout the program." },
  { q: "What happens during the outstation business trip?", a: "Each year, the entire cohort visits a major tech city (Bengaluru / Hyderabad / Pune). You visit company HQs, attend networking dinners, sit in on panels, and meet alumni. All expenses are included in the program fee." },
  { q: "Can I switch between DU SOL and Jain University tracks?", a: "Due to different admission processes, switching isn't possible after enrollment. We recommend attending a counseling session to pick the right track for your goals." },
];

/* ─────────────────────────────────────────────── PAGE ── */
export default function DegreeInAIPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF40EB]/15 via-black to-[#9234eb]/10 z-0" />
        <div className="absolute inset-0 z-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #FF40EB 0%, transparent 50%), radial-gradient(circle at 80% 20%, #9234eb 0%, transparent 40%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF40EB]/40 bg-[#FF40EB]/10 px-4 py-2 text-sm font-semibold text-[#FF40EB] mb-6">
              <GraduationCap className="h-4 w-4" />
              3-Year Degree Program
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Degree Program in{" "}
              <span className="bg-gradient-to-r from-[#FF40EB] to-[#9234eb] bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
              A full 3-year university degree in AI — with real projects, campus life, industry trips, and guaranteed placement support. From DU SOL or Jain University, powered by NIGAPE.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { label: "3 Years", sub: "Full Degree" },
                { label: "2 Options", sub: "Govt + Private Univ." },
                { label: "100%", sub: "Placement Assist" },
                { label: "Delhi Based", sub: "Campus + Online" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[100px]">
                  <p className="text-xl font-bold text-[#FF40EB]">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="?enroll=1" className="rounded-full bg-[#FF40EB] px-10 py-3.5 font-bold text-white shadow-[0_0_35px_rgba(255,64,235,0.4)] hover:shadow-[0_0_55px_rgba(255,64,235,0.6)] hover:scale-105 transition text-center">
                Apply Now — Free Counselling
              </Link>
              <a href="#degrees" className="rounded-full border-2 border-[#FF40EB] px-10 py-3.5 font-bold hover:bg-[#FF40EB]/10 transition text-center">
                Explore Degree Options ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY DEGREE WITH US ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="why-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#FF40EB] font-semibold">The NIGAPE Difference</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Why Choose a Degree With Us?</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">We are not just another online course. We combine a real university degree with an industry-grade AI education and campus experiences you will talk about for life.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#FF40EB]/50 hover:bg-[#FF40EB]/5 transition-all duration-300">
                <item.icon className="w-8 h-8 text-[#FF40EB] mb-4" />
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
            <span className="text-xs uppercase tracking-widest text-[#FF40EB] font-semibold">Campus Life</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Life at NIGAPE</h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">Our campus is alive with curiosity, laughter, and ambition. This is what your 3 years could look like.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className={`relative overflow-hidden rounded-2xl border border-[#9234eb]/20 group ${n === 1 ? "col-span-2 row-span-2 h-[320px] md:h-[440px]" : "h-[160px] md:h-[210px]"}`}>
                <Image
                  src={`/Nigapepic/${n}.webp`}
                  alt={`Campus life ${n}`}
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

      {/* ── WHAT DEGREE WE PROVIDE ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="degrees">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#FF40EB] font-semibold">Your Degree Choice</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Two University Pathways</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Choose the degree track that fits your goals — a government university degree from DU SOL or an industry-integrated degree from Jain University.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {degrees.map((deg) => (
              <div key={deg.name} className={`rounded-2xl border ${deg.border} bg-gradient-to-b ${deg.color} p-8 hover:shadow-[0_0_60px_rgba(255,64,235,0.12)] transition-all duration-300`}>
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${deg.badgeColor}`}>
                    {deg.badge}
                  </span>
                  <span className="text-4xl font-black text-white/20">{deg.logoFallback}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{deg.name}</h3>
                <p className="text-[#FF40EB] text-sm mb-1 flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> {deg.university}
                </p>
                <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {deg.duration} &nbsp;·&nbsp; {deg.mode}
                </p>

                <ul className="space-y-3 mb-8">
                  {deg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#FF40EB] mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link href="?enroll=1" className="inline-flex items-center gap-2 rounded-full bg-[#FF40EB] px-6 py-2.5 text-sm font-bold text-white hover:brightness-110 transition">
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
            <span className="text-xs uppercase tracking-widest text-[#FF40EB] font-semibold">3-Year Journey</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Year-by-Year Curriculum</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {curriculum.map((yr, i) => (
              <div key={yr.year} className={`rounded-2xl border ${yr.color} bg-gradient-to-b from-white/5 to-black p-6`}>
                <span className="text-xs uppercase tracking-widest text-[#FF40EB]">Phase {i + 1}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-5">{yr.year}</h3>
                <ul className="space-y-3">
                  {yr.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF40EB] mt-2 flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS LIFE & FUN ELEMENTS ── */}
      <section className="py-20 px-4 sm:px-6 bg-black" id="campus-life">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[#FF40EB] font-semibold">Beyond the Classroom</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Fun. Growth. Adventures.</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">At NIGAPE, college isn&apos;t just about studying. It&apos;s about experiences, friendships, and memories that define who you become.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusLife.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#FF40EB]/40 hover:bg-[#FF40EB]/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Activity highlights strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "1 Annual Outstation Trip" },
              { label: "Weekly Day Trips" },
              { label: "NGO Social Projects" },
              { label: "Monthly Hackathons" },
            ].map((a) => (
              <div key={a.label} className="rounded-2xl border border-[#FF40EB]/20 bg-[#FF40EB]/5 p-5 text-center">
                <p className="text-sm font-semibold text-white">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 sm:px-6 bg-black/50" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#FF40EB] mb-12">What Our Students Say</h2>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Placement & Career Outcomes</h2>
          <p className="text-gray-400 mb-10">Our degree graduates land roles across India&apos;s top tech companies and startups.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { stat: "₹8L–₹18L", label: "Avg. Starting CTC" },
              { stat: "95%+", label: "Placement Rate" },
              { stat: "150+", label: "Hiring Partners" },
              { stat: "6 Months", label: "Avg. Time to Hire" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#FF40EB]/30 bg-[#FF40EB]/5 p-5">
                <p className="text-2xl font-black text-[#FF40EB]">{s.stat}</p>
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
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-[#FF40EB]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Your Degree in AI Starts Here.
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Book a free counselling call today and get personalised guidance on which university track is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="?enroll=1" className="rounded-full bg-[#FF40EB] px-10 py-4 font-bold text-white shadow-[0_0_35px_rgba(255,64,235,0.5)] hover:shadow-[0_0_55px_rgba(255,64,235,0.7)] hover:scale-105 transition text-center">
              Book Free Counselling
            </Link>
            <Link href="/contact-us" className="rounded-full border-2 border-[#FF40EB] px-10 py-4 font-bold hover:bg-[#FF40EB]/10 transition text-center">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
