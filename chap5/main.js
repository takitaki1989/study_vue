var app = document.querySelector('#app');

var taxRate = 0.08;

window.addEventListener('load', onPageLoad, false);

app.querySelector('#delivery_date').addEventListener('change', onInputChanged, false);
app.querySelector('#opt1').addEventListener('change', onInputChanged, false);
app.querySelector('#opt2').addEventListener('change', onInputChanged, false);
app.querySelector('#opt3').addEventListener('change', onInputChanged, false);
app.querySelector('#opt4').addEventListener('input', onInputChanged, false);

function onPageLoad(event) {
    var wedding_date = app.querySelector('#wedding_date');
    var delivery_date = app.querySelector('#delivery_date');

    var dt = new Date();

    dt.setMonth(dt.getMonth() + 2);
    wedding_date.value = formatDate(dt);
    delivery_date.setAttribute('min', tommorow());
    updateForm();
}

function onInputChanged(event) {
    updateForm();
}

function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}

function tommorow() {
    var dt = new Date();
    dt.setDate(dt.getDate() + 1);
    return formatDate(dt);
}

function incTax(untaxed) {
    return Math.floor(untaxed * (1 + taxRate));
}

function number_format(val) {
    return val.toLocaleString();
}

function getDateDiff(dateString1, dateString2) {
    var date1 = new Date(dateString1);
    var date2 = new Date(dateString2);

    var msDiff = date1.getTime() - date2.getTime();
    return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
}

function taxedBasePrice() {
    var addPrice = 0;
    var delivery_date = app.querySelector('#delivery_date');
    var dateDiff = getDateDiff(delivery_date.value, (new Date()).toLocaleString());

    if (21 <= dateDiff && dateDiff < 30) {
        addPrice = 5000;
    } else if(14 <= dateDiff && dateDiff < 21) {
        addPrice = 10000;
    } else if(7 <= dateDiff && dateDiff < 14) {
        addPrice = 15000;
    } else if(3 < dateDiff && dateDiff < 7) {
        addPrice = 20000;
    } else if(dateDiff == 3) {
        addPrice = 40000;
    } else if(dateDiff == 2) {
        addPrice = 45000;
    } else if(dateDiff == 1) {
        addPrice = 50000;
    }
    return incTax(30000 + addPrice);
}

function taxedOptPrice() {
    var optPrice = 0;

    var opt1 = app.querySelector('#opt1');
    var opt2 = app.querySelector('#opt2');
    var opt3 = app.querySelector('#opt3');
    var opt4 = app.querySelector('#opt4');

    if(opt1.checked) { optPrice += 5000; }
    if(opt2.checked) { optPrice += 5000; }
    if(opt3.checked) { optPrice += 5000; }
    if(opt4.value == '') { opt4 = 0; }
    optPrice += opt4.value * 500;
    return incTax(optPrice);
}

function updateForm() {
    var sum_base = app.querySelector('#sum_base');
    var sum_opt = app.querySelector('#sum_opt');
    var sum_total = app.querySelector('#sum_total');

    var basePrice = taxedBasePrice();
    var optPrice = taxedOptPrice();
    var totalPrice = basePrice + optPrice;

    sum_base.value = number_format(basePrice);
    sum_opt.value = number_format(optPrice);
    sum_total.value = number_format(totalPrice);
}
