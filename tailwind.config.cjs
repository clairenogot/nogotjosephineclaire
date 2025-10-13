module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cozy: {
          50: '#fffaf8',
          100: '#fff2ee',
          200: '#fbd9d0',
          300: '#f6c2b6',
          400: '#f09b88',
          500: '#e67a63',
          600: '#c95d46',
          700: '#9f4636',
          800: '#7a2f26',
          900: '#5a211b'
        }
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(180deg,#fffaf6 0%, #ffe8dd 40%, #f6d7c9 100%)',
        'warm-gradient-dark': 'linear-gradient(180deg,#0f1724 0%, #111827 40%, #0b1220 100%)'
      }
      ,
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        // map serif utilities to Poppins too so any `font-serif` uses Poppins
        serif: ['Poppins', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif']
      }
    }
  },
  plugins: [],
}
