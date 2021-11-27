module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        georama: ['Georama', 'sans-serif']
      },

      inset: {
        '1/20': '5%',
        '1/10': '10%'
      },

      width: {
        '2/7': '28.5714286%',
        '5/7': '71.4285714%',
        '39/50': '78%',
        '85': '85%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
