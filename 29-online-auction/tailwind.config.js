/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        auction: {
          dark: '#09090b',
          card: '#18181b',
          border: '#27272a',
          red: '#ef4444',
          crimson: '#dc2626',
          gold: '#f59e0b'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
