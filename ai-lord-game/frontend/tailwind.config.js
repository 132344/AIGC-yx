/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medieval-dark': '#1a1408',
        'medieval-brown': '#8b4513',
        'medieval-gold': '#d4af37',
        'medieval-silver': '#c0c0c0',
        'medieval-stone': '#4a4a4a',
        'medieval-parchment': '#f5f5dc',
        'medieval-red': '#8b0000',
        primary: '#d4af37',
        secondary: '#8b4513',
        accent: '#d4af37',
        dark: '#1a1408',
        light: '#f5f5dc'
      },
      fontFamily: {
        fantasy: ['Georgia', 'serif'],
        sans: ['Georgia', 'serif']
      },
      boxShadow: {
        'medieval': '0 4px 6px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.2)',
      },
      backgroundImage: {
        'parchment': 'linear-gradient(135deg, #f5f5dc 0%, #e8dcc4 100%)',
        'stone': 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
        'wood': 'linear-gradient(135deg, #8b4513 0%, #5d2e0a 100%)',
      }
    },
  },
  plugins: [],
}
