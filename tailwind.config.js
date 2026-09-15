 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        editorial: {
          bg: '#ffffff',
          'bg-dark': '#080808',
          text: '#121212',
          'text-dark': '#f4f4f4',
          muted: '#6a6a6a',
          'muted-dark': '#9b9b9b',
          accent: '#b23b18', // Terracotta/Rust accent
          'accent-dark': '#e25b34',
          'accent-light': '#fdf2ee',
          'accent-light-dark': '#1c100b',
          card: '#fbfbfb',
          'card-dark': '#111111',
          border: '#000000',
          'border-dark': '#ffffff',
        }
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
      },
      lineHeight: {
        tightest: '0.85',
        tighter: '1.1',
      }
    },
  },
  plugins: [],
}
