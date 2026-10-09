const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "I joined <span style='color:#9234eb; font-weight:600'>NIGAPE</span> right after Class 12. In 3 months I built my first AI support bot and portfolio website. The mentors made Prompt Engineering simple and practical.",
      name: "Rohit Sharma",
      role: "Class 12 Graduate",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      linkedinUrl: "#",
    },
    {
      quote:
        "As a working professional in marketing, I used <span style='color:#9234eb; font-weight:600'>NIGAPE</span> to transition into AI automation consulting. The live classes and weekend support helped me switch roles with confidence.",
      name: "Priya Verma",
      role: "Working Professional",
      avatarUrl: "https://i.pravatar.cc/40?img=2",
      linkedinUrl: "#",
    },
    {
      quote:
        "The best part of <span style='color:#9234eb; font-weight:600'>NIGAPE</span> was career direction. I completed GenAI + Prompt Engineering projects, practiced interviews, and secured an internship with a product startup.",
      name: "Ankit Mehra",
      role: "B.Tech Student",
      avatarUrl: "https://i.pravatar.cc/40?img=3",
      linkedinUrl: "#",
    },
    {
      quote:
        "I had zero coding background but <span style='color:#9234eb; font-weight:600'>NIGAPE</span>'s guided learning tracks made LLMs and GenAI accessible. Within 2 months I was deploying my own chatbot for a small business.",
      name: "Simran Kaur",
      role: "BBA Student",
      avatarUrl: "https://i.pravatar.cc/40?img=5",
      linkedinUrl: "#",
    },
    {
      quote:
        "The sprint-based project model at <span style='color:#9234eb; font-weight:600'>NIGAPE</span> is unmatched. Each week you go from theory to a working prototype. My portfolio now has 6 real AI projects that impressed my interviewers.",
      name: "Vikram Nair",
      role: "Software Engineer",
      avatarUrl: "https://i.pravatar.cc/40?img=6",
      linkedinUrl: "#",
    },
    {
      quote:
        "After completing the Advanced GenAI program at <span style='color:#9234eb; font-weight:600'>NIGAPE</span>, I got hired as a Prompt Engineer at a Delhi-based SaaS startup. The resume and interview prep was incredibly helpful.",
      name: "Deepika Reddy",
      role: "Prompt Engineer",
      avatarUrl: "https://i.pravatar.cc/40?img=9",
      linkedinUrl: "#",
    },
    {
      quote:
        "NIGAPE changed how I think about AI. Not just theory — actual business use-cases, RAG pipelines, and agent workflows. I got a 40% salary hike after completing the professional track.",
      name: "Karan Malhotra",
      role: "Product Manager",
      avatarUrl: "https://i.pravatar.cc/40?img=11",
      linkedinUrl: "#",
    },
    {
      quote:
        "I came from a non-tech background. <span style='color:#9234eb; font-weight:600'>NIGAPE</span>'s structured AI literacy program gave me the confidence to present AI strategies at board level. Truly transformative learning.",
      name: "Neha Srivastava",
      role: "Business Analyst",
      avatarUrl: "https://i.pravatar.cc/40?img=16",
      linkedinUrl: "#",
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-[#FF40EB] text-center pb-10 md:pb-16">
          Testimonials
        </h2>

        <div
          role="region"
          aria-label="Testimonials"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-12"
        >
          {testimonials.map((t, index) => (
            <article
              key={index}
              className="relative flex h-auto min-w-0 flex-[0_0_100%] snap-start flex-col overflow-visible pb-2 sm:flex-[0_0_calc((100%-1.5rem)/2)] lg:flex-[0_0_calc((100%-3rem)/3)]"
            >
              {/* Background shadow layers */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg opacity-30 transform translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2" />
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg opacity-50 transform translate-x-0 translate-y-0 md:translate-x-1 md:translate-y-1" />

              {/* Main card */}
              <div className="relative bg-white rounded-xl shadow-xl p-4 md:p-6 z-10 flex flex-col h-full">
                {/* Top NIGAPE tab */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-7 sm:-top-6 sm:w-24 sm:h-8 bg-white rounded-t-lg border border-gray-200 flex items-center justify-center">
                  <span className="text-sm sm:text-lg font-bold text-[#9234eb]">NIGAPE</span>
                </div>

                {/* Quote mark */}
                <div className="text-2xl md:text-3xl text-[#9234eb] mb-4">&quot;</div>

                {/* Quote text */}
                <p
                  className="text-gray-700 leading-relaxed text-sm md:text-base flex-1"
                  dangerouslySetInnerHTML={{ __html: t.quote }}
                />

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={t.avatarUrl.trim()}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  <a
                    href={t.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#9234eb] transition-colors"
                    aria-label={`${t.name} on LinkedIn`}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.55v-5.895c0-1.405-.027-3.199-1.95-3.199-1.95 0-2.256 1.514-2.256 3.089v6.005H5.59V8.91h3.49v1.664h.05c1.128-1.91 3.089-2.89 5.02-2.89 5.338 0 6.33 3.526 6.33 8.124v7.644zM2.59 0h3.55v11.49H2.59V0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;