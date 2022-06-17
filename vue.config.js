const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: ['vuetify'],
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",    //重写api为空
                },
            }
        }
    },
    productionSourceMap: false,
})
