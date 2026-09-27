/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        task: {
          bg: '#f8fafc',
          surface: '#ffffff',
          indigo: '#4f46e5',
          indigoLight: '#e0e7ff',
          greenLight: '#dcfce7',
          yellowLight: '#fef9c3',
          redLight: '#fee2e2',
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
