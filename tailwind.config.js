/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e2dad4",
          100: "#d17076",
          150: "#d9bc75",
          160: "#c7aa65",
          170: "#b4830f",
          200: "#253148",
          250: "#000c14",
        },
        accent: {
          50: "#c9cbcc",
          100: "#e8e8e8",
          150: "#f8f9fa",
          200: "#616161",
          250: "#F0F0F0",
        },
      },
    },
  },
  plugins: [],
};
