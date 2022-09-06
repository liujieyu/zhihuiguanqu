const webpack = require('webpack')
module.exports = {
    baseUrl: '',
    productionSourceMap: false,
    devServer: {
    	// proxy: 'http://192.168.1.30/',
    	// proxy: 'http://222.240.238.58:7001/',
        // proxy: 'http://192.100.1.10:8050/',
        proxy: {
            '/':{
              ws:false,
              target: 'http://localhost:8080/',
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
