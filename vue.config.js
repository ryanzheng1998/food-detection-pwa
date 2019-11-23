module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false // 使用npm link
    }
  },
  pwa: {
    name: '旅遊美食掃描器',
    themeColor: '#3880FF',
    msTileColor: '#FFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
 
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'service-worker.js',
      // ...other Workbox options...
    }
  }
}
