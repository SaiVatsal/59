/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          bg: '#fbfbf7',
          forest: '#14532d',
          green: '#16a34a',
          emerald: '#059669',
          lightGreen: '#f0fdf4',
          brown: '#854d0e',
          amber: '#d97706',
          warmBg: '#fef3c7',
          card: '#ffffff',
          border: '#e7e5e4'
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
