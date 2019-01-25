const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    goodsList:[],
    baseUrl: app.globalData.imageUrl,
    value:'',
    purchaserStoreIds: '',
    priceShow:false,
    emptyVal:false,
    categoryCodeShow:true,
    categoryCode:'',
    styleShow:true
  },
  // 改变排版
  changeStyle(){
    var styleShow = this.data.styleShow
    this.setData({
      styleShow: !styleShow
    })
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 2)
  },
  // 显示隐藏清空按钮
  showEmpty:function(){
    this.setData({
      emptyVal: true
    })
  },
  hideEmpty: function () {
    this.setData({
      emptyVal: false
    })
  },
  changeInput:function(e){
    var val = e.detail.value
    if (val){
      this.showEmpty()
    }else{
      this.hideEmpty()
    }
    this.setData({
      value:val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  emptyVal:function(){
    this.setData({
      value:'',
      emptyVal: false
    })
  },
  isPurchaser: function (index) {
    var arr = this.data.purchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  getSerList: function (name, nextPage){
    var _this = this,
      sortType='',
      currentTab = this.data.currentTab,
      priceShow = this.data.priceShow,
      categoryCodeShow = this.data.categoryCodeShow,
      categoryCode = this.data.categoryCode
    if (currentTab==0){
      sortType ='multiple'
    } else if (currentTab == 1) {
      sortType = 'sales'
    } else if (currentTab == 2) {
      if (priceShow){
        sortType = 'prices_desc'
      }else{
        sortType = 'prices_asc'
      }
    }
    if (categoryCodeShow){
      wx.setNavigationBarTitle({
        title: name
      })
      this.setData({
        value: name
      })
      var data = { keyword: name, sortType: sortType }
    }else{
      var data = { firstCategoryCode: categoryCode}
    }
    Api.goodsSer(data, nextPage)
      .then(res => {
        const obj = res.obj
        if(obj.length!=0){
          var goodsList =obj
          for (var i = 0; i < goodsList.length; i++) {
            if (_this.isPurchaser(goodsList[i].storeId)) {
              goodsList[i].isPurchaser = true
            } else {
              goodsList[i].isPurchaser = false
            }
        }
          var  datas = _this.data.goodsList,
            newArr = app.pageRequest.addDataList(datas, goodsList)
          _this.setData({
            goodsList: newArr,
            value: name
          })
        }else{
          wx.showToast({
            title: '暂无更多了！',
            icon: 'none',
            duration: 2000
          })
        }

      })
  },
  searchBtn: function (e) {
    var name = this.data.value
    if (Api.isNotEmpty(name)){
      app.pageRequest.pageData.pageNum = 0
      this.setData({
        goodsList: []
      })
      this.getSerList(name)
    }
  },
  onLoad: function (options) {
    var _this = this
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          purchaserStoreIds: res
        }, function () {
          if (options.name) {
            _this.getSerList(options.name)
            _this.showEmpty()
          }
          if (options.categoryCode){
            _this.setData({
              categoryCodeShow:false,
              categoryCode: options.categoryCode
            },function(){
              _this.getSerList()
            })
          }
        })
      })
  },
  swichNav: function (e) {
    var that = this,
      priceShow = this.data.priceShow
    if (this.data.currentTab === e.target.dataset.current) {
      if (this.data.currentTab==2){
        if (priceShow){
          that.setData({
            goodsList: [],
            priceShow: false
          })
        }else{
          that.setData({
            goodsList: [],
            priceShow: true
          })
        }
        that.getSerList(that.data.value)
      }
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      },function(){
        that.setData({
          goodsList:[]
        })
        that.getSerList(that.data.value)
      })
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
    wx.stopPullDownRefresh();
    var val = this.data.value
    if (!val) { return }
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      goodsList: []
    })
    var val=this.data.value
    this.getSerList(val)
  },

  bindDownLoad: function () {
    var val = this.data.value
    if (!val) { return }
    this.getSerList(this.data.value,true)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

})