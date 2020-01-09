# Food Detector for Traveler

這是一款專為旅行者打造偵測食物的手機應用程式。

## Demo
[Video](https://drive.google.com/a/gm2.nutn.edu.tw/file/d/1ZSFbklfeETxEqaqW_FbyZOx-ViFvEZBp/view?usp=sharing)

[PWA website](https://food-detection-pwa.web.app/)

## Getting Started
### Installing
```
npm install
npm install tfjs-yolo-tiny
```
需在src/views/DetectionFullScreen.vue中手動設定[tfjs-yolo-tiny](https://www.npmjs.com/package/tfjs-yolo-tiny)函式庫來取代my_tfjs_yolo的引入


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Cite
[YOLO-LITE Object Detection Model](https://arxiv.org/pdf/1811.05588)

[Deep learning in your browser: A brisk guide](https://towardsdatascience.com/deep-learning-in-your-browser-a-brisk-guide-ca06c2198846)

[Fast In-Browser Object Detection](https://github.com/ModelDepot/tfjs-yolo-tiny)

## License
[MIT](https://choosealicense.com/licenses/mit/)