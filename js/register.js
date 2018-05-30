$(function () {
    var btn = $('#btn');
    var userName = $('#userName');
    var _password = $('#password');
    var confirmPassword = $('#confirm_password');
    var myEmail = $('#myEmail');
    var phoneVal = $('#phoneVal');
    var codeBar = $('#code-bar');
    var codeW = codeBar.width();
    var codeSpan = codeBar.find('span');
    var codeSpanW = codeBar.find('span').outerWidth();
    var test = false;
    var _userName = /^\w{6,16}$/;
    var _email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var _passwordTest = /^[\w\~\!\@\#\$\%\^\&\*\.\?]{6,10}$/;
    var _phoneVal = /^1[3578][0-9]{9}$/;
    btn.click(function (e) {
        e.preventDefault(); //取消form默认提交

        //验证
        myValidation();


    });
    codeSpan.mousedown(function (e) {
        if (phoneVal.val() == '') {
            alert('手机号不得为空');
            return;
        } else if (!_phoneVal.test(phoneVal.val())) {
            alert('输入正确手机号');
            return;
        } else {
            var dx = e.pageX;
            //  bind 绑定事件
            codeBar.bind('mousemove', function (e) {
                var x = e.pageX;
                var run = x - dx;

                if (run <= 0) {
                    codeSpan.css('left', '0px');
                } else {
                    codeSpan.css('left', run + 'px');
                    if (run > codeW - codeSpanW) {
                        codeBar.text('通过验证');
                    }
                }
            });
        }

    }).mouseup(function () {
        // unbind  卸载事件
        codeBar.unbind('mousemove');
        codeSpan.css('left', '0px');
    });
    function myValidation() {
        if (!test) {
            if (!_userName.test(userName.val())) {
                alert('用户名格式不正确');
                return;
            } else if (!_passwordTest.test(_password.val())) {
                alert('密码格式不正确');
                return;
            } else if (_password.val() != confirmPassword.val()) {
                alert('两次密码不一致');
                return;
            } else if (!_email.test(myEmail.val())) {
                alert('请输入正确邮箱');
                return;
            } else if (!_phoneVal.test(phoneVal.val())) {
                alert('输入正确手机号');
                return;
            } else if (codeBar.text() != '通过验证') {
                alert('请完成验证');
                return;
            } else {
                var userMsg = {
                    userNameVal: $('#userName').val(),
                    passWordVal: $('#password').val(),
                    myEmailVal: $('#myEmail').val(),
                    phone: $('#phoneVal').val()
                };
                var users = LsyStorage.getItem('userMsg');
//判断userMsg拿到的值是不是等于他本身是的话就把他本身赋值给users他本身不是的话就把空字符串赋值给他
                users = users ? users : [];

                // 循环userMsg的值
                for (var i = 0, n = users.length; i < n; i++) {
                    // 验证userMsg的值是否存在
                    if (users[i].userNameVal === userMsg.userNameVal) {
                        alert('该用户已被注册，请用其他名称注册');
                        return false
                    }
                }
                //添加一个新数组 ：userMsg
                users.push(userMsg);//userMsgA
                // 添加新的的值：userMsgA   存回users
                LsyStorage.setItem('userMsg', users);

                alert('注册成功');
                window.location.href = 'login.html'

            }
        }
    }
});