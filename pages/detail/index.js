function formatTimeFn(mss){
  const days = parseInt(mss / (1000 * 60 * 60 * 24));
  const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = (mss % (1000 * 60)) / 1000;
  let timeText = ''
  if (days) timeText += `${days}天`
  if (hours) timeText += `${hours}小时`
  if (minutes) timeText += `${minutes}分钟`
  return timeText
}

const hostMap = {
  home: 'http://119.96.189.81:7788/images/',
  dark: 'http://119.96.189.81:7788/dark-images/'
}

Page({
  data: {
    urlSource: 'home',
    imageUrlHost: '',
    unitDetail: {},
    level: 15,
    levelUpperLimit: 0,
    tableHeader: [],
    tableDataList: [],
    tableHeight: 0
  },
  onLoad(options) {
    const urlSource = options.urlSource
    const storageKey = { home: 'level', dark: 'dark-level' }[urlSource]
    const defaultLevel = { home: 15, dark: 10 }[urlSource]
    const currentLevel = wx.getStorageSync(storageKey) || defaultLevel

    let levelUpperLimit = 0
    const unitDetail = wx.getStorageSync('unitDetail')
    const tableDataList = []
    const updateList = unitDetail.detail.update

    this.setData({
      urlSource,
      imageUrlHost: hostMap[urlSource]
    })

    // tableHeader
    const tableHeader = updateList[0].map(v => {
      const headerItemObj = {
        label: v.name,
        prop: v.name,
        width: v.name.length * 35
      }
      if (v.name.includes('升级时间')) {
        headerItemObj.width = 220
      }
      return headerItemObj
    })

    // 计算tableItem宽度
    const windowWidth = wx.getSystemInfoSync().windowWidth
    const tableWidthSum = tableHeader.map(v => v.width).reduce((prev, next) => {
      return prev + next;
    })
    if (tableWidthSum < windowWidth * 2) {
      const tableItemWidth = windowWidth / tableHeader.length
      tableHeader.forEach(v => {
        if (v.width < tableItemWidth * 2) {
          v.width = tableItemWidth * 2
        }
      })
    }

    // tableDataList
    updateList.forEach(updateItemArr => {
      const obj = {}
      updateItemArr.forEach(item => {
        obj[item.name] = item.value

        if (item.name.includes('升级时间') && Number(item.value)) {
          const updateTime = Number(item.value * 1000)
          const updateText = formatTimeFn(updateTime)
          obj[item.name] = updateText
        }
        if (item.name.includes('升级花费') && Number(item.value)) {
          // if (Number(item.value) % 10000 === 0) {
          //   obj[item.name] = `${item.value / 10000}万`
          // }
          if (Number(item.value) >= 10000) {
            obj[item.name] = `${item.value / 10000}万`
          }
        }
      })
      tableDataList.push(obj)

      // 计算当前大本营等级下可升级的最大等级
      const baseCampLevel = Number(obj['所需大本等级'])
      const unitLevel = Number(obj['等级'])
      if (baseCampLevel <= currentLevel && baseCampLevel && unitLevel) {
        if (levelUpperLimit < unitLevel) {
          levelUpperLimit = unitLevel
        }
      }
    })
    this.setData({
      level: currentLevel,
      levelUpperLimit,
      tableHeader,
      unitDetail,
      tableDataList,
      tableHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().statusBarHeight
    })

    wx.setNavigationBarTitle({
      title: unitDetail.name
    })

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }
})
