// pages/book-detail/book-detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    bookid: 0,
    bookInfo: {
      name: "this is a very long long long book name",
      price: 0,
      imgUrl: "../../static/img/book.png",
      author: "zyw",
      language: "Chinese",
      detail: "balabala, this is a very long long long book name, this is a very long long long book name,this is a very long long long book name,this is a very long long long book name,this is a very long long long book name."
    }
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      bookid: options.bookid
    })
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