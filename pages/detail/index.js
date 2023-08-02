Page({
  data: {
    unitDetail: {}
  },
  onLoad() {
    const unitDetail = wx.getStorageSync('unitDetail')
    this.setData({
      unitDetail
    })
  }
})
