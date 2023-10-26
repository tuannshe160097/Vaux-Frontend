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
        href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        rel:  'stylesheet',
        type: 'text/css'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://s.yimg.com/rz/l/favicon.ico'
      }
    ],
    script: [
      {
        src: 'https://www.google.com/recaptcha/api.js',
        async: true,
        defer: true
      }
    ]
  },

  plugins: [
    '~/plugins/vuelidate.ts',
    '~/plugins/axios.js'
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
      'InputNumber',
      'TieredMenu',
      'DataTable',
      'Column',
      'Tag',
      'Paginator',
      'Calendar',
      'ScrollPanel',
      'RadioButton',
      'Steps',
      'Card',
      'InputMask',
      'Menubar'
    ],
    directives: [
      'Tooltip',
      'Badge'
    ]
  },

  axios: {
    proxy: process.env.NODE_ENV === 'development',
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
          login:  { url: '/api/auth/login',  method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user:   false // { url: '/api/auth/user',   method: 'get' }
        }
      }
    },
    plugins: ['~/plugins/auth.ts']
  },

  styleResources: {
    sass: ['@/assets/styles/main.sass'],
    hoistUseStatements: true
  },

  proxy: {
    '/api/': {
      target: process.env.API_URL,
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
