<template>
    <div class="ion-page">
        <ion-content>
            <ion-item text-center><ion-label>《------請將鏡頭對準要偵測的物體2------》</ion-label></ion-item>

            <div id="webcam-wrapper">
                <div id="loader"></div>
                <div id="spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
                <div id="rects"></div>
                <video autoplay playsinline muted id="webcam"></video>
            </div>

            <p id="fps"></p>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <Tabs />
            </ion-toolbar>
        </ion-footer>

    </div>
</template>
<script>
import Tabs from '@/components/Tabs.vue'
import yolo from 'my_tfjs_yolo'

export default {
  components: {
    Tabs
  },
  data () {
    return {
      myYolo: {}
    }
  },
  methods: {
    async setupWebCam () {
      const webcam = document.getElementById('webcam')
      console.log('Setting up the webcam')
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          'audio': false,
          'video': { facingMode: 'enviroment' }
        })
        window.stream = stream
        webcam.srcObject = stream
      }
      console.log('Webcam setup complete')
    },
    async loadModel (modelName) {
      console.log(`Loading detection model: ${modelName}`)
      this.myYolo = await yolo.coco_tiny_v2()
      console.log('Model loaded')
    },
    async run () {
      let interval = 1
      if (this.myYolo) {
        let threshold = 0.3
        await this.predict(threshold)
      }
      setTimeout(this.run, interval * 100)
    },
    async predict (threshold) {
      const webcam = document.getElementById('webcam')
      const start = performance.now()
      const boxes = await this.myYolo.predict(webcam, { scoreThreshold: threshold })
      const end = performance.now()

      // fix this
      const fps = document.getElementById('fps')
      fps.innerHTML = `fps: ${(1000 / (end - start)).toFixed(2)} f/s`

      this.drawBoxes(boxes)
    },
    drawBoxes (boxes) {
      console.log(boxes)

      // fix this
      const rects = document.getElementById('rects')
      const webcam = document.getElementById('webcam')
      const wrapper = document.getElementById('webcam-wrapper')
      rects.innerHTML = ''

      const cw = webcam.clientWidth
      const ch = webcam.clientHeight
      const vw = webcam.videoWidth
      const vh = webcam.videoHeight

      const scaleW = cw / vw
      const scaleH = ch / vh

      console.log(webcam.clientWidth)
      console.log(webcam.videoWidth)

      wrapper.style.width = `${cw}px`
      wrapper.style.height = `${ch}px`

      boxes.map((box) => {
        const rect = document.createElement('div')
        // rect.className = 'rect'
        rect.style.position = 'absolute'
        rect.style.border = '2px dashed'
        rect.style.top = `${box['top'] * scaleH}px`
        rect.style.left = `${box['left'] * scaleW}px`
        rect.style.width = `${box['width'] * scaleW - 4}px`
        rect.style.height = `${box['height'] * scaleH - 4}px`
        rect.style.borderColor = 'red'

        console.log(rect)

        const text = document.createElement('div')
        text.className = 'text'
        text.innerText = `${box['class']} ${box['score'].toFixed(2)}`
        text.style.color = 'red'

        rect.appendChild(text)
        rects.appendChild(rect)
      })
    }
  },
  mounted: function () {
    window.addEventListener('load', async () => {
      await this.setupWebCam()
      // await this.loadModel('v1')
      // this.run()
    })
  }
}
</script>

<style lang="scss" scoped>
#webcam {
  width: 100%;
  height: auto;
}
</style>
