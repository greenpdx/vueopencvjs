<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button @click="take">Take</button>
    <button @click="play">Play</button><br>
    <video ref="video" autoplay height="480" width="640"
      @canplay="canplay"
      @loadedmetadata="loaded"
      @loadeddata="loaded"
      @playing="playing"></video><br>
    <img ref="photo" height="480" width="640"/>
    <canvas ref="canvas" height="480" width="640"></canvas>
  </div>
</template>

<script>
// import './cv'
//import mkAdd from '../tst.wasm'
import wasmAdd from './add.js'
//const wasmAdd = mkAdd()
/*
wasmAdd.then(instance => {
  var wasmAdd = instance.instance.exports
  // eslint-disable-next-line no-unused-vars
  let add = wasmAdd.add_one
  // eslint-disable-next-line no-console
  console.log('OUT', add(41))
})
*/
// eslint-disable-next-line no-console
console.log('O', wasmAdd)

// const wasmAdd =

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      video: null,
      canvas: null,
      photo: null,
      stream: null,
      wasmAdd: null
    }
  },
  created () {
    // eslint-disable-next-line no-console
    console.log('CR', wasmAdd)

    this.wasmAdd = wasmAdd
/*    wasmAdd.then(instance => {
      this.wasmAdd = instance.instance.exports
      // eslint-disable-next-line no-unused-vars
      let add = this.wasmAdd.add_one
      // eslint-disable-next-line no-console
      console.log('CREATE', instance, add(41), this.wasmAdd)

    })
*/
/*
    fetch('tst.wasm')
      .then(response => {
        // eslint-disable-next-line no-console
        console.log('C0', response)
        return response.arrayBuffer()
      })
      .then(bytes => {
        // eslint-disable-next-line no-console
        console.log('C1', String.fromCharCode.apply(null, new Uint8Array(bytes)))
        return WebAssembly.instantiate(bytes, {})
      })
      .then(rslt => {
        // eslint-disable-next-line no-console
        console.log('C2', rslt)
        alert(rslt.instance.exports.add_one(41))
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('ERR', err)
      }) */
  },
  beforeMount () {
    // eslint-disable-next-line no-console
    //console.log('BEFOREMOUNTED', this.$refs.video)
  },
  mounted () {
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
    this.photo = this.$refs.photo

    // eslint-disable-next-line no-console
    // console.log('MNT', wasmAdd.add_one(41))

    // eslint-disable-next-line no-console
    console.log('MNT', this.add(41))

    let constraints = {audio: true, video: true}
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        let video = this.video
        video.srcObject = stream
        // eslint-disable-next-line no-unused-vars
//        video.onloadedmetadata = (e) => {
          // eslint-disable-next-line no-console
//          console.log(e)
//          video.play()
//        }
        this.stream = stream
        // eslint-disable-next-line no-console
        console.log('inline play')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    add (num) {
      return wasmAdd.add_one(num)
    },
    // eslint-disable-next-line no-unused-vars
    play (evt) {
      // eslint-disable-next-line no-console
      console.log('playbtn')
      this.video.play()
    },
    // eslint-disable-next-line no-unused-vars
    take (evt) {
      this.video.play()
      let context = this.canvas.getContext('2d')
      context.drawImage(this.video, 0, 0, 640, 480)
      //context.fillRect(0,0,)
      let data = this.canvas.toDataURL('image/png')
      this.photo.setAttribute('src', data)
    },
    // eslint-disable-next-line no-unused-vars
    canplay (evt) {
      // eslint-disable-next-line no-console
      console.log('can play')
    },
    // eslint-disable-next-line no-unused-vars
    loaded (evt) {
      // eslint-disable-next-line no-console
      console.log('loaded')
      setTimeout(() => {

      this.video.play()
        // eslint-disable-next-line no-console
        .then(() => {console.log('Really')})
        // eslint-disable-next-line no-console
        .catch((err) => {console.log(err)})
      }, 2000)

    },
    // eslint-disable-next-line no-unused-vars
    playing (evt) {
      // eslint-disable-next-line no-console
      console.log('playing')
      this.video.play()
//        .then(() => {console.log('Really playing')})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
canvas {
  visibility: hidden;
}
img {
  border: 2px solid black;
}
a {
  color: #42b983;
}
</style>
