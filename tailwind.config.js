const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
        fontFamily: {
            sans: ['Iosevka Custom,monospace', ...defaultTheme.fontFamily.sans],
        },
        transitionProperty: ['hover', 'focus'],
    },
    colors: {
      blue: colors.blue,
      table: {
        header: '#313131',
        border: '#414141'
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    }
  }
}