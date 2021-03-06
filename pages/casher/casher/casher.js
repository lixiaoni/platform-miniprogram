// pages/casher/casher/casher.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  buy() {
    if (!this.data.num) {
      wx.showToast({
        title: '无订单号',
        icon: "none"
      })
      return
    }
    wx.login({
      success: (res) => {
        if (res.code) {
          this.getOpenid(res.code);
          wx.showLoading({
            title: '正在获取订单'
          })
        }
      }
    })
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
        "platAppId": app.globalData.payAppNum,
      },
      success: (res) => {
        this.preSet(res);
        if (res.data.code == 0) {
          this.payment(res.data.obj.payData);
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          // setTimeout(() => {
          //   wx.navigateBack()
          // }, 1000)
        }
      },
      fail: (e) => {
        wx.showToast({
          title: e.data.message,
          icon: 'none'
        })

      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  preSet(res) {
    let type = "";
    switch (this.data.orderType) {
      case "cloudXPL":
        type = "新批零"; break;
      case "cloudXLS":
        type = "新零售"; break;
    }
    this.setData({
      price: res.data.obj.amount,
      uutype: type
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
          title: '付款成功',
          icon: "none"
        })
        setTimeout(() => {
          this.afterPayment();
        }, 800)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: (res) => {

      }
    })
  },
  afterPayment() {
    wx.navigateTo({
      url: '../success/success?type=' + this.data.orderType + "&price=" + this.data.price,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.num,
      orderType: options.type
    })
    this.buy();
    
    if(options.loginObj){
      let user = JSON.parse(options.loginObj);
      app.authHandler.saveTokenInfo(user)
    }
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