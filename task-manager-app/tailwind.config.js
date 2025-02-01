module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E40AF',  // Adding a custom blue color
        'custom-gray': '#6B7280',  // Custom gray color
      },
      spacing: {
        '128': '32rem',  // Custom spacing size (e.g., 128)
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',  // Custom fade-in animation
        slideUp: 'slideUp 1s ease-out forwards',  // Custom slide-up animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
