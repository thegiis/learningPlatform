import enData from "./assets/data/baseData_en.json";
import npData from "./assets/data/baseData_np.json";

const modalName = "ncp";

export default {
  env: {
    modalName,
  },
  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "learningPlatform",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["bulma", "@/assets/styles/base-styles.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/youtube.js", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["nuxt-i18n", ["cookie-universal-nuxt", { alias: "cookiz" }]],

  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "np",
        name: "नेपाली",
      },
    ],
    defaultLocale: "en",
    vueI18nLoader: true,
    silentFallbackWarn: true,
    // vuex: { moduleName: 'i18n', syncLocale: true, syncMessages: true, syncRouteParams: true },
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: enData,
        np: npData,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    fallback: "404.html",
    dir: modalName,
  },
  router: {
    base: "/" + modalName,
  },
};
