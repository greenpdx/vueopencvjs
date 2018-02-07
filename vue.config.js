// vue.config.js
module.exports = {
  chainWebpack: chainableConfig => {
     // modify config with webpack-chain
     // https://github.com/mozilla-neutrino/webpack-chain
  },
  chainWebpack: webpackConfig => {
    webpackConfig.module
     .rule('wasm')
       .test(/.wasm$/)
       .use('wasm-loader')
       .loader('wasm-loader'),
//  },
//  chainWebpack: webpackConfig => {
    webpackConfig.module
     .rule('rust')
       .test(/.rs$/)
       .use('rust-wasm-loader')
       .loader('rust-wasm-loader')
       .options({
           path: 'build/'
       })
  },
  configureWebpack: config => {
    // mutate config directly, or return new config
  },

  // object literal will be merged into base config using webpack-merge
  configureWebpack: {
    // ...
  },
//  vue: {
//    "lintOnSave": true
//  },

}
