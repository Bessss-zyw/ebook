// pages/login/login.js
const util = require("../../utils/util");
var app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({
  data: {
    username: "zyw",
    password: "zhangyiwen123"
  },

  nameOnChange: function(event) {
    this.setData({username: event.detail})
    console.log(this.data);
  },

  pwOnChange: function(event) {
    this.setData({password: event.detail})
    console.log(this.data);
  },

  login: function() {
    wx.request({
      url: util.apiUrl + '/login', 
      data: {
        username: this.data.username,
        password: this.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' 
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      },
      success: function(res) {
        console.log(res.data);

        // login failed
        if (res.data.status != 0) {
          Toast.fail('登陆失败！');
          return;
        }
        
        // login successfully
        Toast.success('登陆成功！');
        app.globalData.userInfo = {
          userId: res.data.data.userId,
          authority: res.data.data.userType,
          username: res.data.data.username
        }
        app.globalData.loginState = true;
        app.globalData.sessionId = res.header["Set-Cookie"];
        console.log(getApp().globalData);

        // get user detail infomation
        wx.request({
          url: util.apiUrl + '/getUserInfo', 
          data: {
            user_id: res.data.data.userId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': app.globalData.sessionId
          },
          success: function(res) {
            console.log(res);
            if (res.statusCode != 200) {
              Toast.fail('获取用户信息失败！');
              return;
            }

            Toast.success('获取用户信息成功！');
            app.globalData.userDetail = res.data;
            console.log(getApp().globalData);
            wx.reLaunch({
              url: '/pages/home/home',
            })
          },
          fail: function (err) {
            console.log(err);
            Toast.fail('获取用户信息失败！');
          }
        })
      }
    })
  },

  

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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

  }
})