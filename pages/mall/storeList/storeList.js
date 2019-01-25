const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.imageUrl,
    dataList: [],
    value: '',
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 1)
  },
  isPurchaser: function (index) {
    var arr = this.data.getPurchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var _this = this
    wx.setNavigationBarTitle({
      title:options.name
    })
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          getPurchaserStoreIds: res
        }, function () {
          _this.setData({
            value: options.name
          })
          if (options.name){
            _this.getList({ keyword: options.name })
          }
        })
      })
  },
  getList: function (data, nextPage) {
    var _this = this
    Api.storeSerList(data, nextPage)
      .then(res => {
        if (res.obj !== null) {
          var dataList = res.obj.result
          for (var i = 0; i < dataList.length; i++) {
            dataList[i].floorInfo = Api.isFloorInfo(dataList[i].floorInfo)
            if (_this.isPurchaser(dataList[i].storeId)) {
              dataList[i].isPurchaser = true
            } else {
              dataList[i].isPurchaser = false
            }
          }
          var newArr = [],
            datas = _this.data.dataList
          newArr = app.pageRequest.addDataList(datas, dataList)
          _this.setData({
            dataList: newArr,
          })
        } else {
          wx.showToast({
            title: '暂无更多了！',
            icon: 'none',
            duration: 2000
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      dataList: []
    })
    this.getList({ keyword: this.data.value})
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bindDownLoad: function () {

  },
  onReachBottom: function () {
    var _this = this
    this.getList({ keyword: this.data.value}, true)
  },
  /**
         * 用户点击右上角分享
         */
  onShareAppMessage: function (res) {
    return {
      title: "逛小云店",
      success: (res) => {
      },
      fail: (res) => {
      }
    }
  }
})