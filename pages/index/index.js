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

Page({
  
  data: {
    getInput: null
  },
    getInput: function (e) {//方法1
    this.data.getInput = e.detail.value;
  },
  clickMe: function (e) {
    //获取input
    var inputed = this.data.getInput;
    //解析数量
    var i = 0;
    var num = 0;
    for(i in inputed)
    {
      if(inputed[i] == ',')
        num++;
    }
    console.log("total num",num);
    //取随机数
    var order = randomNum(1, num);
    console.log("random",order);
    //找第order个','
    var outBuf;
    i=0;
    for (i in inputed) {
      if (inputed[i] == ',')
      {
        order--;
        if(order == 0)
        {
          i--;
          outBuf = inputed.substring(i);
          break;
        }
      }
    }

    console.log("outBuf", outBuf);
    var outPos,cnt= 0;
    i=0;
    for (i in outBuf) {
      if (outBuf[i] == ',') {
          outPos = i;
          break;
      }
    }
    console.log("outPos", outPos);
    var out = outBuf.substring(0, outPos);
    console.log("out", out);
    //显示结果
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
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
