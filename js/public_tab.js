$(function () {
    var menu = $('#menu');
    var menuH5 = menu.find('h5');
    var menuList = $('#menu-list');

    menuH5.hover(function () {
        menuList.css('display', 'block');
    }, function () {
        menuList.css('display', 'none');
    });
    menuList.hover(function () {
        menuList.css('display', 'block');
    }, function () {
        menuList.css('display', 'none');
    });

});


