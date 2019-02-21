$(function () {
    //提示框方法
    function toast(n) {
        layer.open({
            content: n,
            skin: 'msg',
            style: 'bottom:60%',
            time: 2
        });
    }

    //验证码定时器
    var time = null;

    //获取验证码
    $('#VerCode').click(function (e) {
        // let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        let reg = /^1\d{10}$/;
        let tell = $('#tell').val();
        console.log(1)
        if (tell == '') {
            toast('手机号不能为空！');
        } else if (!reg.test(tell)) {
            toast('手机号格式不对！');
        } else {
            console.log('发送验证码');
            $(this).css("pointer-events", "none");
            var num = 60;
            time = setInterval(() => {
                num -= 1;
                if (num <= 0) {
                    clearTimeout(time);
                    $(this).text('获取验证码');
                    num = 60;
                    $(this).css("pointer-events", "auto");
                } else {
                    if (num > 0 && num < 10) {
                        num = '0' + num;
                    }
                    $(this).text(num + '秒后重新发送');
                    $(this).css("pointer-events", "none");
                }
            }, 1000);
        }
    });

//点击注册
    $('#btn').click(function () {
        let tell = $('#tell').val(); //手机号
        let VerCoding = $('#Verification').val();//验证码
        let pwd = $('#pwd').val();//密码
        let rePwd = $('#rePwd').val();//确认密码
        let Reg = /^[a-zA-Z0-9]+$/;
        if (tell == '') {
            toast('手机号不能为空！');
        } else if (VerCoding == '') {
            toast('验证码不存在！');
        } else if (pwd == '') {
            toast('请输入密码！');
        } else if (!Reg.test(pwd)) {
            toast('密码格式不对！');
        } else if (rePwd == '') {
            toast('请再次输入密码！');
        } else if (pwd !== rePwd) {
            toast('两次密码不正确！');
        } else {
            let json = {
                tell: $('#tell').val(),
                VerCode: $('#Verification').val(),
                pwd: $('#pwd').val()
            };
            console.log(json);
            toast('提交成功！');
            //清空表单数据
            $('#tell').val('');
            $('#Verification').val('');
            $('#pwd').val('');
            $('#rePwd').val('');
            //清除定时器
            clearTimeout(time);
            $('#VerCode').text('获取验证码');
            location.reload(0);
        }
    })

});