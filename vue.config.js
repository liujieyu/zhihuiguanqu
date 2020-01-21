const webpack = require('webpack')
module.exports = {
    baseUrl: '',
    productionSourceMap: false,
    devServer: {
    	// proxy: 'http://192.168.1.30/',
        // proxy: 'http://222.240.238.58:7001/',
        proxy: {
            '/table_war_exploded':{
              target: 'http://localhost:8080/',
              changeOrigin: true
          },
            '':{
              target: 'http://218.75.144.44:7001',//http://117.191.63.186:7001(康苏) http://222.240.238.58:7001/(黄材) http://218.75.144.44:7001/(汪水)
              changeOrigin: true
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
  };
