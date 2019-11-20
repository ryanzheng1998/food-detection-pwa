<template>
    <div class="ion-page">
        <ion-header text-center>
            <ion-toolbar>
                <ion-title>旅遊美食掃描器</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>YOLO v2 tiny</ion-card-subtitle>
                    <ion-card-title>基礎物件 I</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>偵測模型以VOC資料集進行訓練可偵測20種常見的基本物件</p>
                    <ion-button color="tertiary">下載</ion-button>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>YOLO v2 tiny</ion-card-subtitle>
                    <ion-card-title>基礎物件 II</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>偵測模型以MS COCO資料集進行訓練可偵測80種常見的基本物件</p>
                    <ion-button color="tertiary">下載</ion-button>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>UEC100</ion-card-subtitle>
                    <ion-card-title>日式料理</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <p>可偵測常見的食物以及日式料理，共100種類</p>
                    <ion-button color="tertiary">下載</ion-button>
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
export default {
  components: {
    Tabs
  }
}
</script>
