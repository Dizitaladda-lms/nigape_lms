import Link from 'next/link';
import { Twitter, MessageCircle, Globe, Copyright } from 'lucide-react';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Footer() {
  return (
    <>
      <footer className="relative w-full md:pb-0 pb-28 bg-black border-t border-[#FF40EB]/20 overflow-hidden">

        <div className="absolute inset-0 bg-top-glow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-2 md:py-16 relative z-10">

          {/*
            Mobile  < 640px  : 1 col  — sab ek ke neeche ek
            Tablet  640-1023 : 2 col  — brand + programs | community + legal
            Desktop > 1024px : 4 col  — sab ek line mein
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">

            {/* ── Brand ── */}
            {/* Mobile: full width | Tablet: full width top | Desktop: col 1 */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            
              <img
                src="/Nigapepic/nigape1.png"
                alt="NIGAPE"
                className="w-[110px] h-auto object-contain "
              />

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                India-first institute dedicated to Generative AI and Prompt Engineering outcomes.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <Twitter className="w-4 h-4 text-[#FF40EB] group-hover:scale-110 transition" />
                </a>
                <a href="https://www.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381/" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <span className="text-[#FF40EB] group-hover:scale-110 transition"><LinkedInIcon /></span>
                </a>
                <a href="https://www.instagram.com/nigape.official/" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <span className="text-[#FF40EB] group-hover:scale-110 transition"><InstagramIcon /></span>
                </a>
                <a href="/contact-us"
                  className="w-9 h-9 rounded-full bg-[#FF40EB]/10 border border-[#FF40EB]/30 flex items-center justify-center hover:bg-[#FF40EB]/20 hover:border-[#FF40EB] transition-all duration-300 group">
                  <Globe className="w-4 h-4 text-[#FF40EB] group-hover:scale-110 transition" />
                </a>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-[#FF40EB]/20 flex  gap-2">
                {/* <a href="mailto:info@nigape.com"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#FF40EB] transition">
                  <span className="text-[#FF40EB]">✉</span>
                  info@nigape.com
                </a> */}
                <a href="tel:+917428114918"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#FF40EB] transition">
                  <span className="text-[#FF40EB]">☎</span>
                  +91 74281 14918
                </a>
              </div>
            </div>

            {/* ── Programs col 1 ── */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-white font-semibold relative inline-block underline-pink pb-2">
                Programs
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Diploma in GenAI (12 Months)", href: "/courses/diploma-in-generative-ai-prompt-engineering" },
                  { label: "Advanced GenAI (6 Months)", href: "/courses/advanced-generative-ai-prompt-engineering" },
                  { label: "Advanced Certification GenAI", href: "/courses/advanced-certification-in-generative-ai-prompt-engineering" },
                  { label: "GenAI for Professionals", href: "/courses/generative-ai-for-professionals" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-gray-400 hover:text-[#FF40EB] transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Programs col 2 ── */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-white font-semibold relative inline-block underline-pink pb-2">
                More Programs
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "AI Literacy for Everyone", href: "/courses/ai-literacy-for-everyone" },
                  { label: "NLP Professional", href: "/courses/nlp-professional" },
                  { label: "Computer Vision Professional", href: "/courses/computer-vision-professional" },
                  { label: "Deep Learning Professional", href: "/courses/deep-learning-professional" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-gray-400 hover:text-[#FF40EB] transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Legal ── */}
            {/* Mobile: full width | Tablet: left col | Desktop: col 4 */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-white font-semibold relative inline-block underline-pink pb-2">
                Legal
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms-of-service" },
                  { label: "Terms & Conditions", href: "/terms-and-conditions" },
                  { label: "Disclaimer", href: "/disclaimer" },
                  { label: "Sitemap XML", href: "/sitemap.xml" },
                  { label: "Sitemap HTML", href: "/sitemap.html" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-gray-400 hover:text-[#FF40EB] transition-all duration-300 hover:translate-x-1 inline-block text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-[#FF40EB]/20">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="text-white font-semibold text-lg">Visit Our Campus</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF40EB]">Location</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#FF40EB]/30 bg-black/40 shadow-[0_0_30px_rgba(255,64,235,0.12)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9308349192866!2d77.23825707549749!3d28.54179857571441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce31a443269bd%3A0x3439cdd587d60b18!2sNational%20Institute%20of%20Generative%20Ai%20%26%20Prompt%20Engineering!5e0!3m2!1sen!2sin!4v1790837393023!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="NIGAPE location map"
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#FF40EB]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Copyright className="w-4 h-4" />
              <span>2025 NIGAPE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF40EB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF40EB]" />
              </span>
              <span className="text-[#FF40EB] font-semibold">Online</span>
            </div>
          </div>

        </div>


      </footer>
    </>
  );
}