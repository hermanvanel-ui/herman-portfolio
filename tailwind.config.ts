import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        cyan: "var(--cyan)",
        "cyan-bright": "var(--cyan-bright)",
        green: "var(--green)",
        purple: "var(--purple)",
        "purple-bright": "var(--purple-bright)",
        pink: "var(--pink)",
        surface: "var(--surface)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite",
        typing: "typing 3s steps(40) 1s forwards",
        blink: "blink 0.8s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": {
            textShadow:
              "0 0 10px rgba(0,240,255,.5), 0 0 20px rgba(0,240,255,.3)",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(0,240,255,.8), 0 0 40px rgba(0,240,255,.5)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
