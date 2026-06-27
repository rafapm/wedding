/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f8f3ea',
        parchment: '#efe4d1',
        beige: '#d8c3a5',
        gold: '#b8945f',
        olive: '#63724f',
        charcoal: '#282622',
        ink: '#171612',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(40, 38, 34, 0.12)',
      },
    },
  },
  plugins: [],
};
