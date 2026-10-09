import Link from "next/link";

export default function Homee() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="hero-aurora absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/90 via-transparent to-black/90"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <section className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-4 pt-5 md:pt-20">
            <div className="mx-auto max-w-8xl space-y-10 text-center">
              <h1 className="text-3xl font-black uppercase leading-tight tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl lg:text-[3.8rem]">
                Build Your{" "}
                <span className="text-white drop-shadow-[0_0_35px_rgba(147,51,234,0.7)]">
                  AI
                </span>{" "}
                Career
                <br />
                in{" "}
                <span className="text-white drop-shadow-[0_0_45px_rgba(147,51,234,0.8)]">
                  GenAI &amp; Prompt Engineering
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                Join NIGAPE, a Generative AI institute in Delhi, for practical
                training in Prompt Engineering, AI tools, LLMs, agents, and
                automation. Build real projects through mentor-led cohorts and
                prepare for certification and placement opportunities.
              </p>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 pt-2 sm:grid-cols-2 sm:gap-x-6">
                <Link
                  href="?enroll=1"
                  className="flex items-center justify-center rounded-full bg-[#FF40EB] px-10 py-1 font-bold text-white shadow-[0_0_35px_rgba(147,51,234,0.6)] transition hover:scale-105 hover:shadow-[0_0_55px_rgba(147,51,234,0.8)]"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center justify-center rounded-full border-2 border-[#FF40EB] px-10 py-2 font-bold transition hover:bg-purple-600/15"
                >
                  Explore Our Courses
                </Link>
                <Link
                  href="/programs/degree-in-ai"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#FF40EB]/60 hover:bg-[#FF40EB]/10"
                >
                  UG Degree Programs{" "}
                  <span className="text-xs text-green-500">(3 Years)</span>
                </Link>
                <Link
                  href="/programs/pg-in-ai"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#9234eb]/60 hover:bg-[#9234eb]/10"
                >
                  PG Programs{" "}
                  <span className="text-xs text-green-500">(2 Years)</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
