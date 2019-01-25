const app = getApp();
import Api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    storeList:[],
    result:[],
    dataList:[],
    showFavorite:false,
    limitShow:false,
    getPurchaserStoreIds:'',
    baseUrl: app.globalData.imageUrl,
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  getInfo:function(){
    var _this=this,
      storeList=[]
    Api.storeLook({})
    .then(res=>{
      var obj = res.obj
      storeList.push(obj)
      _this.setData({
        storeList: storeList,
        showFavorite:true
      })
    })
    
  },
  getFavorite:function(nextPage){
    var _this = this
    Api.favorite(nextPage)
      .then(res => {
        var obj = res.obj
       if(obj!=null){
         var detailList = res.obj.result
         for (var i = 0; i < detailList.length;i++){
           detailList[i].floorInfo = Api.isFloorInfo(detailList[i].floorInfo)
           if(_this.isPurchaser(detailList[i].storeId)){
             detailList[i].isPurchaser=true
           }else{
             detailList[i].isPurchaser =false
           }
         }
        var  datas = _this.data.result,
           newArr = app.pageRequest.addDataList(datas, detailList)
         _this.setData({
            result: newArr,
            showFavorite:false
          })
       }else{
         if (!nextPage){
           _this.getInfo()
           _this.setData({
             showFavorite: true
           })
         }else{
           wx.showToast({
             title: '暂无更多了！',
             icon: 'none',
             duration: 2000
           })
         }
       }
      })
  },
  isPurchaser:function(index){
    var arr = this.data.getPurchaserStoreIds
    if(arr.indexOf(index)!=-1){
      return true
    }
  },
  onLoad: function (options) {
    
  },
  getNewList: function (nextPage){
    var that = this
    Api.news({},nextPage)
      .then(res => {
        if (res.obj != null) {
          var detailList = res.obj.result
          if(res.obj.result.length==0){
            wx.showToast({
              title: '暂无更多了！',
              icon: 'none',
              duration: 2000
            })
          }
          for (var i = 0; i < detailList.length; i++) {
            detailList[i].floorInfo = Api.isFloorInfo(detailList[i].floorInfo)
            if (that.isPurchaser(detailList[i].storeId)) {
              detailList[i].isPurchaser = true
            } else {
              detailList[i].isPurchaser = false
            }
          }
          var  datas = that.data.result,
            newArr = app.pageRequest.addDataList(datas, detailList)
          that.setData({
            result: newArr,
          })
        } else {
          wx.showToast({
            title: '暂无更多了！',
            icon: 'none',
            duration: 2000
          })
        }
      })
  },
  // tab切换
  swichNav: function (e) {
    var that = this,
      index = e.target.dataset.current
    if(this.data.currentTab === index) {
      return false;
    } else {
        that.setData({
          currentTab:index,
          result:[]
        },function(){
          if(index==0){
            this.getFavorite()
          }else{
            this.getNewList(false)
          }
        })

    }
  },
  bindDownLoad:function(){

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
    this.setData({
      result: [],
      currentTab:0
    })
    var _this=this
    Api.getPurchaserStoreIds()
    .then(res => {
      _this.setData({
        getPurchaserStoreIds:res
      },function(){
        _this.getFavorite()
      })
    })
  },
  goStore:function(){
    wx.navigateTo({
      url: '../store/store',
    })
  },
  moreList: function (e) {
    var index = e.target.dataset.index
    wx.navigateTo({
      url: '../moreStore/moreStore?index=' + index,
    })
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
    this.onShow()
     wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var index = this.data.currentTab
    if(index==0){
      this.getFavorite(true)
    }else{
      this.getNewList(true)
    }
  },
  /**
       * 用户点击右上角分享
       */
  onShareAppMessage: function (res) {

  }
})