/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    fontFamily: { nanumMyeongjo: ['Nanum Myeongjo'], dmSans: ['DM Sans'] },
  },
  plugins: [require('flowbite/plugin')],
};
