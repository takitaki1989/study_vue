var nodeApp = document.querySelector('#app');

var nodeCheckbox = nodeApp.querySelectorAll('input[type="checkbox"]');
nodeCheckbox[0].addEventListener('change', onCheckChanged, false);
nodeCheckbox[1].addEventListener('change', onCheckChanged, false);

var nodeSelect = nodeApp.querySelector('.sorting');
nodeSelect.addEventListener('change', onOrderChanged, false);

var nodeItemsOrg = nodeApp.querySelectorAll('.item');

function onCheckChanged(event) {
  var nodeItems = nodeApp.querySelectorAll('.item');
  var nodeCount = nodeApp.querySelector('.count');
  var count = nodeItems.length;

  for( var i=0; i<nodeItems.length; i++) {
    showNode(nodeItems[i]);
  }

  if(nodeCheckbox[0].checked) {
    for(var i=0; i<nodeItems.length; i++) {
      if(!isSaleItem(nodeItems[i])) {
        hideNode(nodeItems[i]);
        count--;
      }
    }
  }

  if(nodeCheckbox[1].checked) {
    for(var i=0; i<nodeItems.length; i++) {
      if(!isDelvFreeItem(nodeItems[i])) {
        hideNode(nodeItems[i]);
        count--;
      }
    }
  }
  nodeCount.textContent = count + "件";
}

function onOrderChanged(event) {
  var nodeList = nodeApp.querySelector('.list');
  var nodeItems = nodeApp.querySelectorAll('.item');

  var products = [];
  for(var i=0; i<nodeItems.length; i++) {
    products.push(nodeItems[i]);
  }

  while(nodeList.firstChild) {
    nodeList.removeChild(nodeList.firstChild);
  }

  if(event.target.value == '1') {
    for(var i=0; i<products.length; i++) {
      nodeList.appendChild(nodeItemsOrg[i]);
    }
  } else if(event.target.value == '2') {
    products.sort(function(a, b) {
      var prevPrice = parseInt(a.querySelector('.price span').textContent.replace(',', ''));
      var currentPrice = parseInt(b.querySelector('.price span').textContent.replace(',', ''));
      return prevPrice - currentPrice;
    });
    for (var i=0; i<products.length; i++) {
      nodeList.appendChild(products[i]);
    }
  }
}

function isSaleItem(nodeItem) {
  var node = nodeItem.querySelector('.status');
  return (node && node.textContent == 'SALE');
}

function isDelvFreeItem(nodeItem) {
  var node = nodeItem.querySelector('.shipping-fee');
  return (node && node.textContent == '送料無料');
}

function hideNode(node) {
  node.setAttribute('style', 'display:none');
}

function showNode(node) {
  node.removeAttribute('style');
}