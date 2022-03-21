const plugin = require('tailwindcss/plugin')
const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    skeletonScreen: ({ colors }) => ({
      DEFAULT: {
        baseColor: colors.zinc[300],
        movingColor: `linear-gradient(to right, transparent 0%, ${colors.zinc[200]} 50%, transparent 100%)`,
        duration: '1s',
        timing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      dark: {
        baseColor: colors.zinc[500],
        movingColor: `linear-gradient(to right, transparent 0%, ${colors.zinc[400]} 50%, transparent 100%)`,
        duration: '1s',
        timing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    }),
    gridTemplateAreas: {
      'person-header': ['image names names', 'image bio bio'],
    },
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
      screens: {
        msm: { max: parseInt(screens.sm) - 1 + 'px' },
        'btw-sm-md': { min: parseInt(screens.sm) - 1 + 'px', max: screens.md },
        'btw-md-lg': { min: parseInt(screens.md) - 1 + 'px', max: screens.lg },
        'btw-lg-xl': { min: parseInt(screens.lg) - 1 + 'px', max: screens.xl },
        'btw-xl-2xl': {
          min: parseInt(screens.xl) - 1 + 'px',
          max: screens['2xl'],
        },
      },
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@savvywombat/tailwindcss-grid-areas'),
    require('@gradin/tailwindcss-skeleton-screen'),
    require('@tailwindcss/typography'),
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('hocus-within', ['&:hover', '&:focus-within'])
    }),
  ],
}
