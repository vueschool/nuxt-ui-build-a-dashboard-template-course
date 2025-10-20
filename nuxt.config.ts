// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  },

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
