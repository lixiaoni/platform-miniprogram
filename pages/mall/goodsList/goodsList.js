const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    baseUrl: app.globalData.imageUrl,
    getPurchaserStoreIds: '',
    noData:false,
    noMore:false,
    code:'',
    indexShow:false,
    codeList:false
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 2)
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
    var _this = this,
    code=this.data.code
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          getPurchaserStoreIds: res
        }, function () {
          if (options.index) {
            var index = options.index
            Api.mallIndex()
              .then(res => {
                const obj = res.obj
                const goodsList = obj.youLifeChosenGoods[index].goodsList
                for (var j = 0; j < goodsList.length; j++) {
                  if (j < 5) {
                    if (_this.isPurchaser(goodsList[j].storeId)) {
                      goodsList[j].isPurchaser = true
                    } else {
                      goodsList[j].isPurchaser = false
                    }
                  }
                }
                _this.setData({
                  goodsList: goodsList,
                  indexShow:true
                })
                wx.setNavigationBarTitle({
                  title: obj.youLifeChosenGoods[index].name
                })
              })
          }
          if (options.code || code) {
            wx.setNavigationBarTitle({
              title: options.keyword
            })
            _this.setData({
              code: options.code,
              codeList:true
            },function(){
              _this.getSerList()
            })
          }
        })
      })
  },
  getSerList(nextPage){
    var _this=this,
    code=this.data.code
    Api.goodsSer({ categoryCode: code }, nextPage)
      .then(res => {
        const detailList = res.obj
        if (!Api.isNotEmpty(detailList)){
          _this.setData({
            noMore:true
          })
        }
        for (var j = 0; j < detailList.length; j++) {
          if (j < 5) {
            if (_this.isPurchaser(detailList[j].storeId)) {
              detailList[j].isPurchaser = true
            } else {
              detailList[j].isPurchaser = false
            }
          }
        }
        var datas = _this.data.goodsList,
          newArr = app.pageRequest.addDataList(datas, detailList)
        
        _this.setData({
          goodsList: newArr,
          noData:true
        })
      })
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
    if(!this.data.indexShow){
      this.getSerList(true)
    }
  },
})