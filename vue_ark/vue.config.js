const { defineConfig } = require('@vue/cli-service')
//const ElementPlus = require('unplugin-element-plus/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const ElementPlus = require('unplugin-element-plus/webpack')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/api":{
        target:"",
        changeOrigin:true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    plugins: [
      AutoImport({
        eslintrc:{
          enabled:true
        },
        resolvers: [ElementPlusResolver(),IconsResolver({prefix:'Icon'})],
      }),
      Components({
        resolvers: [ElementPlusResolver(),IconsResolver({enabledCollections:['ep']})],
      }),
      Icons({
        autoInstall: true,
      }),
      ElementPlus()
    ],
  },
  chainWebpack:config=>{
    config.plugin('html').tap(args=>{
      args[0].title='Arknights'
      return args
    })
  }
})