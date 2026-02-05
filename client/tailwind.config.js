module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // Emerald Green
        secondary: "#34d399",
        accent: "#059669",
        background: "#f0fdf4",
        surface: "#ffffff",
        text: {
          main: '#333333',
          muted: '#666666'
        }
      },
      fontFamily: {
        sans: ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
