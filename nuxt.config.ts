// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Medallero de los Juegos Olímpicos de Verano',
      meta: [
        {
          name: 'description',
          content: 'Explora el medallero de los Juegos Olímpicos de Verano por país, año y total de medallas.'
        }
      ]
    }
  }
})
