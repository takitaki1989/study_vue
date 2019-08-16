Vue.filter('number_format', function(val) {
  return val.toLocaleString();
});

var app = new Vue({
  el: '#app',
  data: {
    showSaleItem: false,
    showDelvFree: false,
    sortOrder: 1,
    products: [],
    isError: false,
    message: ''
  },
  created: function() {
    var url = 'http://127.0.0.1:5500/chap4/products.js';
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'products'
    }).done(function(data, textStatus, jqXHR) {
      console.log('success!!');
      this.products = data;
    }.bind(this))
    .fail(function(data, textStatus, jqXHR) {
      this.isError = true;
      this.message = '商品のリストの読み込みに失敗しました。'
    }.bind(this));
  },
  computed: {
    filteredList: function() {
      var newList = [];
      for(var i=0; i<this.products.length; i++) {
        var isShow = true;
        if(this.showSaleItem && !this.products[i].isSale) {
          isShow = false;
        }
        if(this.showDelvFree && !this.products[i].delv > 0) {
          isShow = false;
        }

        if(isShow) {
          newList.push(this.products[i]);
        }
      }

      if(this.sortOrder == 1) {

      } else if(this.sortOrder == 2) {
        newList.sort(function(a, b) {
          return a.price - b.price;
        });
      }
      return newList;
    }
  }
})