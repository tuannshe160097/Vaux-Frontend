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
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        rel:  'stylesheet'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://s.yimg.com/rz/l/favicon.ico'
      }
    ]
  },

  plugins: [
    '~/plugins/vuelidate.ts', '~/plugins/filters.ts'
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
      'Badge',
      'BadgeDirective',
      'BlockUI',
      'Button',
      'Breadcrumb',
      'Calendar',
      'Carousel',
      'Checkbox',
      'Column',
      'ConfirmDialog',
      'DataTable',
      'DataView',
      'Dialog',
      'Dropdown',
      'FileUpload',
      'Galleria',
      'InputMask',
      'InputNumber',
      'InputText',
      'ImagePreview',
      'OrderList',
      'Paginator',
      'PanelMenu',
      'ScrollPanel',
      'TabView',
      'TabPanel',
      'Tag',
      'Textarea',
      'TieredMenu',
      'Toast',
      'DataView',
      'DataViewLayoutOptions',
      'Chart',
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
      logout: '/authen/login',
      home: '/'
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
