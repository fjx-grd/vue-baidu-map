module.exports = {
  configureWebpack: {
    externals: {
      BMap: 'BMap',
      CCBBridge: 'CCBBridge',
    }
  },
  publicPath: '/vue-baidu-map'
}
