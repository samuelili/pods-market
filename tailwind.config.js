export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        'img': 'rgba(0, 0, 0, 0.3)',
        'hover': 'rgba(0, 0, 0, 0.2)',
        'secondary-text': 'rgba(208, 239, 246, 0.7)',
        'ink': {
          '1': 'rgba(0, 0, 0, 0.1)',
          '2': 'rgba(0, 0, 0, 0.2)',
          '3': 'rgba(0, 0, 0, 0.3)',
          '4': 'rgba(0, 0, 0, 0.4)',
          '5': 'rgba(0, 0, 0, 0.5)',
          '6': 'rgba(0, 0, 0, 0.6)',
          '7': 'rgba(0, 0, 0, 0.7)',
          '8': 'rgba(0, 0, 0, 0.8)',
          '9': 'rgba(0, 0, 0, 0.9)',
        }
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
