/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0f1d',
          card: 'rgba(15, 23, 42, 0.75)',
          cyan: '#06b6d4',
          emerald: '#10b981',
          accent: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
}