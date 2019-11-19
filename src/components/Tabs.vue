<template>
    <ion-tabs>
        <ion-tab tab="addModel">
        </ion-tab>

        <ion-tab tab="settings">
        </ion-tab>

        <!-- Get matched routes with a helper method -->
        <ion-tab tab="about">
        </ion-tab>

      <!-- Use v-slot:bottom with Vue ^2.6.0 -->
        <template slot="bottom">
            <ion-tab-bar>
            <ion-tab-button tab="">
                <ion-icon name="camera"></ion-icon>
                <ion-label>偵測</ion-label>
            </ion-tab-button>

            <!-- Provide a custom route to navigate to -->
            <ion-tab-button tab="addModel">
                <ion-icon name="add-circle"></ion-icon>
                <ion-label>加入模型</ion-label>
            </ion-tab-button>

            <!-- Provide extra data to route -->
            <ion-tab-button tab="settings">
                <ion-icon name="settings"></ion-icon>
                <ion-label>設定</ion-label>
            </ion-tab-button>

            <!-- Provide custom click handler -->
            <ion-tab-button tab="about">
                <ion-icon name="information-circle"></ion-icon>
                <ion-label>關於</ion-label>
            </ion-tab-button>
            </ion-tab-bar>
        </template>
    </ion-tabs>
</template>

<script>
import { addIcons } from 'ionicons'
import { settings, camera, addCircle, informationCircle } from 'ionicons/icons'
addIcons({
  'ios-settings': settings.ios,
  'md-settings': settings.md,
  'ios-camera': camera.ios,
  'md-camera': camera.md,
  'ios-add-circle': addCircle.ios,
  'md-add-circle': addCircle.md,
  'ios-information-circle': informationCircle.ios,
  'md-information-circle': informationCircle.md
})
export default {
}
</script>
