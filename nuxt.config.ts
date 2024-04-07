// import { resolve } from 'path'

import { APP_TITLE } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'pl_PL'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: ''
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Berserkir Hacknarök 2024'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: 'Berserkir Hacknarök 2024 - The End of the World is Near!'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://hacknarock2024.vercel.app/'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Berserkir Hacknarök 2024'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: '/icons/android-chrome-512x512.png'
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'https://hacknarock2024.vercel.app/icons/android-chrome-512x512.png'
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: 'Berserkir Hacknarök 2024 - The End of the World is Near!'
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: 'Berserkir Hacknarök 2024'
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: 'https://hacknarock2024.vercel.app/icons/android-chrome-512x512.png'
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: ''
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: 'Berserkir Team'
  }
]

const icons = [
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-16x16.png',
    sizes: '16x16'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-32x32.png',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-144x144.png',
    sizes: '144x144'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/android-chrome-192x192.png',
    sizes: '192x192'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/android-chrome-512x512.png',
    sizes: '512x512'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: '/icons/apple-touch-icon.png',
    sizes: '192x192'
  }
]

const locales = [
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
  },
  {
    code: 'no',
    file: 'no.json',
    iso: 'no-NOR',
    name: 'Norsk'
  },
  {
    code: 'sv',
    file: 'swe.json',
    iso: 'sv-SWE',
    name: 'Svenska'
  },
  {
    code: 'old_no',
    file: 'oldNorse.json',
    iso: 'no-NOR',
    name: 'Gammel Norsk'
  }
]

export default defineNuxtConfig({
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
    locales
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
