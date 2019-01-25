const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    baseUrl: app.globalData.imageUrl,
    getPurchaserStoreIds: '',
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  isPurchaser: function (index) {
    var arr = this.data.getPurchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  getInfo: function (index) {
    var _this = this,
      dataList = []
    Api.storeLook()
      .then(res => {
        var obj = res.obj
        for (var i = 0; i < obj.length; i++) {
          if (_this.isPurchaser(obj[i].storeId)) {
            obj[i].isPurchaser = true
          } else {
            obj[i].isPurchaser = false
          }
        }
        dataList.push(obj)
        if (this.data.optionsName){
          wx.setNavigationBarTitle({
            title:"发现新店"
          })
        }else{
          wx.setNavigationBarTitle({
            title: obj.name
          })
        }
        dataList = dataList[index].storeGoodsList
        _this.setData({
          dataList: dataList,
          showFavorite: true
        })
      })

  },
  onLoad: function (options) {
    if (options.name){
      this.setData({
        optionsName: true
      })
    }
    var _this = this
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          getPurchaserStoreIds: res
        }, function () {
          _this.getInfo(options.index)
        })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})