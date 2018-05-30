$(function () {
    var userName = $('#userName');
    var passWord = $('#passWord');

    var btn = $('#btn');
    btn.click(function (e) {
        e.preventDefault();

        var userMsg = {
            userNameVal: $('#userName').val(),
            passWordVal: $('#passWord').val()
        };
        if (!userMsg.userNameVal) {
            alert('用户名不能为空');
            return false;
        } else if (!userMsg.passWordVal) {
            alert('密码不能为空');
            return false;
        }
        var users = LsyStorage.getItem('userMsg');
//判断userMsg拿到的值是不是等于他本身是的话就把他本身赋值给users他本身不是的话就把空字符串赋值给users
        users = users ? users : [];
// 默认让账户为未登录状态 等于false
        var isRegisterUser = false;
        // 默认没有密码 等于false
        var isRegisterPassWord = false;

        for (var i = 0, len = users.length; i < len; i++) {
            if (userMsg.userNameVal === users[i].userNameVal) {
            // 如果用户名是真的把 isRegisterUser 修改为true
                isRegisterUser = true;
                if(userMsg.passWordVal === users[i].passWordVal){
                    isRegisterPassWord = true;
                }
            }
        }
        if (isRegisterUser) {
            if(!isRegisterPassWord){
                alert('请输入正确密码');
            }else{
                alert('登陆成功');
                LsyCookie.set('userName',userMsg.userNameVal,300);
                LsyCookie.set('loginTrue','true',300);
                window.location.href = 'index.html'
            }
        } else {
            alert('该用户‘'+userMsg.userNameVal+'’未注册');
        }

    });
});