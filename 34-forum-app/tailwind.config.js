/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forum: {
          bg: '#f8fafc',
          card: '#ffffff',
          slate: '#334155',
          textMuted: '#64748b',
          blue: '#0284c7',
          blueDark: '#0369a1',
          border: '#e2e8f0'
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
