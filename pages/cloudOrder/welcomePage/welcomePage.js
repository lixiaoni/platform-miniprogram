// pages/cloudOrder/welcomePage/welcomePage.js
import API from "../../../utils/api.js";
const loginApp = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonTimer:"获取验证码",
    telephone:"",
    layerMobal:false,
    introPage:true
  },
  
  watchInput(e){
    let val = e.detail.value,
        type = e.currentTarget.dataset.type,
        obj = {};
    switch(type){
      case "tel" :
        obj.telephone = val;
      break;
      case "code":
        obj.code = val;
      break;
    }    
    this.setData(obj);
  },

  buy(){
    if (this.data.stopLoginBtn) {
      return
    }
    if (!this.testTel()) {
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
      })
      return;
    }
    if (this.data.code.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
      })
      return;
    }
    this.setData({
      stopLoginBtn: true
    })
    loginApp.authHandler.loginByMobile(this.data.telephone, this.data.code).then(res => {
      this.loginAfter(res);
    }).catch(e => {
      this.setData({
        stopLoginBtn: false
      })
    })
  },
  loginAfter(res) {
    this.setData({
      stopLoginBtn: false
    })
    if (res.message) {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      return
    }
    if (res.access_token) {
      // wx.showToast({
      //   title: "登录成功",
      //   icon: 'none'
      // })
      this.getUser()
    }
  },
  testTel() {
    let phone = this.data.telephone.trim();
    if (!phone || phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      return false;
    }
    return true;
  },
  //获取验证码
  getCode() {
    if(this.data.disabled){
      return
    }

    if (!this.testTel()) {
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
      })
    } else {
      API.phoneMessage({
        mobile: this.data.telephone
      }).then(res => {

      })

      //获取验证码倒计时
      let sec = 60;
      this.setData({
        buttonTimer: sec + "s",
        disabled: true
      })
      let timer = setInterval(() => {
        sec--;
        this.setData({
          buttonTimer: sec + "s"
        })

        if (sec <= 1) {
          clearInterval(timer)
          this.setData({
            buttonTimer: "获取验证码",
            disabled: false
          })
        }
      }, 1000)
    }
  },
  getUser(){
    API.getUserInfo().then(res=>{
      if (res.obj.isStoreOwner){
        let obj = {layerMobal:true};
        if (res.obj.storeNature == 2){
          obj.layerText = "新零售";
        }else{
          obj.layerText = "新批零";
        }
        this.setData(obj)
      }else{
        //不是店主
        wx.navigateTo({
          url: '../newCloud/newCloud',
        })
      }
    })
  },
  toUser(){
    wx.switchTab({
      url: '../../page/user/user',
    })
  },
  //介绍页面
  toHome(){
    wx.switchTab({
      url: '../../mall/newest/newest',
    })
  },
  loginBuy(){
    this.setData({
      introPage:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loginApp.authHandler.flushTokenInfo();
    try {
      wx.removeStorageSync('isSuperAdmin')
      wx.removeStorageSync('isFloorAdmin')
    } catch (e) { }
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
  onShareAppMessage: function () {

  }
})