/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        budget: {
          dark: '#042f2e',
          teal: '#0d9488',
          tealLight: '#14b8a6',
          bg: '#f0fdfa',
          card: '#ffffff',
          accent: '#0f766e',
          border: '#ccfbf1'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
