export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        'img': 'rgba(0, 0, 0, 0.3)',
        'hover': 'rgba(0, 0, 0, 0.2)',
        'secondary-text': 'rgba(208, 239, 246, 0.7)'
      },
      screens: {
        'md': '720px',
        'lg': '1280px',
      },
      spacing: {
        'layout': "var(--spacing-layout)"
      }
    },
  },
  plugins: [],
};
