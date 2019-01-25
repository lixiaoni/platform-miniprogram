// pages/page/manageM/manageM.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.imageUrl,
    defaultHead: app.globalData.defaultHeadPic,
  },
  //打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '01053361798',
    })
  },
  getData() {
    app.http.getRequest("/admin/floor/malluser/loginfloor").then((res) => {
      if (res.obj){
        this.setData({
          user:res.obj
        })
      }  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isSuperAdmin: wx.getStorageSync("isSuperAdmin")
    })
    this.getData();
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