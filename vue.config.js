// vue.config.js
module.exports = {
  chainWebpack: chainableConfig => {
    loaders: [
      {
        test: /\.wasm$/,
        loaders: ['wasm-loader']
      }
    ]
     // modify config with webpack-chain
     // https://github.com/mozilla-neutrino/webpack-chain
  },

  configureWebpack: config => {
    loaders: [
      {
        test: /\.wasm$/,
        loaders: ['wasm-loader']
      }
    ]
    // mutate config directly, or return new config
  },

  // object literal will be merged into base config using webpack-merge
  configureWebpack: {
    loaders: [
      {
        test: /\.wasm$/,
        loaders: ['wasm-loader']
      }
    ]
    // ...
  },
  vue: {
    "lintOnSave": true
  },

}
