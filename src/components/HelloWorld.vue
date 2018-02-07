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
    <canvas ref="photo" height="480" width="640"></canvas>
    <canvas ref="canvas" height="480" width="640"></canvas>
  </div>
</template>

<script>
import cv from  'opencv.js'
//import mkAdd from '../tst.wasm'
import wasmAdd from './add.es6'

const wasm = require('./main.rs')
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
      wasmAdd: {},
      ctx: null,
      src: null,
      dst: null
    }
  },
  beforeCreate () {
    let wAdd = wasmAdd()

    // eslint-disable-next-line no-console
//    console.log('BC', wasmAdd, wAdd)

    wAdd.then(lib => {
      this.wasmAdd = lib
      console.log('CREATE', lib)
    })
  },

  created () {
//    let wAdd = wasmAdd()
    navigator.mediaDevices.enumerateDevices()
      .then((devs) => {
        // eslint-disable-next-line no-console
        console.log('CR', devs)
      })

    // eslint-disable-next-line no-console
    // console.log('CR', devs)
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
    //console.log('MNT', wasmAdd)

    let constraints = {audio: false, video: true}
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
        console.log('MNTERR',err)
      })
  },
  methods: {
    processVideo () {
      let begin = Date.now()
      let width = this.video.width
      let height = this.video.height
      this.ctx.drawImage(this.video, 0, 0, 640, 480)
      this.src.data.set(this.ctx.getImageData(0, 0, 640, 480).data)

      cv.cvtColor(this.src, this.dst1, cv.COLOR_RGBA2GRAY, 0)
      let ksize = new cv.Size(5,5)
      cv.medianBlur(this.dst1, this.dst, 15)
      // cv.GaussianBlur(this.dst1, this.dst2, ksize, 3, 3, cv.BORDER_DEFAULT)
      let contours = new cv.MatVector()
      let hierarchy = new cv.Mat()
      // cv.adaptiveThreshold(this.dst1, this.dst, 100, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2)
      // cv.Canny(this.dst2, this.dst, 60, 100, 3, false)
      cv.findContours(this.dst1, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)
      // console.log(contours.size(), hierarchy)



//      for (let i = 0; i < contours.size(); ++i) {
 //       cv.drawContours(this.dst, contours, i, new cv.Scalar(0,0,0,128) , 1, cv.LINE_8, hierarchy, 100)
   //   }
      contours.delete()
      hierarchy.delete()
      cv.imshow(this.photo, this.dst)

      let delay = 1000 / 10 - (Date.now() - begin)
      setTimeout(this.processVideo, delay)
    },
    // eslint-disable-next-line no-unused-vars
    play (evt) {
      // eslint-disable-next-line no-console
      this.video.play()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Really')
          this.ctx = this.canvas.getContext('2d')
          this.src = new cv.Mat(480, 640, cv.CV_8UC4)
          this.dst = new cv.Mat(480, 640, cv.CV_8UC4)
          this.dst1 = new cv.Mat(480, 640, cv.CV_8UC1)
          this.dst2 = new cv.Mat(480, 640, cv.CV_8UC1)

          setTimeout(this.processVideo, 0)
        })
        // eslint-disable-next-line no-console
        .catch((err) => {console.log('LOAD',err)})

      console.log('playbtn', this.wasmAdd)
    },
    // eslint-disable-next-line no-unused-vars
    take (evt) {
      this.video.play()
      ctx.drawImage(this.video, 0, 0, 640, 480)
      let imgData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      //context.fillRect(0,0,)
      let data = this.canvas.toDataURL('image/png')
      let mat = cv.matFromImageData(imgData)
      console.log(mat)
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
/*      setTimeout(() => {

        this.video.play()
        // eslint-disable-next-line no-console
        .then(() => {console.log('Really')})
        // eslint-disable-next-line no-console
        .catch((err) => {console.log('LOAD',err)})
      }, 2000) */
    },
    // eslint-disable-next-line no-unused-vars
    playing (evt) {
      // eslint-disable-next-line no-console
      console.log('playing')
      this.video.play()
//        .then(() => {console.log('Really playing')})
    }
  },
  watch: {
//    wasmAdd: function (val) {
//      // eslint-disable-next-line no-console
//      console.log('watch', val)
//    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
canvas {
}
img {
  border: 2px solid black;
}
a {
  color: #42b983;
}
</style>
