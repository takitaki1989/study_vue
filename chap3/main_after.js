Vue.filter('number_format', function(val) {
  return val.toLocaleString();
})

var app = new Vue({
  el: '#app',
   data: {
      count: 0,
      showSaleItem: false,
      showDelvFree: false,
      sortOrder: 1,
      products: [
        {id: 1, name: 'Michael<br>スマホケース', price: 1580, image: 'images/01.jpg', delv:0, isSale: true},
        {id: 2, name: 'Raphael<br>スマホケース', price: 1580, image: 'images/02.jpg', delv:0, isSale: true},
        {id: 3, name: 'Gabriel<br>スマホケース', price: 1580, image: 'images/03.jpg', delv:240, isSale: true},
        {id: 4, name: 'Uriel<br>スマホケース', price: 980, image: 'images/04.jpg', delv:0, isSale: true},
        {id: 5, name: 'Ariel<br>スマホケース', price: 980, image: 'images/05.jpg', delv:0, isSale: false},
        {id: 6, name: 'Azreal<br>スマホケース', price: 1580, image: 'images/06.jpg', delv:0, isSale: false}
      ]
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
});