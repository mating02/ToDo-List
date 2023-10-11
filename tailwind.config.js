/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    extend: {
      width: {
        '18': '4.5rem',
        'screen50': '50vw',
      },
      height: {
        'screen50': '50vh',
      },
      translate: {
        'negX': '-100%',
        'ultNegX': '-300%',
        'negY': '-100%',
      },
      transitionProperty: {
        'trans': 'transform 1s ease',
        'left': 'left 0.5s ease',
      },
      zIndex: {
        'under': '-1',
      },
      gridRowStart: {
        'minus': '-1',
      },
    },
    screens: {
      'sm': {'max': '500px'},
      'md': {'min': '500px','max': '800px'},
      'lg': {'min': '500px'},
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

