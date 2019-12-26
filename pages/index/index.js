//index.js
//获取应用实例
const app = getApp()

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

var timeout = 60;
var out = null;
Page({
  // this.setData({ msg: "Hello World" });

  data: {
    getInput: null,
    message: "结果显示"
  },

  getInput: function(e) { //方法1
    this.data.getInput = e.detail.value;
  },

  clickMe: function(e) {
    //获取input
    if (this.data.getInput == null)
      return;
    var inputed = this.data.getInput;
    var item = inputed.split('\/');
    //显示结果
    var self = this;
    var outInter = setInterval(function() {
      var num = item.length - 1;

      //取随机数
      var order = randomNum(1, num);

      out = item[order - 1];
      self.setData({
        message: out
      })
      if (timeout-- == 0) {
        console.log("end", out);
        clearInterval(outInter);
        timeout = 60;
        wx.showModal({
          title: '提示',
          content: out,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }, 50);
  },
})