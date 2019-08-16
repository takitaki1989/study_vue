$('#load').on('click', clickHandler);

var url = 'http://127.0.0.1:5500/chap4/products.js';

function clickHandler(event) {
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'products'
  }).done(function(data, textStatus, jqXHR) {
    console.log('success!!');
    updateScreen(data);
  }).fail(function(data, textStatus, jqXHR) {
    console.log('failure!!');
  })
}

function updateScreen(products) {
  $('#result').empty();
  var list = '';
  for(var i=0; i<products.length; i++) {
    list += '<div>';
    list += '商品ID:' + products[i].id;
    list += ' 商品名:' + products[i].name;
    list += ' 料金:' + products[i].price;
    list += ' 画像パス:' + products[i].image;
    list += ' 送料:' + products[i].delv;
    list += ' セール対象:' + products[i].isSale;
    list += '</div>';
  }
  $('#result').append(list);
}