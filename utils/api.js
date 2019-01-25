import {
  mallIndexUrl,
  goodsSerUrl,
  storeLookUrl,
  favoriteUrl,
  firstCodeUrl,
  childCategoryCodeUrl,
  storeSerListUrl,
  addressListUrl,
  addressDeleteUrl,
  addressInfoUrl,
  floorStoreUrl,
  addressDefaultUrl,
  saveAddressUrl,
  editAddressUrl,
  newsUrl,
  workIndexUrl,
  superAdminWorkUrl,
  isAdminUrl,
  identityUserUrl,
  removeDefaultUrl,
  adminMallStoreListUrl,
  purchaserStoreUrl,
  resetPasswordUrl,
  phoneMessageUrl,
  registerUrl,
  registerPhoneMsgUrl,
  changeIconUrl,
  userFloorInfoUrl,
  floorListUrl,
  indexUrl,
  mewWholesalerUrl,
  setNameUrl,
  addWholesalerUrl,
  passUrl,
  wholesalerAllUrl,
  serWholesalerListUrl,
  acceptmerchantUrl,
  purchaserUserIdUrl,
  applyinfoUrl,
  isFriendUrl,
  apiSetUserUrl,
  apiAddUserUrl,
  showPurchaserUrl,
  isFriendStoreUrl,
  cloudOrderDetailUrl,
  floorAdminStoreListUrl,
  floorStoreListUrl,
  cancelOrderUrl,
  getPaymentImgUrl,
  uploadPayVoucherUrl,
  orderDetailUrl,
  seeVoucherUrl,
  quitUrl,
  updataPwdUrl,
  orderListUrl,
  deleteOrderUrl,
  receiveOrderUrl,
  findGoodsUrl
} from './constUrl.js'

import {
  owner
} from './const.js'

import AuthHandler from './authHandler.js';

const app = getApp()
/**判断是否为空**/
function isNotEmpty(str) {
  if (str == '' || str == undefined || str == null) {
    return false
  } else {
    return true
  }
}
/**提示**/
function showToast(message) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 4000,
  })
}
/**判断楼座是否为空**/
function isFloorInfo(obj) {
  if (isNotEmpty(obj)){
    var floor = obj.floor
    if (floor==undefined){
        var floor = obj
        floor.mallName = floor.mallName == null ? '' : floor.mallName,
        floor.areaName = floor.areaName == null ? '' : floor.areaName,
        floor.balconyName = floor.balconyName == null ? '' : floor.balconyName,
        floor.floorName = floor.floorName == null ? '' : floor.floorName,
        floor.floorDescription = floor.floorDescription == null ? '' : floor.floorDescription,
        floor.storeDoorNum = floor.storeDoorNum == null ? '' : floor.storeDoorNum
    }else{
        floor.mallName = floor.mallName == null ? '' : floor.mallName,
        floor.areaName = floor.areaName == null ? '' : floor.areaName,
        floor.balconyName = floor.balconyName == null ? '' : floor.balconyName,
        floor.floorName = floor.floorName == null ? '' : floor.floorName,
        floor.floorDescription = floor.floorDescription == null ? '' : floor.floorDescription,
        floor.storeDoorNum = floor.storeDoorNum == null ? '' : floor.storeDoorNum
    }
    return floor
  }else{
    return null
  }
}
/**mall首页**/
function mallIndex(data) {
  data = initowner(data);
  return app.http.getRequest(mallIndexUrl, data)
}
/**超级管理员工作台首页**/
function superAdminWork(data) {
  data = initowner(data);
  return app.http.getRequest(superAdminWorkUrl, data)
}
/**用户身份判断**/
function identityUser(data) {
  return app.http.getRequest(identityUserUrl, data)
}
/**工作台首页**/
function workIndex(data) {
  return app.http.getRequest(workIndexUrl, data)
}
/**取消默认地址**/
function removeDefault(data) {
  return app.http.putRequest(removeDefaultUrl, data)
} 
/**商品搜索**/
function goodsSer(data, nextPage) {
  data = initowner(data);
  return app.pageRequest.pageGet(goodsSerUrl, data, nextPage)
}
/**最近上新**/
function news(data, nextPage) {
  data = initowner(data);
  return app.pageRequest.pageGet(newsUrl, data, nextPage)
}
/**关注推荐**/
function storeLook(data) {
  data = initowner();
  return app.http.getRequest(storeLookUrl, data)
}
/**判断是否是超级管理员**/
function isAdmin(data) {
  data = initowner(data);
  return app.http.getRequest(isAdminUrl, data)
}
/**超级管理员小云店管理**/
function adminShopList(data,nextPage){
  data = initowner(data);
  return app.pageRequest.pageGet(adminMallStoreListUrl, data, nextPage)
}
/**关注列表**/
function favorite(nextPage) {
  return app.pageRequest.pageGet(favoriteUrl, {}, nextPage)
}
/**上传图片**/
function uploadImage(types) {
  return app.http.chooseImageUpload(types)
}
/**分类一级**/
function firstCode(data) {
  return app.http.getRequest(firstCodeUrl, data)
}
/**子分类**/
function childCategoryCode(data) {
  return app.http.getRequest(childCategoryCodeUrl, data)
}
/**店铺搜索**/
function storeSerList(data, nextPage) {
  data = initowner(data);
  return app.pageRequest.pageGet(storeSerListUrl, data, nextPage)
}
/**小云店搜索**/
function floorStore(data) {
  data = initowner(data);
  return app.http.getRequest(floorStoreUrl, data)
}
/**获取用户地址列表**/
function addressList(data) {
  return app.http.getRequest(addressListUrl, data)
}
/**默认用户地址**/
function addressDefault(data) {
  return app.http.getRequest(addressDefaultUrl, data)
}

/**编辑地址**/
function editAddress(data) {
  return app.http.putRequest(editAddressUrl, data)
}
/**地址 删除**/
function addressDelete(data) {
  return app.http.deleteRequest(addressDeleteUrl, data)
}
/**地址添加**/
function saveAddress(data) {
  return app.http.postRequest(saveAddressUrl, data)
}
/**地址详情**/
function addressInfo(data) {
  return app.http.getRequest(addressInfoUrl, data)
}
/**重置密码**/
function resetPassword(data){
  return app.authHandler.postRequest(resetPasswordUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**短信验证码**/
function phoneMessage(data){
  return app.authHandler.getRequest(phoneMessageUrl, data)
}
/**注册**/
function register(data){
  return app.authHandler.postRequest(registerUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**退出登陆**/
function quit(data) {
  return app.authHandler.postRequest(quitUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**修改密码**/
function updataPwd(data) {
  return app.authHandler.postRequest(updataPwdUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**注册短信验证码**/
function registerPhoneMsg(data){
  return app.http.getRequest(registerPhoneMsgUrl, data)
}
// 上传凭证
function uploadVoucher(data) {
  return app.http.postRequest(uploadPayVoucherUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**
 * 获取用户对应进货商列表
 */
function getPurchaserStoreIds() {
  return new Promise((resolve, reject) => {
    //如果用户没有登录，则返回空
    if (!AuthHandler.isLogin()) {
      resolve([]);
    }
  
    app.http.getRequest(purchaserStoreUrl).then((res) => {
      resolve(res.obj);
    });
  });
}

/**
 * 初始化owner
 */
function initowner(data) {
  if (data == null || data == undefined) {
    data = {};
  }
  data.owner = owner;
  return data;
}

// 获取用户楼层信息
function userFloorInfo(data){
  return app.http.getRequest(userFloorInfoUrl, data)
}
// 裁剪图片跳转
function toCuttingImg(url, quality, width, height) {
  if (url) {
    let add = '/pages/page/upload/upload?src=' + url;
    quality ? add += "&quality=true" : "";
    add += "&width=";
    width ? add += width : add += "750";
    add += "&height=";
    height ? add += height : add += "750";
    wx.navigateTo({
      url: add,
    })
  }
}
// 修改头像
function changeIcon(data) {
  return app.http.putRequest(changeIconUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
// 楼层列表
function getFloorList(data){
  data = initowner(data);
  return app.http.getRequest(floorListUrl, data)
}
/**批发商数据**/
function index(data) {
  return app.http.getRequest(indexUrl, data)
}
/**新增批发商列表**/
function mewWholesaler(data,nextPage) {
  return app.pageRequest.pageGet(mewWholesalerUrl, data, nextPage)
}
/**批发商列表**/
function wholesalerAll(data, nextPage) {
  return app.pageRequest.pageGet(wholesalerAllUrl, data, nextPage)
}
/**获取用户权限设置**/
function apiSetUser(data) {
  return app.http.getRequest(apiSetUserUrl, data)
}
/**权限设置**/
function apiAddUser(data) {
  return app.http.putRequest(apiAddUserUrl + "?bfPripermission=" + data)
}
/**扫一扫查看批发商**/
function showPurchaser(data) {
  return app.http.getRequest(showPurchaserUrl, data)
}
/**添加批发商分页查询列表**/
function serWholesalerList(data, nextPage) {
  return app.pageRequest.pageGet(serWholesalerListUrl, data, nextPage)
}
/**判断与供应商是否是好友关系**/
function isFriendStore(data) {
  return app.http.getRequest(isFriendStoreUrl, data)
}
/**批发商资料**/
function purchaserUserId(url) {
  return app.http.getRequest(url)
}
/**进货商通过验证**/
function acceptmerchant(data) {
  return app.http.postRequest(acceptmerchantUrl, data)
}
/**添加批发商**/
function addWholesaler(data) {
  return app.http.postRequest(addWholesalerUrl, data)
}
/**设置备注**/
function setName(data) {
  return app.http.postRequest(setNameUrl, data)
}
// 小云店订单详情查询
function cloudOrderDetail(data){
  return app.http.getRequest(cloudOrderDetailUrl,data)
}
/**订单列表**/
function orderList(data, nextPage) {
  data = initowner(data);
  return app.pageRequest.pageGet(orderListUrl, data, nextPage)
}
/**删除订单**/
function deleteOrder(data) {
  return app.http.deleteRequest(deleteOrderUrl, data)
}
/**确认收货**/
function receiveOrder(data) {
  return app.http.postRequest(receiveOrderUrl, data)
} 
// 楼层筛选小云店
function floorStoreList(data,next){
  return app.pageRequest.pageGet(floorStoreListUrl, data , next)
}
// 楼管筛选小云店
function floorAdminStoreList(data, next) {
  return app.pageRequest.pageGet(floorAdminStoreListUrl, data, next)
}
// 取消订单
function cancelOrder(data) {
  let url = cancelOrderUrl + "?reason=" + encodeURI(data.reason)
  return app.http.putRequest(url, data)
}
// 获取收款二维码
function getPaymentImg(data) {
  return app.http.getRequest(getPaymentImgUrl, data)
}
//订单详情
function getOrderDetail(data) {
  return app.http.getRequest(orderDetailUrl, data);
}
// 查看凭证
function seeVoucher(data) {
  return app.http.getRequest(seeVoucherUrl, data)
}
// 发现好物
function findGoods(data) {
  data = initowner(data);
  return app.http.getRequest(findGoodsUrl, data)
}
module.exports = {
  updataPwd,
  quit,
  seeVoucher,
  getOrderDetail,
  uploadVoucher,
  getPaymentImg,
  cancelOrder,
  floorStoreList,
  floorAdminStoreList,
  cloudOrderDetail,
  isFloorInfo: isFloorInfo,
  index: index,
  acceptmerchant: acceptmerchant,
  addWholesaler: addWholesaler,
  setName:setName,
  purchaserUserId: purchaserUserId,
  isFriendStore: isFriendStore,
  serWholesalerList: serWholesalerList,
  showPurchaser: showPurchaser,
  mewWholesaler: mewWholesaler,
  wholesalerAll: wholesalerAll,
  apiSetUser: apiSetUser,
  apiAddUser: apiAddUser,
  getFloorList: getFloorList,
  showToast: showToast,
  isNotEmpty: isNotEmpty,
  changeIcon: changeIcon,
  toCuttingImg: toCuttingImg,
  userFloorInfo: userFloorInfo,
  mallIndex: mallIndex,
  goodsSer: goodsSer,
  storeLook: storeLook,
  favorite: favorite,
  uploadImage: uploadImage,
  firstCode: firstCode,
  childCategoryCode: childCategoryCode,
  storeSerList: storeSerList,
  floorStore: floorStore,
  addressList: addressList,
  addressDefault: addressDefault,
  addressDelete: addressDelete,
  saveAddress: saveAddress,
  addressInfo: addressInfo,
  editAddress: editAddress,
  addressDelete: addressDelete,
  news: news,
  workIndex: workIndex,
  superAdminWork: superAdminWork,
  isAdmin: isAdmin,
  removeDefault:removeDefault,
  identityUser:identityUser,
  adminShopList: adminShopList,
  getPurchaserStoreIds: getPurchaserStoreIds,
  resetPassword: resetPassword,
  phoneMessage: phoneMessage,
  register: register,
  registerPhoneMsg: registerPhoneMsg,
  orderList: orderList,
  deleteOrder: deleteOrder,
  receiveOrder: receiveOrder,
  findGoods: findGoods
}
