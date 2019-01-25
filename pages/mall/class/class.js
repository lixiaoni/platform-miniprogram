const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstCodeList:[],
    current:0,
    twoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getFirstCode:function(){
    var _this=this
    Api.firstCode()
    .then(res=>{
      const obj = res.obj
      if (obj.length>0){
        _this.setData({
          firstCodeList: obj,
          twoList: obj[0]
        })
        _this.getChildList(obj[0].categoryCode)
      }
    })
  },
  getChildList:function(code){
    var _this=this,
        newArr=[]
    Api.childCategoryCode({parentCategoryCode:code})
      .then(res => {
        var obj = res.obj
        _this.setData({
          twoList: obj
        })
      })
  },
  onLoad: function (options) {
    this.getFirstCode()
  },
  swichNav: function (e) {
    var that = this,
      categoryCode = e.target.dataset.code
    if (this.data.current === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        current: e.target.dataset.current,
      })
      that.getChildList(categoryCode)
    }
  },
  serList:function(e){
    var  categoryCode = e.target.dataset.code,
         name = e.target.dataset.name
    wx.navigateTo({
      url: '../goodsList/goodsList?code=' + categoryCode +'&keyword='+name,
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
  /**
         * 用户点击右上角分享
         */
  onShareAppMessage: function (res) {

  }

})