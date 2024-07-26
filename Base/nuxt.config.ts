// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  runtimeConfig: {
    apiSecret: '1235',
    public: {
      apiBase: 'http://127.0.0.1:8000/api'
    }
  },

  app: {
    head: {
      title: "Cam2Rescue",
      meta: [{name: 'description', content: 'An Online Platform for pet recue and shelter'}],
      charset: "utf-8",
      viewport: "width-device-width, initial-scale=1",
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    display: "swap",
    families: {
      Inter: true
    }
  },

  devtools: {enabled: true},

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-07-26',
})