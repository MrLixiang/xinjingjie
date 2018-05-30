$(function () {

    createProductListHtml();
    var contentList = $('#contentList');
    $('#contentList').find('input').prop('checked', true);
    myClickAll();


    contentList.delegate('input.proChecked', 'click', function () {
        var _vm = $(this);
        var checkedAll = _vm.parents('#contentList').find('.checkedAll');
        var len = _vm.parents('#contentList').find('#proList .proChecked').length;
        var checkedLen = _vm.parents('#contentList').find('#proList .proChecked:checked').length;
        reverseChecked(checkedAll, len, checkedLen);
    });


});
function myClickAll() {
    var contentList = $('#contentList');
    var clickAll = contentList.find('.checkedAll');
    clickAll.click(function () {
        var thisChecked = $(this).prop('checked');
        if (thisChecked) {
            contentList.find('input').prop('checked', true);
        } else {
            contentList.find('input').prop('checked', false);
        }
    })
}
function reverseChecked(aa, ss, cc) {
    if (ss !== cc) {
        aa.prop('checked', false)
    } else {
        aa.prop('checked', true)
    }
}
function createProductListHtml() {
    var proList = $('#proList');
    var cartListData = LsyStorage.getArr('shopCar');
    var str = '';

    for (var i = 0, n = cartListData.length; i < n; i++) {
        var totalPrice = (cartListData[i].price * cartListData[i].numb).toFixed(2);
        var price = (cartListData[i].price).toFixed(2);

        str +=

            '<div class="order-list">'
            + '<div class="order-list-top clearFix">'
            + '<label><input type="checkbox" class="proChecked"><i></i></label>'
            + '<p class="order-time">2017-08-07</p>'
            + '<p class="order-number">订单号: <span>43566945929025382</span></p>'
            + '<p class="shopName"><a href="javascript:;">店铺：' + cartListData[i].shopName + '</a></p>'
            + '</div>'
            + '<div class="order-list-down clearFix">'
            + '<a href="javescript:;"><img src="img/pic31.png" alt="pic32.png"></a>'
            + '<div class="pro-info">'
            + '<p class="proName"><a href="javescript:;">' + cartListData[i].title + '</a></p>'
            + '<p class="pro-type"><a href="javescript:;">套餐类型：<span class="package-type">官方标配</span>颜色分类<span class="color-type">银白色</span></a></p>'
            + '</div>'
            + '<div class="order-unitPrice">'
            + '<p><s>¥ ' + cartListData[i].original + '</s></p>'
            + '<p>¥ <span>' + price + '</span></p>'
            + '</div>'
            + '<p class="order-quantity">' + cartListData[i].numb + '</p>'
            + '<p class="tip-off">'
            + '<a href="javascript:;">违规举报</a>'
            + '<a href="javascript:;">退运保险</a>'
            + '</p>'
            + '<div class="order-money">'
            + '<p class="order-price">￥<span>' + totalPrice + '</span></p>'
            + '<p class="order-freight">（含运费：￥<span>0.00</span>）</p>'
            + '</div>'
            + '<div class="order-state">'
            + '<p>等待买家付款</p>'
            + '<p><a href="javascript:;">订单详情</a></p>'
            + '</div>'
            + '<div class="order-clearing">'
            + '<p class="nowPay"><a href="javascript:;">立即付款</a></p>'
            + '<p class="friendPay"><a href="javascript:;">找人代付</a></p>'
            + '<p class="order-delete"><a href="javascript:;">取消订单</a></p>'
            + '</div>'
            + '</div>'
            + '</div>'
    }
    proList.html($(str));
}