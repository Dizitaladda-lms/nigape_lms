// app/contact/page.jsx
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Iridescence from '@/Homesections/bits/Iridescence.js';


// const navItems = [
//   { name: "About", icon: Info, href: "About" },
//   { name: "Courses", icon: BookOpen, href: "/courses" },
// ];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nigape.official/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

// const Navbar = memo(() => (
//   <motion.nav
//     initial={{ opacity: 0, y: -30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8, delay: 0.3 }}
//     className="fixed top-6 sm:top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
//   >
//     <div className="pointer-events-auto w-full max-w-4xl">
//       <div
//         className="
//         flex items-center justify-between 
//         px-5 py-4 sm:px-8 sm:py-5 
//         bg-black/70 backdrop-blur-xl 
//         rounded-2xl sm:rounded-full 
//         shadow-2xl border border-white/10
//         overflow-x-auto scrollbar-hide
//       "
//       >
//         {/* Home Button */}
//         <Link
//           href="/"
//           className="
//             flex items-center gap-3 
//             px-5 py-3 rounded-full 
//             text-white font-bold text-sm 
//             bg-gradient-to-r from-purple-500 to-pink-500
//             shadow-lg hover:shadow-purple-500/50 
//             transition-all duration-300 
//             whitespace-nowrap shrink-0
//           "
//         >
//           <Home size={22} strokeWidth={2.8} />
//           <span className="hidden sm:inline">Home</span>
//         </Link>

//         {/* Icons */}
//         <div className="flex items-center gap-5 sm:gap-7 shrink-0">
//           {navItems.map((item) => (
//             <a
//               key={item.name}
//               href={item.href}
//               aria-label={item.name}
//               className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shrink-0"
//             >
//               <item.icon size={26} strokeWidth={2.2} />
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   </motion.nav>
// ));

// Navbar.displayName = "ContactNavbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    city: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });
  const [formErrors, setFormErrors] = useState({});

  const courseOptions = [
    "Diploma in Generative AI & Prompt Engineering",
    "Advanced Generative AI & Prompt Engineering",
    "AI Literacy for Everyone",
    "Generative AI for Professionals",
    "NLP Professional",
    "Computer Vision Professional",
    "Deep Learning Professional",
  ];

  const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s|-/g, ""))) errors.phone = "Enter a valid 10-digit Indian mobile number";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    setSubmitState({ status: "submitting", message: "Submitting your request..." });

    try {
      const payload = new URLSearchParams({
        ...formData,
        source: "website-contact-us",
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || `Status ${response.status}`);
      }

      setSubmitState({
        status: "success",
        message: "Thanks! Your details were submitted successfully.",
      });
      setFormData({ name: "", email: "", phone: "", course: "", city: "", message: "" });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Submission failed. Please try again.",
      });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": "https://www.nigape.com/contact-us#webpage",
              "url": "https://www.nigape.com/contact-us",
              "name": "Generative AI & Prompt Engineering Course Contact | NIGAPE",
              "description": "Contact NIGAPE for Generative AI and Prompt Engineering courses in Delhi. Get fees, batches, syllabus, admission, registration, and career guidance from our team.",
              "inLanguage": "en-IN",
              "isPartOf": { "@id": "https://www.nigape.com/#website" },
              "about": { "@id": "https://www.nigape.com/#organization" },
              "mainEntity": { "@id": "https://www.nigape.com/#organization" },
              "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": "https://www.nigape.com/Nigapepic/nigape1.png"
              },
              "breadcrumb": { "@id": "https://www.nigape.com/contact-us#breadcrumb" }
            },
            {
              "@type": ["EducationalOrganization", "LocalBusiness"],
              "@id": "https://www.nigape.com/#organization",
              "name": "NIGAPE",
              "alternateName": [
                "National Institute of Generative AI & Prompt Engineering",
                "NIGAPE GK2 Delhi"
              ],
              "url": "https://www.nigape.com/",
              "logo": {
                "@type": "ImageObject",
                "@id": "https://www.nigape.com/#logo",
                "url": "https://www.nigape.com/Nigapepic/nigape.svg",
                "caption": "NIGAPE Logo"
              },
              "image": "https://www.nigape.com/Nigapepic/nigape1.png",
              "description": "India-first institute dedicated to Generative AI and Prompt Engineering careers, offering mentor-led, project-based programs in Delhi and online.",
              "telephone": "+91-7428114918",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Spacetime GK2, near Savitri Cinema Complex",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110048",
                "addressCountry": "IN"
              },
              "location": {
                "@type": "Place",
                "name": "NIGAPE Campus, Spacetime GK2",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Spacetime GK2, near Savitri Cinema Complex",
                  "addressLocality": "New Delhi",
                  "addressRegion": "Delhi",
                  "postalCode": "110048",
                  "addressCountry": "IN"
                }
              },
              "areaServed": [
                { "@type": "City", "name": "Delhi" },
                { "@type": "Country", "name": "India" }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "admissions",
                  "telephone": "+91-7428114918",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"],
                  "url": "https://www.nigape.com/contact-us"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "telephone": "+91-7428114918",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"],
                  "url": "https://wa.me/917428114918"
                }
              ],
              "potentialAction": {
                "@type": "CommunicateAction",
                "name": "Request Counseling Call",
                "target": "https://www.nigape.com/contact-us"
              },
              "sameAs": [
                "https://www.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381/",
                "https://www.instagram.com/nigape.official/"
              ]
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.nigape.com/contact-us#breadcrumb",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.nigape.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact Us",
                  "item": "https://www.nigape.com/contact-us"
                }
              ]
            }
          ]
        }) }}
      />
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Iridescence
          color={[1, 0.25, 0.92]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <div className="  absolute inset-0 -z-[1] bg-black/50 "></div>


      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-36 pb-32 sm:pb-40 text-center">
        <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight"
          >
            Contact NIGAPE for Generative AI & Prompt Engineering
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base xs:text-lg md:text-xl text-white leading-relaxed max-w-xl sm:max-w-3xl mx-auto"
          >
            Have questions about our Generative AI and Prompt Engineering courses in Delhi? Contact our team for course fees, batches, syllabus, admission, registration, training details, and career guidance.
          </motion.p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-2 xs:px-4 sm:px-6 pb-20 sm:pb-32 bg-black/95 pt-10 sm:pt-20">
        <div className="max-w-4xl sm:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">

          {/* LEFT: FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 sm:space-y-10"
          >
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                We’re happy to help!
              </h2>
              <p className="text-pink-200/85 text-base xs:text-lg leading-relaxed">
                Share your background and goals, and we’ll suggest the right NIGAPE learning path.
              </p>
            </div>

            <form className="space-y-5 sm:space-y-7" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="* Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/10 border rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg ${formErrors.name ? 'border-red-400' : 'border-pink-500/30'}`}
                />
                {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="* Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/10 border rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg ${formErrors.email ? 'border-red-400' : 'border-pink-500/30'}`}
                />
                {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="* Phone Number"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); handleChange({ target: { name: 'phone', value: v } }); }}
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/10 border rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg ${formErrors.phone ? 'border-red-400' : 'border-pink-500/30'}`}
                />
                {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-black/80 border rounded-xl focus:outline-none focus:border-pink-400 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg ${formData.course ? 'text-white' : 'text-pink-300/70'} border-pink-500/30`}
              >
                <option value="" className="text-gray-400 bg-black">Course Interested In (optional)</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c} className="bg-black text-white">{c}</option>
                ))}
              </select>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/10 border border-pink-500/30 rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg"
              />

              <div>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Tell us about your current background and AI career goal... *"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/10 border rounded-xl text-white placeholder-pink-300/70 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 resize-none backdrop-blur-sm text-base sm:text-lg ${formErrors.message ? 'border-red-400' : 'border-pink-500/30'}`}
                />
                {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
              </div>

              {submitState.status !== "idle" && (
                <p
                  className={`text-sm ${submitState.status === "success" ? "text-green-300" : submitState.status === "error" ? "text-red-300" : "text-pink-100"}`}
                >
                  {submitState.message}
                </p>
              )}

              <button
                type="submit"
                disabled={submitState.status === "submitting"}
                className="w-full py-4 sm:py-5 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50"
              >
                {submitState.status === "submitting" ? "Submitting..." : "Request Counseling Call"}
              </button>
            </form>
          </motion.div>

          {/* RIGHT: INFO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10 sm:space-y-16 text-white"
          >
            {/* FAQ */}
            <div>
              <h3 className="text-xl xs:text-2xl md:text-3xl font-bold text-pink-400 mb-3 sm:mb-5">
                FAQs
              </h3>
              <p className="text-pink-100/90 text-sm xs:text-base leading-relaxed">
                Have a quick question?
                Check our FAQs for instant guidance on courses, eligibility, and placements.
              </p>
              <Link
                href="/#faq"
                className="inline-block mt-3 sm:mt-5 text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition"
              >
                View FAQs →
              </Link>
            </div>

            {/* OFFICE */}
            <div>
              <h3 className="text-xl xs:text-2xl md:text-3xl font-bold text-pink-400 mb-3 sm:mb-5">
                Campus Address
              </h3>
              <p className="text-pink-100/90 text-sm xs:text-base leading-relaxed">
                Spacetime GK2,<br />
                near Savitri Cinema Complex,<br />
                New Delhi, Delhi 110048, India
              </p>
            </div>

            {/* SOCIALS */}
            <div>
              <h3 className="text-xl xs:text-2xl md:text-3xl font-bold text-pink-400 mb-4 sm:mb-6">
                Follow Us
              </h3>
              <div className="flex gap-3 sm:gap-5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-pink-500/40 flex items-center justify-center text-[#FF40EB] hover:bg-pink-500/20 hover:border-pink-400 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GLOBAL FONT */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </>
  );
}
