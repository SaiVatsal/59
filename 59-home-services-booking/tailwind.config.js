/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        homeservice: {
          900: '#0c4a6e',
          800: '#075985',
          700: '#0369a1',
          600: '#0284c7',
          500: '#0ea5e9',
          50: '#f0f9ff'
        },
        emerald: {
          600: '#059669',
          500: '#10b981',
          50: '#f0fdf4'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
