// pages/page/stockOrder/stockOrder.js
const app = getApp();
let searchTimer;
import Api from "../../../utils/api.js";
var seeImg = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 111,
    orderCategory: app.globalData.orderCategoryStock,
    keyWords: '',
    //导航
    nav: [{
      title: "全部",
      state: 'all'
    }, {
      title: "待付款",
      state: 'unpaid'
    }, {
      title: "待发货",
      state: "wait_deliver"
    }, {
      title: "待收货",
      state: "delivered"
    }, {
      title: "已完成",
      state: "finish"
    }],
    navindex: 0,
    whitch: 'all', //切换
    //理由
    reason: [{
      title: "我不想买了",
      selected: true
    }, {
      title: "信息填写错误，重新拍",
      selected: false
    }, {
      title: "卖家缺货",
      selected: false
    }, {
      title: "同城见面交易",
      selected: false
    }, {
      title: "其他",
      selected: false
    }],
    cancelIndex: 0,
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 1)
  },
  //查看凭证
  seeVoucher(e) {
    let num = e.currentTarget.dataset.num;
    Api.seeVoucher({
      orderNumber: num
    }).then((res) => {
      if (res.obj.payVoucher) {
        seeImg = true;
        wx.previewImage({
          urls: [this.data.baseUrl + res.obj.payVoucher]
        })
      } else {
        wx.showToast({
          title: '未上传付款凭证',
          icon: 'none'
        })
      }
    })
  },

  showModal(e) {
    let type = e.currentTarget.dataset.type,
      num = e.currentTarget.dataset.num,
      obj = {};
    switch (type) {
      case "code":
        obj = {
          codeModal: true,
          codeNum: e.currentTarget.dataset.code
        }
        break;
      case 'get':
        obj = {
          sureModal: true,
          getNum: e.currentTarget.dataset.num
        };
        break;
      case 'del':
        let index = e.currentTarget.dataset.index;
        obj = {
          delModal: true,
          delNum: {
            num: num,
            index: index
          }
        };
        break;
      case 'cancel':
        obj = {
          cancelModal: true,
          cancelNum: num
        };
        break;
      case 'after':
        obj = {
          afterModal: true,
          afterTel: e.currentTarget.dataset.tel
        };
        break;
      case "payment":
        let i = e.currentTarget.dataset.index;
        obj = {
          paymentModal: true,
          paymentItem: this.data.showList[i]
        };
        break;
    }
    this.setData(obj)
  },
  closeModal() {
    this.setData({
      codeModal: false, //取货码
      sureModal: false, //收款
      delModal: false, //删除
      cancelModal: false, //取消订单
      afterModal: false, //售后
      paymentModal: false //支付二维码      
    })
  },
  //取消理由
  swichReason(e) {
    var current = e.currentTarget.dataset.current;
    var array = this.data.reason
    array.forEach((item, index, arr) => {
      if (current == index) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    })
    this.setData({
      reason: array,
      cancelIndex: current
    })
  },
  sureCancel() {
    let num = this.data.cancelNum,
      index = this.data.cancelIndex;
    Api.cancelOrder({
      reason: this.data.reason[index].title,
      orderNumber: num
    }).then((res) => {
      this.afterOperation();
      wx.showToast({
        title: res.message,
        icon: "none"
      })
    })
  },
  //上传还款凭证
  uploadVoucher(e) {
    let num = e.currentTarget.dataset.num;
    wx.navigateTo({
      url: '../../role/supplyVoucher/supplyVoucher?num=' + num,
    })
  },
  // 确认收货
  sureSure(e) {
    let num = this.data.getNum;
    Api.receiveOrder({
      orderNumber: num
    }).then((res) => {
      Api.showToast(res.message)
      this.afterOperation();
    })
  },
  //删除
  sureDel() {
    let del = this.data.delNum,
      list = this.data.showList;
    if (del) {
      Api.deleteOrder({
        orderNumber: del.num
      }).then((res) => {
        Api.showToast(res.message)
        //删除成功剔除
        if (res.success) {
          this.afterOperation();
        }
      })
    }
  },
  //切换导航
  swichNav(e) {
    var current = e.currentTarget.dataset.current;
    var state = e.currentTarget.dataset.state;
    if (current == this.data.navindex) {
      return false;
    } else {
      this.setData({
        navindex: current,
        whitch: state
      })
    }
    this.initData();
  },
  searchBtn(e) {
    clearTimeout(searchTimer);
    this.setData({
      style: true,
      keyWords: e.detail.value
    })
    searchTimer = setTimeout(() => {
      this.initData();
    }, 1000)
  },

  //跳转
  toOrderDetail(e) {
    let num = e.currentTarget.dataset.num,
      status = e.currentTarget.dataset.status,
      type = e.currentTarget.dataset.type,
      tourl = "../allOrder/allOrder";
    if (type == 1) {
      //自提
      tourl += "?self=true";
    } else {
      tourl += "?self=false";
    }

    wx.navigateTo({
      url: tourl + "&status=" + status + "&num=" + num + "&type=list",
    })
  },
  //刷新数据
  reshList: function() {
    var data = {
      orderCategory: this.data.orderCategory,
      orderStatus: this.data.whitch,
      keyWords: this.datakeyWords
    }
    this.getList(data,true);
  },
  afterOperation() {
    this.closeModal();
    this.initData();
  },
  // 初始化参数
  initData: function() {
    var _this = this
    app.pageRequest.pageData.pageNum = 0;
    var data = {
      orderCategory: this.data.orderCategory,
      orderStatus: this.data.whitch,
      keyWords: this.data.keyWords
    }
    this.setData({
      showList: []
    }, function() {
      _this.getList(data)
    })
  },
  //获取订单列表
  getList(data, nextPage) {
    var _this = this
    Api.orderList(data, nextPage)
      .then(res => {
        if (res.obj && res.obj.result) {
          this.setData({
            showList: this.data.showList.concat(res.obj.result)
          })
        }
      })
  },
  resetData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) { // 循环订单
      let oldGoods = data[i].goodsInfoList, //商品数组
        newGoods = [];
      for (let j = 0; j < oldGoods.length; j++) { //货品循环
        let type = oldGoods[j].goodsSkuInfoVOList; //规格数组
        for (let k = 0; k < type.length; k++) {
          //当前货物,类型变为对象
          let nowGood = {};
          Object.assign(nowGood, oldGoods[j]);
          nowGood.goodsSkuInfoVOList = type[k];
          newGoods.push(nowGood);
        }
      }
      //编辑新订单数组
      let newOrder = data[i];
      newOrder.goodsInfoList = newGoods;
      arr.push(newOrder)
    }
    this.setData({
      showList: this.data.showList.concat(arr)
    })
  },
  //变化时间
  // formateDate(data){
  //   data.forEach(el=>{
  //     if (el.timeoutExpressSecond){
  //       util.total_micro_second = el.timeoutExpressSecond
  //       el.timeoutExpressSecond = util.count_down(this);
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      // storeId: API.getThisStoreId(),   //列表请求
      baseUrl: app.globalData.imageUrl //图片
    })
    // API.getPaymentImg().then(res => {
    //   if (res.obj) {
    //     this.setData({
    //       hasPayImg: true
    //     })
    //   }
    // })
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
    if (seeImg) {
      seeImg = false;
      return;
    }
    this.initData();
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
    this.reshList()
  },

})