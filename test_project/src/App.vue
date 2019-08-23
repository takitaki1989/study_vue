<template>
  <div id="app">
    <product-list v-bind:products="products"></product-list>
  </div>
</template>

<script>
import productList from './components/product-list.vue'

export default {
  name: 'app',
  components: {
    'product-list': productList
  },
  data: function() {
    return {
      products: [
        {id: 1, name: 'Michael<br>スマホケース', price: 1580, image: require('./assets/images/01.jpg'), delv:0, isSale: true},
        {id: 2, name: 'Raphael<br>スマホケース', price: 1580, image: require('./assets/images/02.jpg'), delv:0, isSale: true},
        {id: 3, name: 'Gabriel<br>スマホケース', price: 1580, image: require('./assets/images/03.jpg'), delv:240, isSale: true},
        {id: 4, name: 'Uriel<br>スマホケース', price: 980, image: require('./assets/images/04.jpg'), delv:0, isSale: true},
        {id: 5, name: 'Ariel<br>スマホケース', price: 980, image: require('./assets/images/05.jpg'), delv:0, isSale: false},
        {id: 6, name: 'Azreal<br>スマホケース', price: 1580, image: require('./assets/images/06.jpg'), delv:0, isSale: false}
      ]
    }
  }
}
</script>

<style>
body {
  background: #000;
  color: #fff;
}
</style>
