module.exports = {
  server: {
    port: process.env.PORT,
    host: "localhost",
  },

  mode: "spa",
  ssr: false,

  env: {
    baseUrl: process.env.BASE_URL,
  },

  head: {
    htmlAttrs: { lang: "ru" },
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
  },

  components: true,

  telemetry: false,

  loading: false,
  loadingIndicator: false,

  router: { prefetchLinks: false },

  modules: ["@nuxtjs/axios"],

  css: ["@/node_modules/bootstrap/dist/css/bootstrap.min.css"],

  axios: { baseURL: process.env.BASE_URL },

  plugins: [{ src: "~/plugins/persistedState.client.js" }],

  build: {
    extractCSS: true,
  },
};
