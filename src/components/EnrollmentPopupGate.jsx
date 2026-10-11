"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { courses } from "@/Data/data";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  course: "",
  city: "",
  message: "",
};

export default function EnrollmentPopupGate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(initialForm);
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const isOpen = searchParams?.get("enroll") === "1";

  const nextUrlWithoutEnroll = useMemo(() => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("enroll");
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const closePopup = () => {
    router.replace(nextUrlWithoutEnroll, { scroll: false });
    setSubmitState({ status: "idle", message: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitState({ status: "submitting", message: "Submitting your request..." });

    try {
      const payload = new URLSearchParams({
        ...formData,
        source: "website-enrollment-popup",
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });

      const response = await fetch("/api/submit-lead", { method: "POST", body: payload });

      const data = await response.json();
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || `Status ${response.status}`);
      }

      setSubmitState({ status: "success", message: "Thanks! Your details were submitted successfully." });
      setFormData(initialForm);
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Submission failed. Please try again.",
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={closePopup}
    >
      <div
        className="relative bg-black rounded-2xl shadow-2xl w-[96vw] max-w-6xl border border-[#FF40EB]/30 max-h-[92vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-[#FF40EB] text-2xl font-bold z-10"
          onClick={closePopup}
          aria-label="Close"
        >
          x
        </button>

        <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-9">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#FF40EB] text-center">Book Your Counseling Session</h2>
          <form className="w-full max-w-none space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); handleChange({ target: { name: 'phone', value: v } }); }}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400"
              />
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white ${!formData.course ? 'text-gray-400' : ''}`}
              >
                <option value="" className="bg-black text-gray-400">Course Interested In</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.title} className="bg-black text-white">{c.title}</option>
                ))}
              </select>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 md:col-span-2"
              />
              <textarea
                rows={4}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 resize-none md:col-span-2"
              />
            </div>

            {submitState.status !== "idle" && (
              <p
                className={`text-sm ${submitState.status === "success" ? "text-green-400" : submitState.status === "error" ? "text-red-400" : "text-gray-300"}`}
              >
                {submitState.message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitState.status === "submitting"}
              className="w-full py-3 rounded-lg bg-[#FF40EB] text-white font-bold text-base sm:text-lg shadow-md hover:bg-[#c026d3] transition"
            >
              {submitState.status === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
