Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        keyword: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const searchValue = options?.searchValue || ''
        this.setData({
            keyword: searchValue,
        })

        if (searchValue) {
            wx.hideKeyboard()
            this.handleSearch()
        }
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
        setTimeout(() => {
            wx.hideLoading()
        }, 1000)
    },
})