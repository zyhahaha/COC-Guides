import { unitData } from '../../utils/data.js'

Page({
  data: {
    tabValue: 0,
    unitData: unitData,

    attackWeekendTitle: '',
    attackWeekendCountdown: '',

    teamLeagueTitle: '',
    teamLeagueCountdown: ''
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
    this.getTeamLeagueFn()
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
    if (week > 5 || (week === 5 && hours >= 15)) {
      attackWeekendTitle = '突袭周末结束'
      let countdownDays = Math.abs(week - 7)
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 15

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
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
      countdownHours = countdownHours + 15

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
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
  },
  getTeamLeagueFn() {
    function getCurrentMonthDate() {
      // 获取当前月有多少天
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let d = new Date(year, month, 0);
      return d.getDate();
    }

    let teamLeagueTitle = '联赛开始'
    let teamLeagueCountdown = ''

    const nowDate = new Date()
    let dateNumber = nowDate.getDate()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    const seconds = nowDate.getSeconds()

    if ((dateNumber < 11 && dateNumber > 1) || (dateNumber === 11 && hours <= 16) || (dateNumber === 1 && hours >= 16)) {
      teamLeagueTitle = '联赛结束'
      let countdownDays = Math.abs(dateNumber - 10)
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 16

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      teamLeagueCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    } else {
      teamLeagueTitle = '联赛开始'
      let countdownDays = getCurrentMonthDate() - dateNumber
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 16

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      teamLeagueCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    }

    this.setData({
      teamLeagueTitle,
      teamLeagueCountdown
    })
  },
  getTeamRaceFn() {
    let teamRaceTitle = '竞赛开始'
    let teamRaceCountdown = ''

    const nowDate = new Date()
    let dateNumber = nowDate.getDate()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    const seconds = nowDate.getSeconds()

    if (dateNumber > 22 || (dateNumber === 22 && hours >= 16)) {
      teamRaceTitle = '竞赛结束'
      let countdownDays = Math.abs(dateNumber - 7)
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 16

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      teamRaceCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    } else {
      teamRaceTitle = '竞赛开始'
      let countdownDays = 4 - dateNumber
      let countdownHours = 24 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      countdownHours = countdownHours + 16

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      teamRaceCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    }

    this.setData({
      teamRaceTitle,
      teamRaceCountdown
    })
  }
})
