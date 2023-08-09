import { unitData } from '../../utils/data.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        searchResultList: [],
        keyword: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initData()

        const searchValue = options?.searchValue || ''
        this.setData({
            keyword: searchValue,
        })

        if (searchValue) {
            wx.hideKeyboard()
            this.handleSearch()
        }
    },
    initData() {
        // console.log('xxx', unitData.map(v => v.children))
        const dataListTemp = []
        unitData.map(v => v.children).forEach(v => {
            dataListTemp.push(...v)
        })
        this.setData({
            dataList: dataListTemp
        })
        // console.log('xxx', dataListTemp)
    },
    onDetail(e) {
        let content = e.currentTarget.dataset.content
        wx.setStorageSync('unitDetail', content)
        wx.navigateTo({
            url: '/pages/detail/index'
        })
    },
    handleInput(e) {
        let value = e.detail.value
        this.setData({
            keyword: value
        })
    },

    async handleSearch() {
        wx.showLoading({
            title: '加载中',
        })
        
        this.setData({
            searchResultList: this.data.dataList.filter(v => v.name.includes(this.data.keyword))
        })
        
        setTimeout(() => {
            wx.hideLoading()
        }, 1000)
    },
})