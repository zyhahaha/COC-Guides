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

Page({
  data: {
    unitDetail: {},
    tableHeader: [],
    tableDataList: []
  },
  onLoad() {
    const unitDetail = wx.getStorageSync('unitDetail')
    const tableDataList = []
    const updateList = unitDetail.detail.update
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
          if (Number(item.value) % 10000 === 0) {
            obj[item.name] = `${item.value / 10000}万`
          }
        }
      })
      tableDataList.push(obj)
    })

    // console.log(tableHeader, tableDataList)

    this.setData({
      tableHeader,
      unitDetail,
      tableDataList
    })

    wx.setNavigationBarTitle({
      title: unitDetail.name
    })
  }
})
