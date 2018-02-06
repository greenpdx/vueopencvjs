import mkAdd from '../tst.wasm'

let wAdd = mkAdd()

// eslint-disable-next-line no-console
console.log('L', wAdd)

async function load() {
  return await wAdd.then(lib => {
    wAdd = lib.instance.exports
    // eslint-disable-next-line no-unused-vars
    let add = wAdd.add_one
    // eslint-disable-next-line no-console
    console.log('OUT', add(41))
    return wAdd
  })
}

function wasmAdd () {
  return load()
}

export default wasmAdd
