<template>
    <div class="ion-page">
        <ion-content>
            <ion-item text-center><ion-label><p ref="loader"></p></ion-label></ion-item>

            <div id="webcam-wrapper" ref="webcamWrapper">
                <div id="rects" ref="rects"></div>
                <video autoplay playsinline muted id="webcam" ref="webcam"></video>
            </div>
            <ion-item text-right><ion-label><p ref="fps"></p></ion-label></ion-item>
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
      language: this.$route.params.language,
      detectionModel: this.$route.params.detectionModel,
      myYolo: {}
    }
  },
  methods: {
    async setupWebCam () {
      console.log('Setting up the webcam')
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          'audio': false,
          'video': { facingMode: 'environment' }
        })
        window.stream = stream
        this.$refs.webcam.srcObject = stream
      }
      console.log('Webcam setup complete')
    },
    async loadModel (modelName) {
      if (this.myYolo.dispose) {
        this.myYolo.dispose()
      }
      console.log(`Loading detection model: ${modelName}`)
      switch (modelName) {
        case 'UEC100 english':
          this.progress(11)
          this.myYolo = await yolo.uec100_tiny_v2()
          break
        case 'UEC100 chinese':
          this.progress(11)
          this.myYolo = await yolo.uec100_tiny_v2_chinese()
          break
        case 'UEC100 japanese':
          this.progress(11)
          this.myYolo = await yolo.uec100_tiny_v2_japanese()
          break
        case 'coco english':
          this.progress(11)
          this.myYolo = await yolo.coco_tiny_v2()
          break
        case 'coco chinese':
          this.progress(11)
          this.myYolo = await yolo.coco_tiny_v2_chinese()
          break
        case 'coco japanese':
          this.progress(11)
          this.myYolo = await yolo.coco_tiny_v2_japanese()
          break
        case 'voc english':
          this.progress(16)
          this.myYolo = await yolo.voc_tiny_v1()
          break
        case 'voc chinese':
          this.progress(16)
          this.myYolo = await yolo.voc_tiny_v1_chinese()
          break
        case 'voc japanese':
          this.progress(16)
          this.myYolo = await yolo.voc_tiny_v1_japanese()
          break
        default:
          console.log('List switch error')
      }
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
      const start = performance.now()
      const boxes = await this.myYolo.predict(this.$refs.webcam, { scoreThreshold: threshold })
      const end = performance.now()

      this.$refs.fps.innerHTML = `fps: ${(1000 / (end - start)).toFixed(2)} f/s`

      this.drawBoxes(boxes)
    },
    drawBoxes (boxes) {
      console.log(boxes)

      this.$refs.rects.innerHTML = ''

      const cw = this.$refs.webcam.clientWidth
      const ch = this.$refs.webcam.clientHeight
      const vw = this.$refs.webcam.videoWidth
      const vh = this.$refs.webcam.videoHeight

      const scaleW = cw / vw
      const scaleH = ch / vh

      this.$refs.webcamWrapper.style.width = `${cw}px`
      this.$refs.webcamWrapper.style.height = `${ch}px`

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
        this.$refs.rects.appendChild(rect)
      })
    },
    progress (totalModel) {
      const loader = this.$refs.loader
      let cnt = 0
      Promise.all = (all => {
        return function then (reqs) {
          console.log(reqs.length)
          if (reqs.length === totalModel && cnt < totalModel * 2) {
            reqs.map(req => {
              return req.then(r => {
                loader.innerHTML = `正在載入模型   ${(++cnt / totalModel * 50).toFixed(1)}`
                if (cnt === totalModel * 2) {
                  loader.innerHTML = '《------請將鏡頭對準要偵測的物體2------》'
                }
              })
            })
          }
          return all.apply(this, arguments)
        }
      })(Promise.all)
    }
  },
  mounted: async function () {
    await this.setupWebCam()
    await this.loadModel(this.detectionModel + ' ' + this.language)
    this.run()
  }
}
</script>

<style lang="scss" scoped>
#webcam {
  width: 100%;
  height: auto;
}
</style>
