module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Iglesia en Camino',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Iglesia en Camino - Semanario de la Archidiócesis de Mérida Badajoz' },
      { hid: 'keywords', name: 'keywords', content: 'Mérida, Merida, merida, Badajoz, badajoz, arzobispado,archidiócesis, archidiocesis, iglesia, camino, españa, España, noticias' }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon.png'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  mode: 'spa',
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    // proxyHeaders: false
  },
  css: [
    'vuetify/dist/vuetify.min.css',
    'material-design-icons-iconfont/dist/material-design-icons.css'

  ],
  // router: {
  //   base: '/datos/web/arzobispado/ic/dist/'
  // }
}
