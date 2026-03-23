// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-02-08',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  ssr: false,

  app: {
    head: {
      title: 'MarketMood - Sentiment Sensor',
    },
  },

  runtimeConfig: {
    anthropicApiKey: '',
    braveSearchApiKey: '',
  },
});
