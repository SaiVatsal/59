/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          burgundy: '#4a0404',
          burgundyDeep: '#2a0202',
          burgundyLight: '#7f1d1d',
          gold: '#d97706',
          goldLight: '#fbbf24',
          goldPale: '#fef3c7',
          bg: '#fffbeb',
          surface: '#ffffff',
          border: '#fde68a'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
