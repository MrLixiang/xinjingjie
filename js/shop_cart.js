$(function () {
    var contentList = $('#contentList');
    createProductListHtml(contentList);
    $('#content').find('input').prop('checked', true);
    myCheckedLen();
    computations();
    myClickAll();
    shopCartNumb($('.content-list'));
    //事件委托 便利
    contentList.delegate('input.numb', 'blur', function () {
        var _vm = $(this);
        var thisVal = _vm.val();
        if (!thisVal) {
            _vm.val(1);
        }
        subtotal();
        computations();
    }).delegate('input.numb', 'keyup', function () {
        var _test = /^[1-9]\d*$/;
        var _vm = $(this);
        var thisVal = _vm.val();
        if (!_test.test(thisVal)) {
            _vm.val(thisVal.replace(/[^\d]/g, ''));
        }
    }).delegate('input.checkboxBtn', 'click', function () {
        var clickAll = $('#content .clickAll');
        var len = $('#contentList .checkboxBtn').length;
        var checkedLen = $('#contentList .checkboxBtn:checked').length;
        // 点击 判断checked值 计算总价
        computations();
        reverseChecked(clickAll, len, checkedLen);

        var _vm = $(this);
        var contentList = _vm.parents('.content-list');
        var nextChecked = contentList.find('.shopCheckedAll');
        var containerLen = contentList.find('.container').length;
        var ACheckedLen = contentList.find('.checkboxBtn:checked').length;

        reverseChecked(nextChecked, containerLen, ACheckedLen);
        myCheckedLen();
    }).delegate('input.shopCheckedAll', 'click', function () {
        // 点击 判断checked值 计算总价
        //       商店全选
        var _vm = $(this);
        var shopAllChecked = _vm.parents('.content-list').find('.shopCheckedAll').prop('checked');
        var listChecked = _vm.parents('.content-list').find('.checkboxBtn');
        if (shopAllChecked) {
            listChecked.prop('checked', true);
        } else {
            listChecked.prop('checked', false);
        }
        computations();
        //       反选
        var clickAll = $('#content .clickAll');
        var len = $('#contentList .checkboxBtn').length;
        var checkedLen = $('#contentList .checkboxBtn:checked').length;
        reverseChecked(clickAll, len, checkedLen);
        myCheckedLen();
    }).delegate('p.increase', 'click', function () {
        // 按钮加
        var _vm = $(this);
        var numb = _vm.prev('input.numb');
        var numbVal = Number(numb.val());
        numb.val(numbVal + 1);
        subtotal();
        computations();
    }).delegate('p.reduce', 'click', function () {
        // 按钮减
        var _vm = $(this);
        var numb = _vm.next('input.numb');
        var numbVal = Number(numb.val());
        if (numbVal <= 1) {
            alert('当前数量不能为0');
            return false;
        }
        numb.val(numbVal - 1);
        subtotal();
        computations();
    }).delegate('a.delete', 'click', function () {
        var _vm = $(this);
        var _vmParents = _vm.parents('.content-list');
        var _vmId = _vm.parents('.container').attr('data-id');
        var myConfirm = confirm('是否删除该商品');
        if (myConfirm) {
            _vmParents.remove();
            LsyStorage.removeItem('shopCar_' + _vmId);
            var _vmParentsLen = contentList.find('.content-list').length;
            if (_vmParentsLen == 0) {
                $('.clickAll').prop('checked', false);
            }
        }
        computations();
        myCheckedLen();
    });
    var deleteChecked = $('#deleteChecked');
    deleteChecked.click(function () {
        deleteAll()
    });
    var submit = $('#submit');
    submit.click(function () {
        proSubmit();
    })
});
//  添加HTML标签
function createProductListHtml(contentList) {
    var cartListData = LsyStorage.getArr('shopCar');
    var str = '';
    for (var i = 0, n = cartListData.length; i < n; i++) {
        var totalPrice = (cartListData[i].price * cartListData[i].numb).toFixed(2);
        var price = (cartListData[i].price).toFixed(2);
        str +=
            '<div class="content-list">'
            + '<div class="shop-name clearFix">'
            + '<label><input type="checkbox" class="shopCheckedAll"><i></i></label>'
            + '<h6>店铺 : <span>' + cartListData[i].shopName + '</span></h6>'
            + '<div class="coupons">'
            + '<p>优惠券<span></span></p>'
            + '<ul>'
            + '<li>123</li>'
            + '<li>123</li>'
            + '<li>123</li>'
            + '<li>123</li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="container" data-id="' + cartListData[i].id + '">'
            + '<div class="product-info-down clearFix">'
            + '<label><input class="checkboxBtn" type="checkbox"><i></i></label>'
            + '<img src="img/pic31.png" alt="pic31.png">'
            + '<p class="pro-down-product">' + cartListData[i].title + '</p>'
            + '<p class="pro-down-info">颜色分类：<a class="on" href="javascript:;">白</a> <a href="javascript:;">黑</a></p>'
            + '<div class="pro-down-unitPrice">'
            + '<p><s>¥ ' + cartListData[i].original + '</s></p>'
            + '<p>¥ <span class="price">' + price + '</span></p>'
            + '<p class="activity">卖家降价</p>'
            + '</div>'
            + '<div class="pro-down-quantity clearFix">'
            + '<p class="reduce">-</p>'
            + '<input class="numb" type="text" value="' + cartListData[i].numb + '">'
            + '<p class="increase">+</p>'
            + '</div>'
            + '<p class="scale">￥<span class="scalePrice">' + totalPrice + '</span></p>'
            + '<div class="operation">'
            + '<a class="collect" href="javascript:;">移入收藏夹</a>'
            + '<a class="delete" href="javascript:;">删除</a>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
    }
    contentList.html($(str));
}
//       计算小计
function subtotal() {
    var priceList = $('.price');
    var numbList = $('.numb');
    var scaleList = $('.scalePrice');

    numbList.each(function (i) {
        var _total = ($(priceList[i]).text() * $(this).val()).toFixed(2);
        $(scaleList[i]).text(_total);
    });
}
//     初始化 计算总价
function computations() {
    var total_2 = $('#total_2');
    var total_1 = $('#total_1');
    var contentList = $('#contentList .content-list');
    var totalPrice = 0;
    contentList.each(function (i) {
        var _vm = $(this);
        var checkboxBtn = _vm.find('.checkboxBtn').prop('checked');
        var scale = parseInt(_vm.find('.scale span').text());
        if (checkboxBtn) {
            totalPrice += scale;
        }
    });
    totalPrice = totalPrice.toFixed(2);
    total_2.text(totalPrice);
    total_1.text(totalPrice);
}
//       全选
function myClickAll() {
    var contentList = $('#content');
    var clickAll = $('.clickAll');
    clickAll.click(function () {
        var thisChecked = $(this).prop('checked');
        if (thisChecked) {
            contentList.find('input').prop('checked', true);
        } else {
            contentList.find('input').prop('checked', false);
        }
        computations();
    })
}
//       删除选中
function deleteAll() {
    var checkedTrue = $('#contentList').find('.checkboxBtn:checked').parents('.container');
    var myConfirm = confirm('是否删除该商品');
    if (myConfirm) {
        for (var i = 0, n = checkedTrue.length; i < n; i++) {
            var _vmId = checkedTrue.eq(i).attr('data-id');
            var _vmParents = checkedTrue.eq(i).parents('.content-list');
            _vmParents.remove();
            LsyStorage.removeItem('shopCar_' + _vmId);
        }
    }
    computations();
    myCheckedLen();
}
//       已选商品数量
function myCheckedLen() {
    var proNumber = $('#proNumber');
    var checkedLen = $('#contentList .checkboxBtn:checked').length;
    proNumber.text(checkedLen);

}
//       反选
function reverseChecked(aa, ss, cc) {
    if (ss !== cc) {
        aa.prop('checked', false)
    } else {
        aa.prop('checked', true)
    }
}
function proSubmit() {
    var checkedTrue = $('#contentList').find('.checkboxBtn:checked').parents('.container');
    for (var i = 0, n = checkedTrue.length; i < n; i++) {
        var _vmId = checkedTrue.eq(i).attr('data-id');
        //var _vmParents = checkedTrue.eq(i).parents('.content-list');
        //_vmParents.remove();
        //LsyStorage.getItem('shopCar_' + _vmId);
        var proId = LsyStorage.getItem('shopCar_' + _vmId);
        LsyStorage.setItem('confirmOrder_' +  _vmId, proId);
    }
    computations();
    myCheckedLen();
}



