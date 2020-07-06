// pages/book-detail/book-detail.js
const util = require("../../utils/util");
var app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";


Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    bookid: 0,
    bookInfo: {
      bookId: 0,
      name: "this is a very long long long book name",
      price: 0,
      type: 'unknown',
      isbn: "0",
      image: "../../static/img/book.png",
      author: "zyw",
      inventory: 0,
      description: "balabala, this is a very long long long book introduction, this is a very long long long book introduction,this is a very long long long book introduction,this is a very long long long book introduction,this is a very long long long book introduction."
    }
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // check login state
    if (app.globalData.loginState == false) {
      Toast.fail('登陆失效，请再次登陆！');
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }

    this.setData({
      bookid: options.bookid,
      userInfo: getApp().globalData.userInfo
    })


    // get book info
    var myThis= this;
    wx.request({
      url: util.apiUrl + '/getBook', 
      data: {
        id: options.bookid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.sessionId
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode != 200) {
          Toast.fail('未能获取图书信息！');
          return;
        }
        myThis.setData({
          bookInfo: res.data
        })
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  },

  addToCart: function() {
    wx.request({
      url: util.apiUrl + '/addToCart', 
      data: {
        user_id: getApp().globalData.userInfo.userId,
        book_id: this.data.bookid,
        book_name: this.data.bookInfo.name
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': app.globalData.sessionId
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode != 200) {
          Toast.fail('未能获取图书信息！');
          return;
        }
        else {
          Toast.success(res.data.msg);
          return;
        }
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  }

  
})