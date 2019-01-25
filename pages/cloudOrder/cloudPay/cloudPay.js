// pages/cloudOrder/cloudPay/cloudPay.js
const Api = require("../../../utils/api.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getData() {

    // wx.requestPayment({
    //   "timeStamp": "1542009229352",
    //   "package": "prepay_id=wx12155349280398d600d768ba4170672130",
    //   "paySign": "390828D6DF0804BB267047EA6D964711",
    //   "signType": "MD5",
    //   "nonceStr": "6b5a4870b5d24e3d809a429b9b7d63d0",
    //   success(res) { 
    //     console.log(res)
    //   },
    //   fail(res) { 
    //     console.log(res)
    //   }
    // })
  },
  buy() {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code)
          this.getOpenid(res.code);
        }
      }
    })
  },
  getOpenid(code) {
    wx.request({
      url: 'https://pay.youlife.me/api/pay',
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
      header:{
        "appNumber": "APP002",
      },
      success: (res) => {
        if (res.data.code == 0) {
          this.payment(res.data.obj.payData);
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        }
      },
      fail: (e) => {
        console.log(e);
      }
    })


    // wx.request({
    //   url: 'https://dev-mall.youlife.me/api/user/wx/APP002/obtain/openid',
    //   data: { jsCode: code },
    //   success: (res) => {
    //     wx.request({
    //       url: 'http://pay.youlife.me/api/pay',
    //       method: 'POST',
    //       data: {
    //         "appNumber": "APP002",
    //         "channel": "wx_mini_app",
    //         "currency": "cny",
    //         "extData": {
    //           "body": "1",
    //           "trade_type": "JSAPI",
    //           "openid": res.data.obj.openid
    //         },
    //         "orderNumber": this.data.num,
    //         "payType": 1
    //       },
    //       success: (res) => {
    //         if (res.data.code == 0) {
    //           this.payment(res.data.obj.payData);
    //         } else {
    //           wx.showToast({
    //             title: res.data.message,
    //             icon: 'none'
    //           })
    //         }
    //       },
    //       fail: (e) => {
    //         console.log(e);
    //       }
    //     })

    //   },
    //   fail: (e) => {
    //     console.log(e);
    //   }
    // })

  },
  payment(res) {
    console.log(res)
    wx.requestPayment({
      "timeStamp": res.timeStamp,
      "package": res.package,
      "paySign": res.paySign,
      "signType": res.signType,
      "nonceStr": res.nonceStr,
      success: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.order;

    this.setData({
      num: orderId
    })
    this.buy();
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