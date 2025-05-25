import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "md-custom": "825px",
      },
      colors: {
        background: "var(--background)",
        secondary: "var(--secondary)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          90: "rgba(231, 88, 55, 0.9)",
          5: "rgba(231, 88, 55, 0.05)",
        },
        "muted-foreground": "var(--muted-foreground)",
      },
      fontFamily: {
        ovo: ["var(--font-ovo)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
