/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green' : '#183E18',
        'l-green' : '#BDD684',
        'dark' : '#080D07',
        'light' : '#F0FCE3'
      },

      boxShadow: {
        'underline': 'inset 0px -1px 0px 0px var(--light-color)',
      }
    },
  },
  plugins: [],
}

