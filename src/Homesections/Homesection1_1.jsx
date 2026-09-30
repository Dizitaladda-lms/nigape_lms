"use client";

import { useEffect } from 'react';

const aiTech = [
  { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/9234eb" },
  { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/9234eb" },
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/9234eb" },
  { name: "Llama 3", logo: "https://cdn.simpleicons.org/meta/9234eb" },
  { name: "Claude 3", logo: "https://cdn.simpleicons.org/anthropic/9234eb" },
  { name: "Gemini", logo: "https://cdn.simpleicons.org/google/9234eb" },
  { name: "GPT-4", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg" },
  { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/9234eb" },
  { name: "SageMaker", logo: "https://www.awsicon.com/icon/sagemaker/64.png" },
  { name: "Vector DBs", logo: "https://cdn.simpleicons.org/databricks/9234eb" },
  { name: "RAG", logo: "https://cdn.simpleicons.org/bookstack/9234eb" },
  { name: "Fine-tuning", logo: "https://cdn.simpleicons.org/slidershare/9234eb" },
  { name: "AI Agents", logo: "https://cdn.simpleicons.org/robotframework/9234eb" },
  { name: "Prompt Engineering", logo: "https://cdn.simpleicons.org/openai/9234eb" },
  { name: "MLOps", logo: "https://cdn.simpleicons.org/mlflow/9234eb" },
  { name: "LLM APIs", logo: "https://cdn.simpleicons.org/api/9234eb" },
];

// Dynamically load "Press Start 2P" (pixel font)
const loadPixelFont = () => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

export default function TechMarquee() {
  useEffect(() => {
    loadPixelFont();
  }, []);

  return (
    <>
      <div className="relative overflow-hidden py-6 md:py-10 bg-black/40 backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...aiTech, ...aiTech].map((tech, i) => (
            <span
              key={i}
              // Pixel font + responsive sizing (smaller on mobile for readability)
              className="mx-4 md:mx-8 inline-flex items-center gap-2 md:gap-4 text-[#9234eb] font-mono text-[10px] xs:text-[12px] sm:text-[14px] md:text-[20px] lg:text-[30px] font-['Press_Start_2P'] tracking-wider"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                width={26}
                height={26}
                className="opacity-100"
              />
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

        /* Ensure pixel font renders crisply */
        .pixel-text {
          image-rendering: pixelated;
          -ms-interpolation-mode: nearest-neighbor;
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