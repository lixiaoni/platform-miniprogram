/* 时间格式化 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**倒计时   定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数**/
/* 毫秒级倒计时 */
function count_down(that,sec) {
  var total_micro_second = sec ? sec : 0;   
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 1000;
    count_down(that, total_micro_second);
  }
    , 1000)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return hr + ":" + min + ":" + sec ;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

// 保存至相册
const saveImgToPhone = imgUrl => {
  wx.showLoading({
    title: "保存中",
  })
  wx.downloadFile({
    url: imgUrl,
    success: function (res) {
      if (res.statusCode === 200) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存图片成功！',
              icon: 'none'
            })
          },
          fail(res) {
            wx.showToast({
              title: '保存图片失败！',
              icon: 'none'
            })
          }
        })
      }
    },
    complete: function (res) {
      wx.hideLoading()
    }
  })
}
module.exports = {
  formatTime: formatTime,
  count_down:count_down,
  saveImgToPhone: saveImgToPhone
}

