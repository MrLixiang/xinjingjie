$(function () {
    //大图片父级盒子
    var magnifier = $('#magnifier');
    //大图片盒子
    var magnifierPic = $('#magnifier-pic');
    //大图片盒子下的li
    var magnifierLi = magnifierPic.find('li');
    //遮罩层
    var mask = $('#mask');
    //放大镜盒子
    var bigPic = $('#big-pic');
    //放大镜盒子的li
    var bigLi = bigPic.find('li');
    //放大镜盒子的li下边的图片
    var bigImg = bigLi.find('img');
    //下边小图片盒子
    var smallPic = $('#small-pic');
    //下边小图片盒子下的li
    var smallLi = smallPic.find('li');
    //大图片父级盒子宽高
    var sw = magnifier.width();
    var sh = magnifier.height();
    //放大倍数
    var times = 3;
    var $index = 0;
    var top = 0;
    var left = 0;
    //<------------------------------------------------------------------------>
    mask.css({
        width: sw / times + 'px',
        height: sh / times + 'px'
    });
    //<------------------------------------------------------------------------>
    //遮罩层宽高(包括边框等尺寸)
    var mw = mask.outerWidth();
    var mh = mask.outerHeight();
    //<------------------------------------------------------------------------>
    magnifier.mousemove(function (e) {
        var $this = $(this);
        //获取到当前盒子距离浏览器窗口的位置
        top = $this.get(0).getBoundingClientRect().top;
        left = $this.get(0).getBoundingClientRect().left;
        //鼠标当前位置距离浏览器窗口的距离
        // 减去left或者top以后的值为鼠标当前位置距离当前盒子的距离
        var bx = e.clientX - left;
        var by = e.clientY - top;
        // 遮罩层距离当前盒子的距离
        var mx = bx - mw / 2;
        var my = by - mh / 2;
        //<------------------------------------------------------------------------>
        if (mx < 0) {
            mx = 0;
        } else if (mx > sw - mw) {
            mx = sw - mw;
        }
        //<------------------------------------------------------------------------>
        if (my < 0) {
            my = 0;
        } else if (my > sh - mh) {
            my = sh - mh;
        }
        //<------------------------------------------------------------------------>
        mask.css({
            left: mx,
            top: my
        });
        //<------------------------------------------------------------------------>
        bigImg.css({
            width: sw * times + 'px',
            height: sh * times + 'px',
            left: -mx * times + 'px',
            top: -my * times + 'px'
        });
    });
    //<------------------------------------------------------------------------>
    //显示/隐藏 相应盒子
    magnifier.hover(function () {
        bigPic.css('display', 'block');
        mask.css('display', 'block');
    }, function () {
        bigPic.css('display', 'none');
        mask.css('display', 'none');
    });
    //显示相应图片
    smallLi.mousemove(function () {
        var $this = $(this);
        $index = $this.index();
        smallLi.removeClass('on').eq($index).addClass('on');
        magnifierLi.removeClass('on').eq($index).addClass('on');
        bigLi.removeClass('on').eq($index).addClass('on');
    });
});
//<------------------------------------------------------------------------>
$(function () {
    $('#top-right-list .top-right-rotation').eq(0).clone().appendTo($('#top-right-list'));
    var rightContent = $('#top-right-content');
    var topList = $('#top-right-list');
    var rotation = topList.find('.top-right-rotation');
    var prev = rightContent.find('.prev');
    var next = rightContent.find('.next');
    var h = rotation.height();
    var $index = 0;
    var len = rotation.length;
    var isClick = true;
    //<------------------------------------------------------------------------>
    rightContent.css('height', h);
    //<------------------------------------------------------------------------>
    next.click(function () {
        if (isClick) {
            if ($index == len - 1) {
                $index = 0;
                topList.css({top: h * -$index + 'px'});
            }
            //<------------------------------------------------------------------------>
            $index++;
            topList.animate({top: h * -$index + 'px'}, 1000, function () {
                isClick = true;
            });
        }
        isClick = false;
    });
    //<------------------------------------------------------------------------>
    prev.click(function () {
        if (isClick) {
            if ($index == 0) {
                $index = len - 1;
                topList.css({top: h * -$index + 'px'});
            }
            //<------------------------------------------------------------------------>
            $index--;
            topList.animate({top: h * -$index + 'px'}, 1000, function () {
                isClick = true;
            });
        }
        isClick = false;
    })
});
//<------------------------------------------------------------------------>
$(function () {
    var addOnUl = $('.addOnUl');
    var addOnLi = addOnUl.find('li');
    //<------------------------------------------------------------------------>
    addOnLi.click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    })
});
//<------------------------------------------------------------------------>
$(function () {
    var contentTab = $('.content-right-tab');
    var contentTabP = contentTab.find('p');
    var details = $('.product-details-main');
    var appraise = $('.product-appraise-main');
    //<------------------------------------------------------------------------>
    contentTabP.click(function () {
        //<------------------------------------------------------------------------>
        var index = $(this).index();
        //<------------------------------------------------------------------------>
        $(this).addClass('on').siblings().removeClass('on');
        if (index == 0) {
            details.addClass('on');
            appraise.removeClass('on');
        } else if (index == 1) {
            appraise.addClass('on');
            details.removeClass('on');
        }
    })
});
//<------------------------------------------------------------------------>
$(function () {
    var contentTab = $('.hot-product-tab');
    var contentTabP = contentTab.find('p');
    var sales = $('.hot-pro-tab-sales');
    var collect = $('.hot-pro-tab-collect');
    //<------------------------------------------------------------------------>
    contentTabP.click(function () {
        //<------------------------------------------------------------------------>
        var index = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        //<------------------------------------------------------------------------>
        if (index == 0) {
            sales.addClass('on');
            collect.removeClass('on');
        } else if (index == 1) {
            collect.addClass('on');
            sales.removeClass('on');
        }
    })
});
//<------------------------------------------------------------------------>
$(function () {
    var mySelect = $('#my-select');
    var myInputVal = mySelect.find('input');
    var myList = mySelect.find('.myList');
    var myTime = myList.find('li');


    mySelect.hover(function () {
        myList.css('display', 'block');
    }, function () {
        myList.css('display', 'none');
    });
    myTime.click(function () {
        var _this = $(this).text();
        myInputVal.val(_this);
        myList.css('display', 'none');
    });


});
//<------------------------------------------------------------------------>
// 调用获取url方法 并声明
var myUrlId = Params();

$(function () {
    var title = $('#title');
    var money = $('#money');
    var sales = $('#sales');
    var stock = $('#stock');
    var addCart = $('#addCart');
    var original = $('#original');
    var _number = $('#number');
    var minusBtn = $('#minusBtn');
    var addBtn = $('#addBtn');
    var _numberVal = parseInt(_number.val());
    var $index = 1;
    var _test = /^[1-9]\d*$/;
    var proId = LsyStorage.getItem('pro_' + myUrlId.id);

    title.text(proId.title);
    money.text(proId.price);
    sales.text(proId.sales);
    original.text(proId.original);
    stock.text(proId.inventory);
    _number.keyup(function () {
        _numberVal = $(this).val();
        if (!_test.test(_numberVal)) {
            $(this).val(1);
        }
        if (_numberVal >= proId.inventory) {
            alert('当前数量大于库存数量');
            $(this).val(proId.inventory);
        }
    });
    addBtn.click(function () {
        var numberThis = parseInt(_number.val());
        if (numberThis > proId.inventory) {
            alert('当前数量大于库存数量');
            _number.val(proId.inventory);
        } else {
            _number.val(numberThis + $index);
        }
    });
    minusBtn.click(function () {
        var numberThis = parseInt(_number.val());
        if (numberThis <= 1) {
            alert('当前数量不能为0');
            _numberVal = 1
        } else {
            _number.val(numberThis - $index);
        }
    });
    addCart.click(function () {
        if (LsyCookie.get('loginTrue') === 'true'){
            var number = $('#number').val();
            var shopInfoId = LsyStorage.getItem('shopCar_' + myUrlId.id);
            if (shopInfoId) {
                shopInfoId.numb += Number(number);
                LsyStorage.setItem('shopCar_' + myUrlId.id, shopInfoId);
            } else {
                proId.numb = Number(number);
                LsyStorage.setItem('shopCar_' + myUrlId.id, proId);
            }
            alert('添加成功');
            shopCartNumb(LsyStorage.getArr('shopCar'));
        }else {
            alert('请登录');
        }

    });
});
// 获取url方法
function Params() {
    var result = {};
    var arr = location.search.replace(/^\?/, '').split(/\&/g);
    //不能有中文字符
    // result.docName = location.pathname.match(/\/([a-zA-Z_]+)\.html$/)[1];
    //提取锚点
    //result.hash = location.hash.replace(/^\#/, '');
    for (var i = 0, n = arr.length; i < n; i++) {
        var key = arr[i].split(/\=/)[0];
        result[key] = arr[i].split(/\=/)[1];
    }
    return result;
}




