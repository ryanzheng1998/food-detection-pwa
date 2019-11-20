<template>
<div>
  <div class="ion-page">

    <ion-header text-center>
      <ion-toolbar>
        <ion-title>旅遊美食掃描器</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-list>
            <ion-item>
              <ion-label>請選擇要使用的模型</ion-label>
              <ion-select value="voc" okText="Okay" cancelText="Dismiss" placeholder="基礎物件I">
                  <ion-select-option value="voc">基礎物件I</ion-select-option>
                  <ion-select-option value="coco">基礎物件II</ion-select-option>
                  <ion-select-option value="UEC100">日式料理</ion-select-option>
              </ion-select>
            </ion-item>
        </ion-list>
        <ion-list>
            <ion-item>
            <ion-label>請選擇偵測顯示的語言</ion-label>
            <ion-select value="english" okText="Okay" cancelText="Dismiss" placeholder="中文">
                <ion-select-option value="english">English</ion-select-option>
                <ion-select-option value="chinese">中文</ion-select-option>
                <ion-select-option value="japanese">Japanese</ion-select-option>
            </ion-select>
            </ion-item>
        </ion-list>
      </ion-grid>

      <ion-button color="primary" expand="full" fill="outline" size="large" href="detectionFullScreen">開始偵測</ion-button>

      <ion-card>
        <ion-card-content>
          <ion-icon name="alert" slot="start"></ion-icon>
          公告： 最新的偵測日本料理的模型已經推出
        </ion-card-content>
      </ion-card>

    </ion-content>

    <ion-footer>
        <ion-toolbar>
            <Tabs />
        </ion-toolbar>
    </ion-footer>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue'
import { addIcons } from 'ionicons'
import { alert } from 'ionicons/icons'
addIcons({
  'ios-alert': alert.ios,
  'md-alert': alert.md
})

export default {
  name: 'home',
  components: {
    Tabs
  }
}
</script>
