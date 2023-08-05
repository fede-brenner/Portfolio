/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'accent-100': '#f0edf8',
        'accent-200': '#d1c8ea',
        'accent-300': '#b2a3db',
        'accent-400': '#937fcd',
        'accent-500': '#745abf',
        'accent-600': '#5b40a5',
        'accent-700': '#473280',
        'accent-800': '#32245c',
        'accent-900': '#32245c',
        'background': '#131418',
        'grayText': '#888888',

      },
      gridTemplateColumns: {
        '16': 'repeat(16, 50px)',
        '16-2': 'repeat(16, 25px)',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(accentColor|background|grayColor)/,
    },
  ],
}

