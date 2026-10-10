"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "nigape-blog-theme";
const THEME_CHANGE_EVENT = "blog-theme-change";

const subscribeToTheme = (callback) => {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getThemeSnapshot = () => window.localStorage.getItem(STORAGE_KEY) === "dark";
const getServerThemeSnapshot = () => false;

export default function BlogShell({ children }) {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    window.localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <div className={`blog-shell${isDark ? " blog-dark" : ""}`}>
      <button
        type="button"
        className="blog-theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} blog theme`}
      >
        {isDark ? "☀️ Light theme" : "🌙 Dark theme"}
      </button>
      {children}
    </div>
  );
}
