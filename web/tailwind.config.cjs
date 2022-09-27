/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
      sans: ['inter', 'sans-serif']
    },
    extend: {
      screens:{
        // Novo tamanho de tela
        'xs': '465px',
        ...defaultTheme.screens,
        'xs': {'min': '465px', 'max': '639px'}
      },
      backgroundImage:{
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 27.08%, #43E7AD 33.94%, #E1D55D 40.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'

      },
      grayscale: {
        50: '50%',
      }
    },
  },
  plugins: [],
}
