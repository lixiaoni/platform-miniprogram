import {
  rStoreAppId,
  wStoreAppId,
  pathData
} from './const.js'
class JumpMiniprogram {
  //构造函数
  constructor() {
    this.pathData = pathData,
      this.rStoreAppId = rStoreAppId, //零售店APPID
      this.wStoreAppId = wStoreAppId, //批零店APPID
      this.path = '', //跳转的路径
      this.appId = '' //跳转的APPID
  }
  /**
   * 跳转对应小程序 storeNature判断店铺性质 1批零2零售  params参数 
   * pathSign:路径判断  1首页  2商品详情页面  3工作台 4小程序码页面  5个人中心页面
   */
  toMiniProgram(params, pathSign) {
    var storeNature = params.storeNature,
      goodsId = params.goodsId
    if (storeNature == "1") {
      this.appId = this.wStoreAppId
    } else if (storeNature == "2") {
      this.appId = this.rStoreAppId
    }
    // 判断需要跳转的路径
    if (pathSign == 3) {
      this.path = this.pathData.workbenchUrl + "?storeId=" + params.storeId
    } else if (pathSign == 2) {
      this.path = this.pathData.goodsDetailsUrl + "?storeId=" + params.storeId + "&goodsId=" + params.goodsId
    } else if (pathSign == 5) {
      this.path = this.pathData.userUrl + "?storeId=" + params.storeId
    }else {
      this.path = this.pathData.indexUrl + "?storeId=" + params.storeId
    }
    this.navigateToMiniProgram(params)
  }
  navigateToMiniProgram(params) {
    wx.navigateToMiniProgram({
      appId: this.appId,
      path: this.path,
      extraData: params,
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })
  }
}

export default JumpMiniprogram