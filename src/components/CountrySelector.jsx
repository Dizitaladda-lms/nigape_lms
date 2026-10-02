"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Globe, Check, Search } from "lucide-react";

export const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳", lang: "en", label: "English" },
  { code: "IN_HI", name: "India (Hindi)", flag: "🇮🇳", lang: "hi", label: "हिंदी" },
  { code: "US", name: "United States", flag: "🇺🇸", lang: "en", label: "English" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", lang: "en", label: "English" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", lang: "ar", label: "العربية" },
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
  const [searchQuery, setSearchQuery] = useState("");
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

  // Automatically strip out Google Translate top banner frame if injected
  useEffect(() => {
    const cleanBanners = () => {
      const bannerFrames = document.querySelectorAll(
        ".goog-te-banner-frame, iframe.goog-te-banner-frame, .VIpgJd-ZJuic-O26lld, iframe[id^=':']"
      );
      bannerFrames.forEach((frame) => {
        frame.style.display = "none";
        frame.style.visibility = "hidden";
        frame.style.height = "0";
      });
      if (document.body.style.top !== "0px" && document.body.style.top !== "") {
        document.body.style.top = "0px";
      }
    };

    const interval = setInterval(cleanBanners, 300);
    return () => clearInterval(interval);
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
    setSearchQuery("");
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

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative ${isMobile ? "w-full" : "inline-block"}`} ref={dropdownRef}>
      {/* Selector Button - Premium Glassmorphism Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-between gap-2.5 rounded-full border border-[#FF40EB]/30 bg-gradient-to-r from-black/80 via-black/60 to-[#1a0022]/60 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#FF40EB] hover:shadow-[0_0_20px_rgba(255,64,235,0.3)] hover:scale-[1.02] ${
          isMobile ? "w-full py-2.5 px-4" : ""
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-lg leading-none filter drop-shadow">{selected.flag}</span>
          <span className="truncate text-white font-medium tracking-wide text-xs sm:text-sm">
            {selected.name}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#FF40EB]/15 border border-[#FF40EB]/40 px-2 py-0.5 text-[10px] font-mono font-bold text-[#FF40EB] uppercase">
            {selected.lang.toUpperCase()}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#FF40EB] transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : "group-hover:scale-110"
          }`}
        />
      </button>

      {/* Premium Dropdown Modal */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 flex flex-col rounded-2xl border border-[#FF40EB]/40 bg-gradient-to-b from-[#120019] via-black to-[#09000d] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-200 ${
            isMobile
              ? "left-0 right-0 w-full"
              : "right-0 w-72 sm:w-80"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-xs font-bold text-white">
            <span className="flex items-center gap-1.5 text-[#FF40EB]">
              <Globe className="w-4 h-4 animate-pulse" />
              Select Country & Language
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              {COUNTRIES.length} Countries
            </span>
          </div>

          {/* Search Box */}
          <div className="relative my-2 px-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search country or language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-1.5 pl-9 pr-3 text-xs text-white placeholder-gray-400 outline-none focus:border-[#FF40EB] focus:ring-1 focus:ring-[#FF40EB]/50 transition-all"
            />
          </div>

          {/* Country List */}
          <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.code === selected.code;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => changeLanguage(country)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-xl transition-all duration-200 group ${
                      isSelected
                        ? "bg-gradient-to-r from-[#FF40EB]/30 to-[#9234eb]/20 text-white font-semibold border border-[#FF40EB]/50 shadow-md"
                        : "text-gray-300 hover:bg-white/10 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-xl leading-none">{country.flag}</span>
                      <div className="flex flex-col items-start truncate">
                        <span className="font-medium truncate text-white">{country.name}</span>
                        <span className="text-[10px] text-gray-400 group-hover:text-pink-300">
                          {country.label}
                        </span>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[#FF40EB]">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-gray-400 uppercase group-hover:text-white">
                        {country.lang}
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-gray-400">
                No matching country found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
