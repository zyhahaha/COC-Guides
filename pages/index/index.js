import { unitData } from '../../utils/data.js'

Page({
  data: {
    tabValue: 0,
    unitData: unitData,

    attackWeekendTitle: '',
    attackWeekendCountdown: ''
  },
  onLoad() {
    this.computePartyCountdownFn()
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
  },
  computePartyCountdownFn() {
    // 活动倒计时
    this.getAttackWeekendFn()
  },
  getAttackWeekendFn() {
    let attackWeekendTitle = '突袭周末开始'
    let attackWeekendCountdown = ''

    const nowDate = new Date()
    let week = nowDate.getDay()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    const seconds = nowDate.getSeconds()

    if (week === 0) week = 7
    if (week > 5 || (week === 5 && hours >= 16)) {
      attackWeekendTitle = '突袭周末结束'
      let countdownDays = week - 5
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 16
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      attackWeekendCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    } else {
      attackWeekendTitle = '突袭周末开始'
      let countdownDays = 4 - week
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 16
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      attackWeekendCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    }

    this.setData({
      attackWeekendTitle,
      attackWeekendCountdown
    })
  }
})
