// import { resolve } from 'path'

import { APP_TITLE } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: ''
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: ''
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: ''
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: ''
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: ''
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: ''
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: ''
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: ''
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: ''
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: ''
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: ''
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: ''
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: ''
  }
]

const icons = [
  {
    rel: 'icon',
    type: 'image/png',
    href: '',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '',
    sizes: '192x192'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: '',
    sizes: '192x192'
  }
]

export default defineNuxtConfig({
  // ssr: false,

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in'
    },
    head: {
      title: APP_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          name: 'msapplication-TileImage',
          content: ''
        },
        ...properties,
        ...twitterProperties
      ],
      link: [...icons],
      htmlAttrs: {
        lang: 'pl'
      }
    }
  },

  nitro: {
    // prerender: {
    //   routes: ['/sitemap.xml']
    // }
  },

  css: [
    '@/assets/css/flowbite.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
    '@/assets/css/treeview.css',
    'vue3-treeview/dist/style.css'
  ],

  components: true,

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  pwa: {
    devOptions: { enabled: true },
    registerType: 'autoUpdate',
    manifest: {
      name: 'Berserkir Hacknarök 2024',
      short_name: 'Berserkir 2024',
      theme_color: '#ffffff',
      icons: icons.map((icon) => ({
        ...icon,
        src: icon.href
      }))
    }
  },

  /**
   * i18n Config
   * Official module: https://nuxt.com/modules/i18n
   */
  i18n: {
    defaultLocale: 'pl',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: 'en',
      redirectOn: 'root',
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: true
    },
    langDir: 'lang/',
    lazy: true,
    locales: [
      {
        code: 'pl',
        file: 'pl.json',
        iso: 'pl-PL',
        name: 'Polski'
      },
      {
        code: 'en',
        file: 'en.json',
        iso: 'en-US',
        name: 'English'
      },
      {
        code: 'de',
        file: 'de.json',
        iso: 'de-DE',
        name: 'Deutsch'
      },
      {
        code: 'fr',
        file: 'fr.json',
        iso: 'fr-FR',
        name: 'Français'
      }
    ]
  },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEWSAPI_API_KEY: process.env.NEWSAPI_API_KEY
  }
})
