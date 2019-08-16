var btnLoad = document.querySelector('#load');

btnLoad.addEventListener('click', function(event) {
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = function() {
    if(this.readyState == 4 /* && this.status == 200 */) {
      var products = this.response;
      var result = document.querySelector('#result');
      result.textContent = '';

      for(var i=0; i<products.length; i++) {
        var text = '商品ID:' + products[i].id;
        text += ' 商品名:' + products[i].name;
        text += ' 料金:' + products[i].price;
        text += ' 画像パス:' + products[i].image;
        text += ' 送料:' + products[i].delv;
        text += ' セール対象:' + products[i].isSale;
        var div = document.createElement('div');
        div.textContent = text;
        result.appendChild(div);
      }
    }
  };

  xmlHttpRequest.responseType = 'json';
  xmlHttpRequest.open('GET', 'products.json');
  xmlHttpRequest.send();
})