/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0571c2',
          50: 'rgba(5, 113, 194, 0.07)',
          100: 'rgba(5, 113, 194, 0.14)',
          200: 'rgba(5, 113, 194, 0.25)',
          700: '#045a9b',
        },
        navy: {
          DEFAULT: '#1e242e',
          90: 'rgba(30, 36, 46, 0.9)',
          70: 'rgba(30, 36, 46, 0.7)',
          50: 'rgba(30, 36, 46, 0.5)',
          15: 'rgba(30, 36, 46, 0.15)',
          8: 'rgba(30, 36, 46, 0.08)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
