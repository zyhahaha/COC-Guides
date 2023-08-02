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
      return {
        label: v.name,
        prop: v.name,
        width: v.name.length * 35
      }
    })
    updateList.forEach(updateItemArr => {
      const obj = {}
      updateItemArr.forEach(item => {
        obj[item.name] = item.value
      })
      tableDataList.push(obj)
    })

    // console.log(tableHeader, tableDataList)

    this.setData({
      tableHeader,
      unitDetail,
      tableDataList
    })
  }
})
