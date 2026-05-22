/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bgDeep: '#0f0805',
        bg2: '#160d08',
        bg3: '#1d1109',
        gold: '#c8892a',
        goldLit: '#e8b050',
        woodDark: '#1e1008',
        woodMid: '#3c2010',
        woodLit: '#6c3d18',
        text1: '#e8ddc8',
      },
    },
  },
  plugins: [],
}
