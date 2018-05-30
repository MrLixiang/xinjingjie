$(function () {
    var password = $('#password');
    var passwordInput =password.find($('input'));
    var btn = $('#btn');
    var str = /^[0-9]{1}$/;
    var infoText = $('.pay-password-info');
    var btnA = btn.parent();
    password.on('keyup', 'input', function (e) {
        var _vm = $(this);
        if (_vm.val() && str.test(_vm.val())) {
            _vm.next().focus();
            infoText.text('请输入6位支付密码');
            infoText.css({
                'color' : '#c6c6c6',
                'font-size':'12px'
            })
        } else {
            _vm.val('');
            infoText.text('密码为纯数字！！！');
            infoText.css({
                'color' : 'red',
                'font-size':'18px'
            })
        }
        if (_vm.index() == passwordInput.length - 1 && _vm.val()){
            btn.focus();
        }
    });

    btn.click(function () {
        if (passwordInput.val()){
            btnA.attr('href','pay_success.html');
        } else {
            btnA.attr('href','pay_failure.html');
        }
    });
});