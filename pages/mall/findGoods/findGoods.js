const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    baseUrl: app.globalData.imageUrl,
    value: '',
    imageUrl:'',
    purchaserStoreIds: '',
  },
   // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 2)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  isPurchaser: function (index) {
    var arr = this.data.purchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  getSerList: function () {
    var _this = this
    _this.setData({
      imageUrl: '',
      goodsList:[]
    })
    Api.findGoods()
      .then(res => {
        var obj = res.obj
        if (obj.length != 0) {
          var goodsList = obj[0].goodsList
          for(var i = 0; i < goodsList.length; i++) {
            if (_this.isPurchaser(goodsList[i].storeId)) {
              goodsList[i].isPurchaser = true
            } else {
              goodsList[i].isPurchaser = false
            }
          }
          _this.setData({
            imageUrl: obj[0].imageUrl,
            name: obj[0].name,
            desc: obj[0].desc,
            goodsList: goodsList
          })
        }else{
          Api.showToast("暂无更多了！")
        }
      })
  },
  onLoad: function (options) {
   
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
    var _this = this
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          purchaserStoreIds: res
        }, function () {
          _this.getSerList()
        })
      })
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
    this.getSerList()
    wx.stopPullDownRefresh();
  },

  bindDownLoad: function () {
   
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})