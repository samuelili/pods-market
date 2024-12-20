export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        'img': 'rgba(0, 0, 0, 0.3)',
        'secondary-text': 'rgba(208, 239, 246, 0.7)'
      },
      screens: {
        'md': '720px',
        'lg': '1280px',
      }
    },
  },
  plugins: [],
};
