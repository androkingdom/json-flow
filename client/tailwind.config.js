/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        mint: "#b8f2e6",
        moss: "#1b4332",
        ember: "#fca311",
        blush: "#f7c8d0",
        cloud: "#f8f5f2",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(15, 15, 20, 0.25)",
      },
      backgroundImage: {
        grid: "linear-gradient(transparent 93%, rgba(0,0,0,0.08) 93%), linear-gradient(90deg, transparent 93%, rgba(0,0,0,0.08) 93%)",
        aura: "radial-gradient(circle at top, rgba(248, 245, 242, 0.9), rgba(184, 242, 230, 0.45) 50%, rgba(15, 15, 20, 0.95) 100%)",
      },
    },
  },
  plugins: [],
};
