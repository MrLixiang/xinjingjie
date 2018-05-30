$(function () {
    LsyStorage.setArr('pro', ProductList);
    createProductListHtml('<', 'price');
    proSorting();
    pageTextFun();
    var content = $('#content');
    content.delegate('.more', 'click', function () {
        var _vm = $(this);
        _vm.parents('.menu').find('.moreList').slideToggle();
    }).delegate('.check', 'click', function () {
        var _vm = $(this);
        var _vmClass = _vm.attr('class');
        if (_vmClass == 'check') {
            _vm.addClass('on');
            var myRadio = _vm.parent().siblings().find('a');
            myRadio.click(function () {
                var _vm = $(this);
                _vm.addClass('on')
            })
        } else {
            _vm.removeClass('on');
            _vm.parent().siblings().find('a').removeClass('on');
        }
    }).delegate('dd a', 'click', function () {
        var _vm = $(this);
        var myIf = _vm.parents('.options').siblings().find('.check').attr('class');
        if (myIf == 'check') {
            _vm.addClass('on').parents('dl').siblings().find('a').removeClass('on');
            _vm.addClass('on').parent('dd').siblings().find('a').removeClass('on');
        }
    });
});
function createProductListHtml(proThan, proReference) {
    var proListDatas = LsyStorage.getArr('pro');
    proListDatas = sortShopMsgByType(proListDatas, proThan, proReference);
    var proList = $('#proList');
    var str = '';
    for (var i = 0, n = proListDatas.length; i < n; i++) {
        str +=
            '<li>'
            + '<img src="' + proListDatas[i].imgSrc + '" alt="pic02.png">'
            + '<p class="money">￥<span>' + proListDatas[i].price + '</span>.00</p>'
            + '<p class="info">' + proListDatas[i].title + '</p>'
            + '<div class="more"><p>' + proListDatas[i].shopName + '<span>等更多商家</span></p></div>'
            + '<p class="Sales">该款月成交 <span>' + proListDatas[i].sales + '笔</span></p>'
            + '<ul class="product-list—hover">'
            + '<li><a href="pro_details.html' + '?id=' + proListDatas[i].id + '"></a></li>'
            + '</ul>'
            + '</li>'
    }
    proList.html($(str));
}
function sortShopMsgByType(arr, dir, type) {
    if (!arr instanceof Array) {
        return false;
    }
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = 0, n = arr.length; i < n; i++) {
        for (var x = i; x < arr.length; x++) {
            var newDir = dir === '>' ? Number(arr[i][type]) >= Number(arr[x][type]) : Number(arr[i][type]) <= Number(arr[x][type]);
            if (newDir) {
                var _arr = arr[i];
                arr[i] = arr[x];
                arr[x] = _arr;
            }
        }
    }
    return arr;
}
function pageTextFun() {
    var pageText = $('#pageText');
    var pageTextP = pageText.find('p');
    var pageTextInput = pageText.find('input');
    var str = /^[1-9]\d*$/;
    pageText.click(function () {
        pageTextP.css('display', 'none');
        pageTextInput.focus();
    });
    pageTextInput.keyup(function () {
        var pageTextInputVal = $(this).val();
        if (!str.test(pageTextInputVal)) {
            pageTextInput.val('');
        }
    });
    pageTextInput.blur(function () {
        var pageTextInputVal = $(this).val();
        if (pageTextInputVal == '') {
            pageTextP.css('display', 'block');
        }
    })
}
function proSorting() {
    var sort = $('#sort');
    var sortA = sort.find('a');
    sortA.click(function () {
        var _vm = $(this);
        var ifClass = _vm.attr('class');
        if (ifClass == 'proComprehensive') {
            var _vm = $(this);
            _vm.addClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proComprehensive on') {
            var _vm = $(this);
            _vm.addClass('contrary').removeClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '>';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proComprehensive contrary') {
            var _vm = $(this);
            _vm.addClass('on').removeClass('contrary').siblings().removeClass('contrary').removeClass('on');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'sentiment') {
            var _vm = $(this);
            _vm.addClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'sentiment on') {
            var _vm = $(this);
            _vm.addClass('contrary').removeClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '>';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'sentiment contrary') {
            var _vm = $(this);
            _vm.addClass('on').removeClass('contrary').siblings().removeClass('contrary').removeClass('on');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'newProduct') {
            var _vm = $(this);
            _vm.addClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'newProduct on') {
            var _vm = $(this);
            _vm.addClass('contrary').removeClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '>';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'newProduct contrary') {
            var _vm = $(this);
            _vm.addClass('on').removeClass('contrary').siblings().removeClass('contrary').removeClass('on');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proSales') {
            var _vm = $(this);
            _vm.addClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proSales on') {
            var _vm = $(this);
            _vm.addClass('contrary').removeClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '>';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proSales contrary') {
            var _vm = $(this);
            _vm.addClass('on').removeClass('contrary').siblings().removeClass('contrary').removeClass('on');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proPrice') {
            var _vm = $(this);
            _vm.addClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proPrice on') {
            var _vm = $(this);
            _vm.addClass('contrary').removeClass('on').siblings().removeClass('on').removeClass('contrary');
            var bbb = '>';
            createProductListHtml(bbb, 'price');
            return false;
        } else if (ifClass == 'proPrice contrary') {
            var _vm = $(this);
            _vm.addClass('on').removeClass('contrary').siblings().removeClass('contrary').removeClass('on');
            var bbb = '<';
            createProductListHtml(bbb, 'price');
            return false;
        }
    });
}