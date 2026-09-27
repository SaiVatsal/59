/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          dark: '#09090b',
          surface: '#18181b',
          border: '#27272a',
          accent: '#8b5cf6', // Electric violet
          accentHover: '#7c3aed'
        }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        sans: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
