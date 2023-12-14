// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/image"],

  ui: {
    global: true
  }
})