import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUser: false,
    isStoreOwner: '',
    showCloud: false,
    storeNature: ''
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 3)
  },
  showLogin() {
    this.selectComponent("#login").showPage();
  },
  businessFriend: function() {
    if (!authHandler.isLogin()) {
      this.showLogin()
    } else {
      wx.navigateTo({
        url: '../../businessFriend/index/index',
      })
    }
  },
  getUser() {
    Api.identityUser().then((res) => {
      if (res.success) {
        var isStoreOwner = res.obj.isStoreOwner
        if (isStoreOwner) {
          this.setData({
            user: res.obj,
            storeNature: res.obj.storeNature
          })
        }
        this.setData({
          user: res.obj,
          hasUser: true,
          isStoreOwner: res.obj.isStoreOwner
        })
        // 店铺开通是否付费
        if (res.obj.isStoreOwner == true) {
          this.setData({
            payStore: true
          })
        } else {
          this.setData({
            payStore: false
          })
        }
      } else {
        this.setData({
          user: "",
          hasUser: false,
          isStoreOwner: false,
          showCloud: false
        })
      }
    }).catch(e => {
      this.setData({
        user: "",
        hasUser: false,
        isStoreOwner: false,
        showCloud: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      baseUrl: app.globalData.imageUrl
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUser();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


})