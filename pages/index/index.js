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
  onDetail(e) {
    let content = e.currentTarget.dataset.content
    wx.setStorageSync('unitDetail', content)
    wx.navigateTo({
      url: '/pages/detail/index'
    })
  },
  onHandlerDdvanced() {
    console.log('xxx')
  },
  onTabsChange(event) {
    this.setData({
      tabValue: event.detail.value,
    });
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
})
