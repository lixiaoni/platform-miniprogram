const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    dotsBoll: true,
    interval: 2000,
    duration: 1000,
    current: 0,
    movies: [],
    youLifeRecommendGoodThings:[],
    classData:[],
    retailStore: ["S1000096", "S1000367", "S1000334", "S1000327"],
    purchaserStoreIds:'',
    mallChosenGoods:[],
    goodsSmall: app.globalData.goodsSmall,
    logo: app.globalData.logo,
    storeCover: app.globalData.storeCover, 
    baseUrl: app.globalData.imageUrl,
    imageWidth: wx.getSystemInfoSync().windowWidth-80
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 2)
  },
  bindchange: function (e) {//轮播图发生改变
    this.setData({
      current: e.detail.current
    })
  },
  isPurchaser: function (index) {
    var arr = this.data.purchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  // 获取数据
  getList:function(){
    var _this=this
    Api.mallIndex()
      .then(res => {
        const obj=res.obj
        const arrMall = obj.youLifeChosenGoods
        for (var i = 0; i < arrMall.length;i++){
          var goodsList = arrMall[i].goodsList
          for (var j = 0; j < goodsList.length;j++){
            if(j<5){
              if (_this.isPurchaser(goodsList[j].storeId)) {
                goodsList[j].isPurchaser = true
              } else {
                goodsList[j].isPurchaser = false
              }
            }
          }
        }
        const youLifeHotCategory = obj.youLifeHotCategory
        _this.setData({
          movies: obj.banners,
          youLifeRecommendGoodThings: obj.youLifeRecommendGoodThings == null ? [] : obj.youLifeRecommendGoodThings,
          mallChosenGoods: arrMall,
          classData: youLifeHotCategory
        })
    })
  },
  // 发现好物
  findGoods:function(){
    wx.navigateTo({
      url: '../findGoods/findGoods',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  moreList:function(e){
    var index = e.target.dataset.index
    wx.navigateTo({
      url: '../goodsList/goodsList?index='+index,
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
    var _this = this
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          purchaserStoreIds: res
        }, function () {
          _this.getList()
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
    this.onShow()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
       * 用户点击右上角分享
       */
  onShareAppMessage: function (res) {

  }

})