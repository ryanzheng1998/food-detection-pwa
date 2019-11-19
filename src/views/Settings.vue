<template>
    <div class="ion-page">

        <ion-header text-center>
            <ion-toolbar>
                <ion-title>旅遊美食掃描器</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <Tabs />
            <ion-list>
                <ion-item>
                    <ion-label>Language</ion-label>
                    <ion-select value="english" okText="Okay" cancelText="Dismiss" placeholder="English">
                        <ion-select-option value="english">English</ion-select-option>
                        <ion-select-option value="chinese">中文</ion-select-option>
                        <ion-select-option value="japanese">Japanese</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
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
