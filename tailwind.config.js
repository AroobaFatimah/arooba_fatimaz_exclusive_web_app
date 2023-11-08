/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#F5F5F5",
        "pink" : "#DB4444",
      },
      width: {
        '1380': '1380px',
      },
      height: {
        '300': '300px',
        '350': '350px',
      },
    },
  },
  plugins: [],
}