export default {
  ssr: false,

  target: 'static',

  head: {
    title: 'VAUX',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        href: 'https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700;900&display=swap',
        rel:  'stylesheet',
        type: 'text/css'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://s.yimg.com/rz/l/favicon.ico'
      }
    ]
  },

  plugins: [
    '~/plugins/vuelidate.ts'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build'
  ],

  modules: [
    'primevue/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],
  // PrimeVue Config
  primevue: {
    theme:      'bootstrap4-light-blue',
    ripple:     true,
    components: [
      'InputText',
      'Button',
      'Checkbox',
      'DataTable',
      'Dialog',
      'Dropdown',
      'InputText',
      'TieredMenu',
      'DataTable',
      'Column',
      'Tag',
      'Paginator',
      'Calendar',
      'ScrollPanel',
      'InputMask',
      'Toast',
      'Textarea',
      'ConfirmDialog'
    ],
    directives: [
      'Tooltip',
      'Badge'
    ]
  },

  axios: {
    // proxy: process.env.NODE_ENV === 'development',
    baseURL: 'https://localhost:6565'
  },

  auth: {
    rewriteRedirects: true,
    strategies: {
      local: {
        token: {
          property: 'token',
          global:   true,
          required: true
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          login:  { url: '/api/VerifyOtp',  method: 'post' },
          logout: false, // { url: '/api/auth/logout', method: 'post' },
          user:   false // { url: '/api/auth/user',   method: 'get' }
        }
      }
    },
    plugins: ['~/plugins/auth.ts'],
    redirect: {
      logout: '/login',
      home: '/dashboard'
    }
  },

  styleResources: {
    sass: ['@/assets/styles/main.sass'],
    hoistUseStatements: true
  },

  proxy: {
    '/api/': {
      target: process.env.BE_API_URL,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },

  server: {
    port: process.env.SERVER_PORT
  },

  build: {
    babel: {
      compact: true,
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { 'loose': true }]
      ]
    }
  }
}
