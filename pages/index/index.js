import { unitData } from '../../utils/data.js'
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tabValue: 0,
    unitData: unitData
    // tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
  },
  onLoad() {
    // console.log('xxx', this.data.unitData)
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onGoSearch(searchValue) {
    let url = `/pages/search/search`
    // if (!this.data.orderType) return;
    if (typeof searchValue === 'string') url += `?searchValue=${searchValue}`

    wx.navigateTo({
      url,
    })
  },
  onScanCode() {
    wx.scanCode().then(res => {
      this.onGoSearch(res.result)
    })
  },
  onDetail(e) {
    let content = e.currentTarget.dataset.content
    wx.setStorageSync('unitDetail', content)
    wx.navigateTo({
      url: '/pages/detail/index'
    })
  },
  onTabsChange(event) {
    this.setData({
      tabValue: event.detail.value,
    });
  }
})
