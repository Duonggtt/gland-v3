// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    usePrimeVue: true,
    components: {
      prefix: 'Prime',
      include: ['Button', 'DataTable']    /* Used as <PrimeButton /> and <PrimeDataTable /> */
  }
  },
  css: ['~/assets/css/main.css'],
  plugins: ["~/plugins/common.ts"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-07-03',
})