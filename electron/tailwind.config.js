const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/*.tsx', './src/renderer/**/*.jsx'],
  mode: 'jit',
  theme: {
    colors: {
      // add other colors in here

      // import all colors for a wide range of pick
      ...colors,
    },
    extend: {
      backgroundImage: {
        'background': "url('/assets/canteen_back.png')",
      }
    },
  },
  plugins: [],
};
