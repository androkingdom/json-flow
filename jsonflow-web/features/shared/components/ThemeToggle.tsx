"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-100"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <div className="relative h-5 w-5">
        <FiSun
          className={`absolute inset-0 h-5 w-5 ${
            theme === "light"
              ? "opacity-100"
              : "opacity-0"
          }`}
        />
        <FiMoon
          className={`absolute inset-0 h-5 w-5 ${
            theme === "dark"
              ? "opacity-100"
              : "opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
