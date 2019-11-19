<template>
    <div class="ion-page">
        <ion-header text-center>
            <ion-toolbar>
                <ion-title>旅遊美食掃描器</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <Tabs />
            <p>這是一款爲旅行者設計偵測食物的應用程式。</p>
            <p>開發人員： 鄭聖玄、金鑒修</p>
        </ion-content>
    </div>
</template>
<script>
import Tabs from '@/components/Tabs.vue'
export default {
  components: {
    Tabs
  }
}
</script>
