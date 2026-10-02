"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";

export const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳", lang: "en", label: "English" },
  { code: "IN_HI", name: "India (Hindi)", flag: "🇮🇳", lang: "hi", label: "हिंदी" },
  { code: "US", name: "United States", flag: "🇺🇸", lang: "en", label: "English" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", lang: "en", label: "English" },
  { code: "AE", name: "UAE", flag: "🇦🇪", lang: "ar", label: "العربية" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", lang: "ar", label: "العربية" },
  { code: "FR", name: "France", flag: "🇫🇷", lang: "fr", label: "Français" },
  { code: "DE", name: "Germany", flag: "🇩🇪", lang: "de", label: "Deutsch" },
  { code: "ES", name: "Spain", flag: "🇪🇸", lang: "es", label: "Español" },
  { code: "IT", name: "Italy", flag: "🇮🇹", lang: "it", label: "Italiano" },
  { code: "JP", name: "Japan", flag: "🇯🇵", lang: "ja", label: "日本語" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", lang: "ko", label: "한국어" },
  { code: "CN", name: "China", flag: "🇨🇳", lang: "zh-CN", label: "中文" },
  { code: "RU", name: "Russia", flag: "🇷🇺", lang: "ru", label: "Русский" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", lang: "pt", label: "Português" },
  { code: "CA", name: "Canada", flag: "🇨🇦", lang: "en", label: "English" },
  { code: "AU", name: "Australia", flag: "🇦🇺", lang: "en", label: "English" },
];

export default function CountrySelector({ isMobile = false }) {
  const [selected, setSelected] = useState(COUNTRIES[0]); // Default India (EN)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize selected country from localStorage & load Google Translate script
  useEffect(() => {
    const savedCode = localStorage.getItem("selected_country_code");
    if (savedCode) {
      const found = COUNTRIES.find((c) => c.code === savedCode);
      if (found) {
        setSelected(found);
      }
    }

    // Add hidden google translate element container if missing
    if (!document.getElementById("google_translate_element")) {
      const gdiv = document.createElement("div");
      gdiv.id = "google_translate_element";
      gdiv.style.display = "none";
      document.body.appendChild(gdiv);
    }

    // Load Google Translate script
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,hi,ar,fr,de,es,it,ja,ko,zh-CN,ru,pt",
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (country) => {
    setSelected(country);
    setIsOpen(false);
    localStorage.setItem("selected_country_code", country.code);

    const langCode = country.lang;
    const cookieValue = `/en/${langCode}`;

    // Set Google Translate Cookie for current path & root domain
    const host = window.location.hostname;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; domain=${host}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; domain=.${host}; path=/;`;

    // Attempt direct select trigger or page reload
    const selectElem = document.querySelector(".goog-te-combo");
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "inline-block"}`} ref={dropdownRef}>
      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:border-[#FF40EB] hover:bg-[#FF40EB]/10 ${
          isMobile ? "w-full justify-between py-2.5 px-4" : ""
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="truncate">{selected.name}</span>
          <span className="text-[10px] text-[#FF40EB] font-mono uppercase bg-[#FF40EB]/10 px-1.5 py-0.5 rounded border border-[#FF40EB]/30">
            {selected.lang.toUpperCase()}
          </span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#FF40EB]" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/20 bg-black/90 p-1.5 shadow-2xl backdrop-blur-xl custom-scrollbar ${
            isMobile
              ? "left-0 right-0 w-full"
              : "right-0 min-w-[210px]"
          }`}
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/10 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#FF40EB]" /> Select Country / Region
          </div>
          <div className="py-1">
            {COUNTRIES.map((country) => {
              const isSelected = country.code === selected.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => changeLanguage(country)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all duration-150 ${
                    isSelected
                      ? "bg-[#FF40EB]/20 text-white font-semibold border border-[#FF40EB]/40"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {country.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
