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
              target: 'http://117.191.63.186:7001/',
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
