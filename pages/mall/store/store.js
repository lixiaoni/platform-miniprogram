const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    stTab:-1,
    baseUrl: app.globalData.imageUrl,
    floorTab:-1,
    serHide:false,
    dataList:[],
    value:'',
    childList: [],
    childListLast:[],
    balconyCode:'',
    businessScope:'',
    floorCode:'',
    floorAreaCode:'',
    getPurchaserStoreIds:'',
    isShow:true,
    showNav:true,
    dataNav: [{
      name: "服饰内衣",
      checked: false,
      color: "#fff",
      colorTrue: "#cde6dc"
    },
    {
      name: "母婴玩具",
      checked: false,
      color: "#fff",
      colorTrue: "#d6cde6"
    },
    {
      name: "鞋类箱包",
      checked: false,
      color: "#fff",
      colorTrue: "#cddee6"
    },
    {
      name: "运动户外",
      checked: false,
      color: "#fff",
      colorTrue: "#d4e6cd"
    },
    {
      name: "珠宝配饰",
      checked: false,
      color: "#fff",
      colorTrue: "#cde6dc"
    },
    {
      name: "化妆品",
      checked: false,
      color: "#fff",
      colorTrue: "#d6cde6"
    },
    {
      name: "家居家纺",
      checked: false,
      color: "#fff",
      colorTrue: "#cddee6"
    },
    {
      name: "日用百货",
      checked: false,
      color: "#fff",
      colorTrue: "#d4e6cd"
    },
    {
      name: "电子产品",
      checked: false,
      color: "#fff",
      colorTrue: "#cde6dc"
    },
    {
      name: "礼品婚庆",
      checked: false,
      color: "#fff",
      colorTrue: "#d6cde6"
    },
    {
      name: "仿真花艺",
      checked: false,
      color: "#fff",
      colorTrue: "#cddee6"
    },
    ],
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 1)
  },
  isPurchaser: function (index) {
    var arr = this.data.getPurchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          getPurchaserStoreIds: res
        }, function () {
          _this.serachData()
        })
      })
    
  },
  // 列表
  getList: function (data, nextPage){
    var   _this = this
    Api.storeSerList(data,nextPage)
      .then(res => {
      if(res.obj!==null){
        var dataList = res.obj.result
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].floorInfo = Api.isFloorInfo(dataList[i].floorInfo)
          if (_this.isPurchaser(dataList[i].storeId)) {
            dataList[i].isPurchaser = true
          } else {
            dataList[i].isPurchaser = false
          }
        }
        var newArr=[],
          datas = _this.data.dataList
          newArr = app.pageRequest.addDataList(datas, dataList)
        _this.setData({
          dataList: newArr,
        })
       }else{
        wx.showToast({
          title: '暂无更多了！',
          icon: 'none',
          duration: 2000
        })
       }
        _this.setData({
          serHide: false,
        })
      })
  },
  changeValue:function(e){
    this.setData({
      value: e.detail.value
    })
  },
  searchBtn1:function(){
    if (!this.data.value){return}
    this.setData({
      dataList: []
    })
    this.serachData()
  },
  // 参数配置  搜索
  serachData:function(){
    var data = { keyword: this.data.value, businessScope: this.data.businessScope}
    this.getList(data)
  },
  // 搜索
  serNav: function (e) {
    var that = this,
      index = e.target.dataset.current,
      name = e.target.dataset.name
    if (this.data.stTab === index) {
      return false;
    } else {
      that.setData({
        stTab: index,
        businessScope: name,
        dataList: []
      },function(){
        that.serachData()
      })
    }
  },
  searchBtn: function (e) {
    this.setData({
      dataList: [],
      showNav:true,
      businessScope: this.data.businessScope
    })
    this.serachData()
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
    this.setData({
      dataList: []
    })
    var _this = this,
      keyword = this.data.value,
      businessScope = this.data.businessScope
    this.serachData()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bindDownLoad:function(){
   
  },
  onReachBottom: function () {
    var _this = this,
      keyword = this.data.value,
      businessScope = this.data.businessScope
    this.getList({ keyword: keyword, businessScope: businessScope}, true)
  },
  /**
         * 用户点击右上角分享
         */
  onShareAppMessage: function (res) {
    return {
      title: "逛小云店",
      success: (res) => {
      },
      fail: (res) => {
      }
    }
  }
})