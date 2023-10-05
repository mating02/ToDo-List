/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    extend: {
      width: {
        '18': '4.5rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

