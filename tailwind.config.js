/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        accent: '#5D42A9',
        background: '#131418',
        grayText: '#888888',

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

