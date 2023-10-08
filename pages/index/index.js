import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';
import { unitData } from '../../utils/data.js'
import { levelOptions } from './libs/const.js'

function getCurrentMonthDate() {
  // 获取当前月有多少天
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let d = new Date(year, month, 0);
  return d.getDate();
}

Page({
  data: {
    drawerVisible: false,
    sideMenuList: [],

    level: 15,

    // levelOptions: levelOptions,
    // keysOptions: {
    //   label: 'label',
    //   value: 'value'
    // },

    tabValue: 0,
    unitData: unitData,

    attackWeekendTitle: '',
    attackWeekendCountdown: '',

    teamRaceTitle: '',
    teamRaceCountdown: '',

    teamLeagueTitle: '',
    teamLeagueCountdown: ''
  },
  onLoad() {
    this.setData({
      level: wx.getStorageSync('level') || 15,
      sideMenuList: this.data.unitData.map((v, index) => {
        return {
          title: v.name,
          index
        }
      })
    })

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow() {
    this.computePartyCountdownFn()
  },
  // onGoSearch(searchValue) {
  //   let url = `/pages/search/search`
  //   // if (!this.data.orderType) return;
  //   if (typeof searchValue === 'string') url += `?searchValue=${searchValue}`

  //   wx.navigateTo({
  //     url,
  //   })
  // },
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
    wx.setStorageSync('level', e.detail.selected.value)
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
  onScanCode() {
    wx.scanCode().then(res => {
      this.onGoSearch(res.result)
    })
  },
  onMoon(e) {
    wx.navigateTo({
      url: '/pages/dark/index'
    })
  },
  onDetail(e) {
    let content = e.currentTarget.dataset.content
    wx.setStorageSync('unitDetail', content)
    wx.navigateTo({
      url: '/pages/detail/index?urlSource=home'
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
    this.getTeamRaceFn()
  },
  getAttackWeekendFn() {
    // 每周五下午15点开始；下周一下午15点结束
    let attackWeekendTitle = '突袭周末开始'
    let attackWeekendCountdown = ''

    const nowDate = new Date()
    let week = nowDate.getDay()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    const seconds = nowDate.getSeconds()

    if (week === 0) week = 7
    if (week > 5 || (week === 5 && hours >= 15) || (week === 1 && hours < 15)) {
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

      if (week === 1) {
        countdownDays = 0
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
    // 每月1号下午16点开始；11号16点结束
    let teamLeagueTitle = '联赛开始'
    let teamLeagueCountdown = ''

    const nowDate = new Date()
    let dateNumber = nowDate.getDate()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    const seconds = nowDate.getSeconds()

    if ((dateNumber < 11 && dateNumber > 1) || (dateNumber === 1 && hours >= 16) || (dateNumber === 11 && hours < 16)) {
      teamLeagueTitle = '联赛结束'
      let countdownDays = Math.abs(dateNumber - 11)
      let countdownHours = 16 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      // countdownHours = countdownHours + 16

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      if (countdownHours < 0) {
        countdownDays = countdownDays - 1
        countdownHours = countdownHours + 24
      }

      if (dateNumber === 11) {
        countdownDays = 0
      }
      teamLeagueCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    } else {
      teamLeagueTitle = '联赛开始'
      let countdownDays = getCurrentMonthDate() - dateNumber
      let countdownHours = 16 - hours
      let countdownMinutes = 60 - minutes
      let countdownSeconds = 60 - seconds
      // countdownHours = countdownHours + 16

      if (seconds > 0) countdownMinutes = countdownMinutes - 1
      if (minutes > 0) countdownHours = countdownHours - 1
      if (countdownHours >= 24) {
        countdownDays = countdownDays + 1
        countdownHours = countdownHours - 24
      }
      if (countdownHours < 0) {
        countdownDays = countdownDays - 1
        countdownHours = countdownHours + 24
      }
      if (dateNumber === 1) {
        countdownDays = 0
      }
      teamLeagueCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    }

    this.setData({
      teamLeagueTitle,
      teamLeagueCountdown
    })
  },
  getTeamRaceFn() {
    // 每月22号下午16点开始；28号16点结束；为期6天
    let teamRaceTitle = '竞赛开始'
    let teamRaceCountdown = ''

    const nowDate = new Date()
    let dateNumber = nowDate.getDate()
    const hours = nowDate.getHours()
    const minutes = nowDate.getMinutes()
    const seconds = nowDate.getSeconds()

    if ((dateNumber > 22 && dateNumber < 28) || (dateNumber === 22 && hours >= 16) || (dateNumber === 28 && hours < 16)) {
      teamRaceTitle = '竞赛结束'
      let countdownDays = Math.abs(dateNumber - 22 - 5)
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

      if (dateNumber === 28) {
        countdownDays = 0
      }
      teamRaceCountdown = `${countdownDays}天${countdownHours}小时${countdownMinutes}分`
    } else {
      teamRaceTitle = '竞赛开始'
      let countdownDays = 21 - dateNumber
      if (dateNumber > 28 || (dateNumber === 28 && hours >= 16)) {
        countdownDays = getCurrentMonthDate() - dateNumber + 21
      }
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
