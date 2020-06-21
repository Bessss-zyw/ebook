Component({
  properties: {
    innerText: {
      type: String,
      value: 'default value',
    },
    bookid: {
      type: Number,
      value: 0
    },
    imgUrl: {
      type: String,
      value: "../../static/img/1.png"
    },
    
  },
  data: {
  },
  methods: {
    gotoDetail: function(){
      wx.navigateTo({
        url: '../../pages/book-detail/book-detail?bookid=' + this.data.bookid,
      })
    }
  }
})
