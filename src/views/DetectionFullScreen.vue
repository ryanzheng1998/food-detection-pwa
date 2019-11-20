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
      webcam: {}
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
      console.log('Loading detection model')

      console.log('Model loaded')
    }
  },
  mounted: function () {
    window.addEventListener('load', async () => {
      await this.setupWebCam()
      await this.loadModel('v1')
      console.log(yolo)
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
