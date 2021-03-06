// pages/cloudOrder/orderDetail/orderDetail.js
const app = getApp();
const Api = require("../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnModal:false
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 5)
  },
  gotoStore(){

  },
  getData() {
    app.http.getRequest('/api/yunstore/order/' + this.data.num).then(res => {
      this.setData({
        msg: res.obj
      })
    })
  },
  buy() {
    wx.navigateTo({
      url: '../../casher/casher?num=' + this.data.num + '&type=cloud'
    })
    // wx.login({
    //   success: (res) => {
    //     if (res.code) {
    //       this.getOpenid(res.code);
    //       wx.showLoading({
    //         title: '正在获取订单'
    //       })
    //     }
    //   }
    // })
  },
  getOpenid(code) {
    wx.request({
      url: app.globalData.payUrl,
      method: 'POST',
      data: {
        "channel": "wx_pay",
        "currency": "CNY",
        "code": code,
        "goodsInfo": "小云店购买",
        "orderNumber": this.data.num,
        "payWay": "wx_mini_app_pay",
        "tradeType": "JSAPI"
      },
      header: {
        "platAppId": app.globalData.payNum,
      },
      success: (res) => {
        if (res.data.code == 0) {
          this.payment(res.data.obj.payData);
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      },
      fail: (e) => {
        console.log(e);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  payment(res) {
    wx.requestPayment({
      "timeStamp": res.timeStamp,
      "package": res.package,
      "paySign": res.paySign,
      "signType": res.signType,
      "nonceStr": res.nonceStr,
      success: (res) => {
        wx.showToast({
          title: '恭喜您开通成功',
          icon: "none"
        })
        setTimeout(()=>{
          this.afterPayment();
        },800)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: (res) => {
        setTimeout(() => {
          this.getData();
        }, 1000)
      }
    })
  },
  afterPayment(){
    let type = this.data.msg.yunStore.storeNature;
    let env = app.globalData.projectType;
    if(type == 1){
      //新批零
      if(env == 'xpl'){
        let toID = this.data.user.storeId;
        if (toID) {
          wx.setStorageSync("storeId", toID)
          app.globalData.switchStore = true;
          app.globalData.userShowTip = true;
          wx.switchTab({
            url: "../../page/user/user",
          })
        }
      }else{
        this.setData({
          toStatus: "xpl",
          returnModal: true
        })
      }
    }else if(type == 2){
      //新零售
      if (env == 'xls') {
        let toID = this.data.user.storeId;
        if (toID) {
          wx.setStorageSync("storeId", toID)
          app.globalData.switchStore = true;
          wx.switchTab({
            url: "../../page/user/user?layerText=请登陆购买账号后，点击小云店工作台初始化账户",
          })
        }
      } else {
        this.setData({
          toStatus: "xls",
          returnModal: true
        })
      }
    }
  },
  getUser(){
    Api.identityUser().then(res=>{
      if (res.obj) {
        this.setData({
          user: res.obj
        })
      }  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      num:options.num
    })
    this.getUser()
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
    this.getData();
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