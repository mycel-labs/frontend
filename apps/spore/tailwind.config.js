import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './renderer/**/*.{js,ts,jsx,tsx}',
    './../../packages/shared/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      sans: ['DotGothic16', ...defaultTheme.fontFamily.sans],
      title: ['VCRosdNEUE', ...defaultTheme.fontFamily.sans],
      mono: ['DotGothic16', ...defaultTheme.fontFamily.mono],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: 'var(--c-primary)',
        secondary: 'var(--c-secondary)',
        dark: 'var(--c-dark)',
        light: 'var(--c-light)',
      },
      boxShadow: {
        solid: '0px 6px var(--c-dark)',
        'solid-sm': '0px 4px var(--c-dark)',
        'solid-xs': '0px 2px var(--c-dark)',
        'solid-xxs': '0px 1px var(--c-dark)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
