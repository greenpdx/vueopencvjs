import mkAdd from '../tst.wasm'

let wAdd = mkAdd()

let wasmAdd = wAdd.then(instance => {
  wasmAdd = instance.instance.exports
  // eslint-disable-next-line no-unused-vars
  let add = wasmAdd.add_one
  // eslint-disable-next-line no-console
  console.log('OUT', add(41))
  return wasmAdd
})



export default wasmAdd
