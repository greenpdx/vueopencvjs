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
import add from '../tst.wasm'

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
      stream: null
    }
  },
  created () {
    let t = add(41)
    // eslint-disable-next-line no-console
    console.log('CREATE', t)
    fetch('./tst.wasm')
      .then(resp => resp.arrayBuffer())
      .then(bytes => WebAssembly.instantiate(bytes, {}))
      .then(rslt => {
        alert(rslt.instance.exports.add_one(41))
      })
  },
  beforeMount () {
    // eslint-disable-next-line no-console
    //console.log('BEFOREMOUNTED', this.$refs.video)
  },
  mounted () {
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
    this.photo = this.$refs.photo

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
