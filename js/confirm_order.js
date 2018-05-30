$(function () {
    var contentList = $('#contentList');

    createProductListHtml(contentList);


});

function createProductListHtml(contentList) {
    var cartListData = LsyStorage.getArr('confirmOrder_');
    var totalAll = $('#totalAll');
    var totalPriceAll = 0;
    var str = '';

    for (var i = 0, n = cartListData.length; i < n; i++) {
        var totalPrice = (cartListData[i].price * cartListData[i].numb).toFixed(2);
        var price = (cartListData[i].price).toFixed(2);
        var courier = (cartListData[i].courier).toFixed(2);
        var shopTotal = (Number(totalPrice)+ Number(courier)).toFixed(2);
        str +=
            '     <div class="content-list">'
            + '     <div class="container">'
            + '     <div class="shop-name clearFix">'
            + '     <h6>店铺 : <span>' + cartListData[i].shopName + '</span></h6>'
            + '      <div class="coupons">'
            + '     <p>优惠券<span></span></p>'
            + '     <ul>'
            + '     <li>123</li>'
            + '     <li>123</li>'
            + '     <li>123</li>'
            + '     <li>123</li>'
            + '     </ul>'
            + '     </div>'
            + '     </div>'
            + '     <div class="product-info-down clearFix" data-id="' + cartListData[i].id + '">'
            + '     <img src="' + cartListData[i].imgSrc + '" alt="pic32.png">'
            + '     <p class="pro-down-product">' + cartListData[i].shopName + '</p>'
            + '      <p class="pro-down-info">颜色分类：<span class="on">白</span><span>黑</span></p>'
            + '     <div class="pro-down-unitPrice">'
            + '     <p><s>¥ ' + cartListData[i].original + '</s></p>'
            + '      <p>¥ <span>' + price + '</span></p>'
            + '      <p class="activity">卖家降价</p>'
            + '     </div>'
            + '     <p class="pro-down-quantity">' + cartListData[i].numb + '</p>'
            + '     <p class="preferentialWay">优惠促销</p>'
            + '     <p class="pro-down-total-price">￥<span>' + totalPrice + '</span></p>'
            + '     </div>'
            + '     <div class="container-footer clearFix">'
            + '     <div class="invoice clearFix">'
            + '     <label><input type="checkbox"><i></i></label>'
            + '     <p>开具发票</p>'
            + '     </div>'
            + '     <div class="freightBox clearFix">'
            + '     <p>运送方式：</p>'
            + '      <p>普通配送<span>快递￥<i>' + courier + '</i></span></p>'
            + '      <p>10.00</p>'
            + ' </div>'
            + ' <div class="message clearFix">'
            + '     <p>给卖家留言：</p>'
            + ' <textarea placeholder="选填：对本次交易的说明（建议填写和卖家协商一致的内容）"></textarea>'
            + '     </div>'
            + '     <div class="freightInsurance clearFix">'
            + '     <p>运费险：</p>'
            + ' <label><input type="checkbox" checked><i></i></label>'
            + '     <p>运费险</p>'
            + '     <p>￥<span>0.02</span></p>'
            + '     <p>购买</p>'
            + '     </div>'
            + '     </div>'
            + '     <div class="container-total clearFix">'
            + '     <p>￥<span>' + shopTotal + '</span></p>'
            + '     <p>店铺合计(含运费)</p>'
            + '     </div>'
            + '     </div>'
            + '     </div>';
        totalPriceAll += Number(shopTotal);
    }
    contentList.html(str);
    totalAll.text((totalPriceAll).toFixed(2))
}