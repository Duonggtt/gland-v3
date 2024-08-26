/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
}

export const theme = {
  screens: {
    'xs': {'min': '320px', 'max': '640px'},
    'sm': {'min': '640px', 'max': '768px'},
    'md': {'min': '768px', 'max': '1024px'},
    'lg': {'min': '1024px', 'max': '1280px'},
    'xl': {'min': '1280px', 'max': '1536px'},
    '2xl': '1536px',
    'phone': {'min': '320px', 'max': '1024px'},
    'desktop': {'min':"1024px"}
  },
  extend: {
    colors: {
      'purple-900': '#2E2E48',
      'purple-500': '#59598E',
      night: '#1d2432',
      sun: '#f9fafb',
    },
  },
}
// export const darkMode = 'body'

