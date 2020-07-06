const util = require("../../utils/util");
var app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({
  data: {
    msg: 'hello',
    swiperImg: [
      'https://i.loli.net/2020/05/28/nEIVQGczWeKHSoX.jpg', 
      'https://i.loli.net/2020/05/28/ZsPRSGlVv5qFekA.jpg', 
      'https://i.loli.net/2020/05/28/pa1rUE9qzSMK5GA.jpg',
      'https://i.loli.net/2020/05/28/9pCZcXm8SEWx5oe.jpg'],
    books: [
      {
        id : 1,
        name: "name jioa",
        imgUrl: "../../static/img/book.png"
      },
      {
        id : 2,
        name: "name eahae",
        imgUrl: "../../static/img/book.png"
      },
      {
        id : 3,
        name: "name grea",
        imgUrl: "../../static/img/book.png"
      },
      {
        id : 4,
        name: "name",
        imgUrl: "../../static/img/book.png"
      },
      {
        id : 5,
        name: "name",
        imgUrl: "../../static/img/book.png"
      }
    ]
  },


  gotoDetail: function(options) {
    console.log(options);
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookid=' + options.currentTarget.id})
  },


  onLoad: function () {
    // check login state
    if (app.globalData.loginState == false) {
      Toast.fail('登陆失效，请再次登陆！');
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    var myThis= this;

    // get books info
    wx.request({
      url: util.apiUrl + '/getBooks', 
      data: {
        "search": null
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
        myThis.setData({
          books: res.data
        })
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  }
})
