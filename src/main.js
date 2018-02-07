import Vue from 'vue'
import App from './App.vue'

const wasm = require('./main.rs')

wasm.initialize().then(module => {
  const doub = module._doub
  // const tst = module.cwrap('doub', 'number', ['number'])
  console.log('Calling rust functions!')
  console.log(doub(21))
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
