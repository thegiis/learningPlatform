import enData from './assets/data/baseData_en.json'
import npData from './assets/data/baseData_np.json'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'learningPlatform',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['nuxt-i18n'],

    i18n: {
        locales: [{
                code: 'en',
                name: 'English'
            },
            {
                code: 'np',
                name: 'Nepali'
            }
        ],
        defaultLocale: 'en',
        vueI18nLoader: true,
        // vuex: { moduleName: 'i18n', syncLocale: true, syncMessages: true, syncRouteParams: true },
        vueI18n: {
            fallbackLocale: 'en',
            messages: {
                en: enData,
                np: npData
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}