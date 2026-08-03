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
        cream: "#FAF7F2",
        "cream-dark": "#F0EBE1",
        brown: {
          50: "#FAF7F2",
          100: "#F0EBE1",
          200: "#DDD0BC",
          300: "#C9B49A",
          400: "#B59878",
          500: "#8B6E4E",
          600: "#6B5039",
          700: "#4D3828",
          800: "#321F10",
          900: "#1A0E05",
        },
        terracotta: {
          50: "#FDF0EC",
          100: "#FAD9CF",
          200: "#F5B3A0",
          300: "#EE8D72",
          400: "#E56744",
          500: "#C94B28",
          600: "#A03920",
          700: "#782918",
          800: "#501A10",
          900: "#280D08",
        },
        sage: {
          50: "#F2F5F0",
          100: "#DDE5D8",
          200: "#BBCBB1",
          300: "#99B18A",
          400: "#779763",
          500: "#5A7D48",
          600: "#456439",
          700: "#314B2A",
          800: "#1E321C",
          900: "#0A190E",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
