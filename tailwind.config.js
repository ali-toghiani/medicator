/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    [
      require('tailwindcss'),
      require('autoprefixer'),
      require('tailwindcss-themer')({
        defaultTheme: {
          extend: {
            colors: {
              widget: "#f5f6f7",
              darkBlue: "#2720ff",
              lightBlue: "#4A90E2",
              oceanBlue: "#67dcff",
              highlightBlue: "#bac7f5",
              teal: '#50BFA5',
              coral: '#FF6B6B',
              lightGray: '#F4F4F4',
              charcoal: '#333333',
            }
          }
        }
      })
    ],
  ],
}

