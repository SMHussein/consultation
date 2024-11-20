/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e2dad4",
          100: "#d17076",
          150: "#7a2a2c",
          200: "#22323f",
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
