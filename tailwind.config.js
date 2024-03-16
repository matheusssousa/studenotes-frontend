/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: {
          100: '#08EBFC',
          200: '#00BBC9',
          300: '#007A7C',
        },
        neutro: {
          100: '#F2F2F2',
          200: '#ECECEC',
          250: '#D9D9D9',
          300: '#878787',
          400: '#414142',
          500: '#343436',
          600: '#202022',
        },
        vermelho: {
          100: '#F75A68',
          200: '#E93848',
        },
        laranja: {
          100: '#F49220',
          200: '#D27508',
        },
        verde: {
          100: '#A4F420',
          200: '#629B06',
        },
        rosa: {
          100: '#D869EA',
        },
      }
    },
  },
  plugins: [],
}

