const util = require("../../utils/util");
var app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({

  /**
   * Page initial data
   */
  data: {
    orders: [],
    activeNames: [],
    orderItems: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var myThis= this;

    wx.request({
      url: util.apiUrl + '/getUserOrder', 
      data: {
        user_id: parseInt(app.globalData.userInfo.userId)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.sessionId
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode != 200) {
          Toast.fail(res.data.msg);
          return;
        }
        myThis.setData({
          orders: res.data
        })
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.onLoad();

    // get order items
    // let myThis = this;
    // let order = this.data.orders;
    // for(let i = 0;i < order.length; ++i){

    // }
  },

  getItems(order_id) {
    let myThis = this;
    wx.request({
      url: util.apiUrl + '/getOrderItems', 
      data: {
        order_id: order_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.sessionId
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode != 200) {
          Toast.fail(res.data.msg);
          return;
        }
        myThis.setData({
          orderItems: res.data,
          activeNames: order_id,
        });
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
        this.setData({
          activeNames: order_id,
        });
      }
    })
  },

  onChange(event) {
    console.log(event.detail);
    this.getItems(event.detail);
  },

})