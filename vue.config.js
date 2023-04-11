const { defineConfig } = require('@vue/cli-service')
const cdn = {
  js: [
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://unpkg.com/vue-router@4',
    'https://cdn.jsdelivr.net/npm/axios@1.3.5/dist/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vant/4.1.2/vant.js',
    'https://cdn.bootcdn.net/ajax/libs/vee-validate/4.8.4/vee-validate.js',
    'https://unpkg.com/mitt/dist/mitt.umd.js'
  ],
  css: ['https://cdn.bootcdn.net/ajax/libs/vant/4.1.2/index.css']
}
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.when(process.env.VUE_APP_ENV === 'pro', (config) => {
      config.entry('app').clear().add('./src/main_pro.ts')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vant: 'vant',
        mitt: 'mitt'
      })
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        args[0].cdn = cdn
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main_dev.ts')

      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
  }
})
