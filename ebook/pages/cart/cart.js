const util = require("../../utils/util");
var app = getApp();
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({
  data: {
    imgUrl: "../../static/img/book.png",
    cartItems: []
  },


  onLoad: function () {
    var myThis= this;

    wx.request({
      url: util.apiUrl + '/getCart', 
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
          cartItems: res.data
        })
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  },

  onShow: function() {
    this.onLoad();
  },

  gotoDetail: function(options) {
    console.log(options);
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookid=' + options.currentTarget.id})
  },

  deleteItem: function(options) {
    console.log(options.currentTarget.id);
    var myThis= this;
    var bookid = options.currentTarget.id;

    wx.request({
      url: util.apiUrl + '/removeFromCart', 
      data: {
        user_id: parseInt(app.globalData.userInfo.userId),
        book_id: bookid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': app.globalData.sessionId
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode != 200) {
          Toast.fail(res.data.msg);
          return;
        }

        Toast.success(res.data.msg);

        var newData = [];
        myThis.data.cartItems.forEach((item) =>{
          if (item.book_id != bookid) {
              newData.push(item);
            }
        });
        console.log(newData);
        
        myThis.setData({
          cartItems: newData
        })
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  },

  clearCart: function() {
    var myThis= this;

    wx.request({
      url: util.apiUrl + '/clearCart', 
      data: {
        user_id: parseInt(app.globalData.userInfo.userId),
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

        Toast.success(res.data.msg);
        
        myThis.setData({
          cartItems: []
        })
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  },

  makeOrder: function() {
    let myThis = this;

    wx.request({
      url: util.apiUrl + '/createOrder', 
      data: {
        user_id: parseInt(app.globalData.userInfo.userId),
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

        let order_id = res.data.order_id;
        let items = myThis.data.cartItems;
        // add items
        for (let i = 0; i < items.length; i++){
          console.log(items[i]);
          myThis.addItem(order_id, items[i].cart_item_id);
        }

        myThis.setData({
          cartItems: []
        })

        myThis.clearCart();
        Toast.success("下订单成功！");
        wx.switchTab({
          url: '../order/order'})
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  },

  addItem: function(order_id, cart_item_id){
    wx.request({
      url: util.apiUrl + '/addOrderItem', 
      data: {
        order_id: order_id,
        cart_id: cart_item_id
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
      },
      fail: function (err) {
        console.log(err)
        Toast.fail('连接失败！');
      }
    })
  }
  
})
