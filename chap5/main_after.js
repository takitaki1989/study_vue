Vue.filter('number_format', function(val) {
  return val.toLocaleString();
})

var app = new Vue({
    el: '#app',
    data: {
      taxRate: 0.08,
      movieType: '余興ムービー',
      basePrice: 30000,
      addPrice1: 5000,
      addPrice2: 10000,
      addPrice3: 15000,
      addPrice4: 20000,
      addPrice5: 40000,
      addPrice6: 45000,
      addPrice7: 50000,
      optPrice: 0,
      totalPrice: 0,
      wedding_date: '',
      delivery_date: '',
      opt1_use: false,
      opt1_price: 5000,
      opt2_use: false,
      opt2_price: 5000,
      opt3_use: false,
      opt3_price: 5000,
      opt4_num: 0,
      opt4_price: 500,
      tommorow: null
    },
    methods: {
      // 税込み価格にする
      incTax: function(untaxed) {
        return Math.floor(untaxed * (1 + this.taxRate));
      },
      // 日付の差を求める
      getDateDiff: function(dateString1, dateString2) {
        var date1 = new Date(dateString1);
        var date2 = new Date(dateString2);
        var msDiff = date1.getTime() - date2.getTime();
        return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
      },
      formatDate: function(dt) {
        var y = dt.getFullYear();
        var m = ('00' + (dt.getMonth() + 1)).slice(-2);
        var d = ('00' + dt.getDate()).slice(-2);
        return (y + '-' + m + '-' + d);
      }
    },
    computed: {
      taxedOpt1: function() {
        return this.incTax(this.opt1_price);
      },
      taxedOpt2: function() {
        return this.incTax(this.opt2_price);
      },
      taxedOpt3: function() {
        return this.incTax(this.opt3_price);
      },
      taxedOpt4: function() {
        return this.incTax(this.opt4_price);
      },
      taxedTotalPrice: function() {
        return (this.taxedBasePrice + this.taxedOptPrice);
      },
      taxedBasePrice: function() {
        var addPrice = 0;
        var dateDiff = this.getDateDiff(this.delivery_date, (new Date()).toLocaleString());

        if(21 <= dateDiff && dateDiff < 30) {
          addPrice = this.addPrice1;
        } else if(14 <= dateDiff && dateDiff < 21) {
          addPrice = this.addPrice2;
        } else if(7 <= dateDiff && dateDiff < 14) {
          addPrice = this.addPrice3;
        } else if(3 < dateDiff && dateDiff < 7) {
          addPrice = this.addPrice4;
        } else if(dateDiff == 3) {
          addPrice = this.addPrice5;
        } else if(dateDiff == 2) {
          addPrice = this.addPrice6;
        } else if (dateDiff == 1) {
          addPrice = this.addPrice7;
        }
        return this.incTax(this.basePrice + addPrice);
      },
      taxedOptPrice: function() {
        var optPrice = 0;
        if(this.opt1_use) { optPrice += this.opt1_price; }
        if(this.opt2_use) { optPrice += this.opt2_price; }
        if(this.opt3_use) { optPrice += this.opt3_price; }
        if(this.opt4_num == '') { this.opt4_num = 0; }
        optPrice += this.opt4_num * this.opt4_price;
        return this.incTax(optPrice);
      },
      tommorow: function() {
        var dt = new Date();
        dt.setDate(dt.getDate() + 1);
        return this.formatDate(dt);
      }
    },
    created: function() {
      var dt = new Date();
      dt.setMonth(dt.getMonth() + 2);
      this.wedding_date = this.formatDate(dt);
      dt.setDate(dt.getDate() - 7);
      this.delivery_date = this.formatDate(dt);      
    }
});