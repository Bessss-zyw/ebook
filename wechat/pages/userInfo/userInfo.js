const util = require("../../utils/util");
var app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({

  data: {
    userDetail: null
  },

  logout: function () {
    wx.request({
      url: util.apiUrl + '/logout', 
      data: {
        1: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.sessionId
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode != 200) {
          Toast.fail('退出登陆失败！');
          return;
        }

        Toast.success('退出登陆成功！');
        app.globalData.userDetail = null;
        app.globalData.userInfo = null;
        app.globalData.loginState = false;
        console.log(getApp().globalData);
        wx.reLaunch({
          url: '/pages/login/login',
        })
      },
      fail: function (err) {
        console.log(err);
        Toast.fail('连接失败！');
      }
    })
  },


  onLoad: function (options) {
    this.setData({
      userDetail: getApp().globalData.userDetail
    })
    console.log(this.data);
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})