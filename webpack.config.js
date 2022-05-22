// webpack.config.js
module.exports = {
    //node: {
    //  crypto: true
    //}

      resolve: {
        fallback: {
          fs: false,
          //crypto: require.resolve("crypto-browserify")
          crypto: false
        }
      }

  };