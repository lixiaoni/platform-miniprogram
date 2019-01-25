import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    history: [],
    hot: ["羽绒服", "毛衣", "围巾"],
    value: '',
    hot1: ["童泰", "卡芙芮", "熙然", "新潮喜庆用品", "爱利奴", "CBA", "容祥裤业","AB内衣"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })

    }
  },
  // 清空输入框
  emptyVal:function(){
    this.setData({
      value:''
    })
  },
  // 清空历史搜索
  removeAll() {
    this.setData({
      history: []
    });
    wx.removeStorageSync('history')
  },
  historyHandle(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (history.length > 7) {
        history.pop();
      }
    } else {
      history.splice(idx, 1);
    }
    history.unshift(value);
    wx.setStorageSync('history', JSON.stringify(history));
    this.setData({
      history: history
    });
  },
  keywordHandle:function(e){
    var value = e.target.dataset.name
    this.goSerList(value)
  },
  goSerList:function(name){
    if (this.data.currentTab == 0) {
      wx.navigateTo({
        url: '../seaList/seaList?name='+name,
      })
    } else {
      wx.navigateTo({
        url: '../storeList/storeList?name='+name,
      })
    }
  },
  searchBtn: function (e) {
    var name = this.data.value
    if (Api.isNotEmpty(name)) {
      this.historyHandle(name)
    }
    this.goSerList(name)
  },
  changeValue:function(e){
    var val = e.detail.value
    this.setData({
      value:val
    })
  },
  // removeAll() {
    // this.setData({
    //   history: []
    // });
  // },
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
  bindDownLoad: function () {
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