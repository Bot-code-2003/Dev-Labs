/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["helvetica", "sans-serif"],
      },
      colors: {
        primary: "#3b82f6", // Customize your primary color
        "muted-foreground": "#9ca3af", // Customize muted foreground color
      },
    },
  },
  plugins: [],
};
