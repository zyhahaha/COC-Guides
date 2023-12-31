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
  home: 'http://1.94.7.83:7788/coc/images/',
  dark: 'http://1.94.7.83:7788/coc/dark-images/'
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
    const tableHeader = updateList[0] && updateList[0].map(v => {
      const headerItemObj = {
        label: v.name,
        prop: v.name,
        width: v.name.length * 35
      }
      if (v.name.includes('升级时间')) {
        headerItemObj.width = 220
      }
      return headerItemObj
    }) || []

    // 计算tableItem宽度
    const windowWidth = wx.getSystemInfoSync().windowWidth
    const tableWidthSum = tableHeader.length && tableHeader.map(v => v.width).reduce((prev, next) => {
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

    // 小博控制室特殊处理Header宽度
    if (unitDetail.name === '小博控制室') {
      tableHeader[0].width = 120 * 2
      tableHeader[1].width = (windowWidth - 120) * 2
    }

    // tableDataList
    updateList.forEach(updateItemArr => {
      const obj = {}
      updateItemArr.forEach(item => {
        const isIncludesNameTextFn = text => item.name.includes(text)
        obj[item.name] = item.value

        if (isIncludesNameTextFn('升级时间') && Number(item.value)) {
          const updateTime = Number(item.value * 1000)
          const updateText = formatTimeFn(updateTime)
          obj[item.name] = updateText
        }
        
        if ((isIncludesNameTextFn('升级花费') || isIncludesNameTextFn('升级费用')) && Number(item.value)) {
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
