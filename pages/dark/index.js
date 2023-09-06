import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';
import { unitData } from '../../utils/data.js'
import { levelOptions } from './libs/const.js'

Page({
  data: {
    drawerVisible: false,
    sideMenuList: [],

    level: 10,

    tabValue: 0,
    unitData: unitData
  },
  onLoad() {
    this.setData({
      sideMenuList: this.data.unitData.map((v, index) => {
        return {
          title: v.name,
          index
        }
      })
    })
  },
  onChangeLevel() {
    ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      description: '请选择大本营等级',
      items: levelOptions,
    });
  },
  onHandleActionSelected(e) {
    this.setData({
      level: e.detail.selected.value
    })
    wx.setStorageSync('dark-level', e.detail.selected.value)
  },
  onOpenDrawer() {
    this.setData({
      drawerVisible: true
    })
  },
  onClickDrawerItem(e) {
    this.setData({
      tabValue: e.detail.index
    })
    this.setData({
      drawerVisible: false
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
