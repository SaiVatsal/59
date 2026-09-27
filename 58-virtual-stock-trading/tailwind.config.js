/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          950: '#06080e',
          900: '#0c0f17',
          800: '#131b2e',
          700: '#1e293b',
          bull: '#22c55e',
          bear: '#ef4444',
          amber: '#f59e0b',
          cyan: '#38bdf8'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
