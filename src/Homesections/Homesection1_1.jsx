"use client";

const aiTech = [
  { name: "TensorFlow", mark: "TF" },
  { name: "PyTorch", mark: "PT" },
  { name: "LangChain", mark: "LC" },
  { name: "Llama 3", mark: "L3" },
  { name: "Claude 3", mark: "C3" },
  { name: "Gemini", mark: "G" },
  { name: "GPT-4", mark: "GPT" },
  { name: "Hugging Face", mark: "HF" },
  { name: "SageMaker", mark: "SM" },
  { name: "Vector DBs", mark: "DB" },
  { name: "RAG", mark: "RAG" },
  { name: "Fine-tuning", mark: "FT" },
  { name: "AI Agents", mark: "AI" },
  { name: "Prompt Engineering", mark: "PE" },
  { name: "MLOps", mark: "ML" },
  { name: "LLM APIs", mark: "API" },
];

export default function TechMarquee() {
  return (
    <>
      <div className="relative overflow-hidden py-6 md:py-10 bg-black/40 backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...aiTech, ...aiTech].map((tech, i) => (
            <span
              key={i}
              className="mx-4 md:mx-8 inline-flex items-center gap-2 md:gap-4 text-[#9234eb] font-mono text-[10px] xs:text-[12px] sm:text-[14px] md:text-[20px] lg:text-[30px] tracking-wider"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-[#9234eb]/50 bg-[#9234eb]/10 px-1 text-[9px] font-bold leading-none md:h-8 md:min-w-8 md:text-[10px]"
              >
                {tech.mark}
              </span>
              {tech.name} •
            </span>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 15s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 5s;
          }
        }
      `}</style>
    </>
  );
}