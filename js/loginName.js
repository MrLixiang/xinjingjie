$(function () {
    var header_userName = $('#header_userName');
    if (LsyCookie.get('loginTrue') === 'true') {
        var nameMain =
            '<p>'
            + '<a href="index.html">新境界首</a>'
            + '<a href="user.html" class="header-userName">用户007</a>'
            + ' 亲，欢迎来到“neview(新境界)”'
            + '</p>';
        header_userName.html(nameMain);
        var usernameMain = header_userName.find('.header-userName');
        usernameMain.text(LsyCookie.get('userName'));
        shopCartNumb(LsyStorage.getArr('shopCar'));
    } else {
        var shopCart = $('#shopCart');
        var labelling =
            '<p><a href="index.html">新境界首</a>'
            + ' 亲，欢迎来到“neview(新境界)”</p>'
            + ' <a href="login.html"> 请登录</a>'
            + ' <a href="protocol.html">免费注册</a>';
        header_userName.html(labelling);
        shopCart.text(0);
    }
});
function shopCartNumb(len) {
    var shopCart = $('#shopCart');
    var shopInfoLen =len.length;
    shopCart.text(shopInfoLen);
    if (shopCart.text() == 0) {
        shopCart.css('color', '#656565');
    } else {
        shopCart.css('color', '#f11023');
    }
}