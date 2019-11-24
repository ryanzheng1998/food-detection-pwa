<template>
    <div class="ion-page">
        <ion-header text-center>
            <ion-toolbar>
                <ion-title>旅遊美食掃描器</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-card>
              <ion-card-content>
                <ion-icon name="alert" slot="start"></ion-icon>
                下載模型即可離線使用
              </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>YOLO v2 tiny</ion-card-subtitle>
                    <ion-card-title>基礎物件 I</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>偵測模型以VOC資料集進行訓練可偵測20種常見的基本物件</p>
                    <ion-button @click="downloadVoc"  color="tertiary" ref="vocButton">下載</ion-button>
                    <p ref="vocLoader"></p>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>YOLO v2 tiny</ion-card-subtitle>
                    <ion-card-title>基礎物件 II</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>偵測模型以MS COCO資料集進行訓練可偵測80種常見的基本物件</p>
                    <ion-button @click="downloadCoco" color="tertiary" ref="cocoButton">下載</ion-button>
                    <p ref="cocoLoader"></p>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>UEC100</ion-card-subtitle>
                    <ion-card-title>日式料理</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <p>可偵測常見的食物以及日式料理，共100種類</p>
                    <ion-button @click="downloadUec100" color="tertiary" ref="uecButton">下載</ion-button>
                    <p ref="uecLoader"></p>
                </ion-card-content>
            </ion-card>
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
    }
  },
  methods: {
    async downloadVoc () {
      this.$refs.vocButton.style.display = 'none'
      this.progress(16, this.$refs.vocLoader)
      this.myYolo = await yolo.voc_tiny_v1()
      global.vocDownloaded = 1
    },
    async downloadCoco () {
      this.$refs.cocoButton.style.display = 'none'
      this.progress(11, this.$refs.cocoLoader)
      this.myYolo = await yolo.coco_tiny_v2()
      global.cocoDownloaded = 1
    },
    async downloadUec100 () {
      this.$refs.uecButton.style.display = 'none'
      this.progress(11, this.$refs.uecLoader)
      this.myYolo = await yolo.uec100_tiny_v2()
      global.uecDownloaded = 1
    },
    progress (totalModel, loader) {
      let cnt = 0
      Promise.all = (all => {
        return function then (reqs) {
          console.log(reqs.length)
          if (reqs.length === totalModel && cnt < totalModel * 2) {
            reqs.map(req => {
              return req.then(r => {
                loader.innerHTML = `正在下載模型   ${(++cnt / totalModel * 50).toFixed(1)}`
                if (cnt === totalModel * 2) {
                  loader.innerHTML = '已下載完成'
                }
              })
            })
          }
          return all.apply(this, arguments)
        }
      })(Promise.all)
    }
  },
  mounted () {
    if (global.vocDownloaded === 1) {
      this.$refs.vocButton.style.display = 'none'
      this.$refs.vocLoader.innerHTML = '已下載'
    }
    if (global.cocoDownloaded === 1) {
      this.$refs.cocoButton.style.display = 'none'
      this.$refs.cocoLoader.innerHTML = '已下載'
    }
    if (global.uecDownloaded === 1) {
      this.$refs.uecButton.style.display = 'none'
      this.$refs.uecLoader.innerHTML = '已下載'
    }
  }
}
</script>
