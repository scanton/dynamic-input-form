import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        modal: "0 24px 80px rgba(45, 41, 38, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
