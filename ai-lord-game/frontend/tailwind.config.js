/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#f59e0b',
        dark: '#1e293b',
        light: '#f8fafc'
      },
      fontFamily: {
        fantasy: ['MedievalSharp', 'cursive'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
