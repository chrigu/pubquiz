// Example `tailwind.config.js` file
const colors = require('tailwindcss/colors')

module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
