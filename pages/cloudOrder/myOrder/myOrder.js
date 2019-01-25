// pages/cloudOrder/myOrder/myOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getData(){
    app.http.getRequest("/api/yunstore/order/user/page/orderstatus/all").then(res=>{
      // wx.showToast({
      //   title: res.message,
      //   icon:'none'
      // })
      if(res.success){
        this.setData({
          msg:res.obj.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    this.getData()

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