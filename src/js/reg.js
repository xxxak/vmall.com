import $ from './library/jquery.js';
import cookie from './library/cookie.js';
let username;
let password;
let phone;
let email;
//
let reg = $('input[type="button"]');
let flag = {
    username: false,
    phone: false,
    password: false,
    repeatPassword: false,
    email: false,
};
//  用户名验证

$('.username').on('blur', function () {
    let rex = /^[a-zA-Z0-9_-]{4,16}$/; //4到16位（字母，数字，下划线，减号）";
    if (rex.test($(this).val())) {
        flag.username = true;
        $('.un').html('用户名正确').css('color', 'green');
    } else {
        flag.username = false;
        $('.un').html('用户名错误,4到16位（字母，数字，下划线，减号）').css('color', 'red');
    }
});
//  手机号格式验证

$('.phone').on('blur', function () {
    let rex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/; //只要是13,14,15,16,17,18,19开头即可"

    if (rex.test($(this).val())) {
        flag.phone = true;
        $('.ph').html('手机格式正确').css('color', 'green');
    } else {
        flag.phone = false;
        $('.ph').html('手机格式错误').css('color', 'red');
    }
});

//  邮箱格式验证

$('.email').on('blur', function () {
    let rex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (rex.test($(this).val())) {
        flag.email = true;
        $('.yx').html('邮箱格式正确').css('color', 'green');
    } else {
        flag.email = false;
        $('.yx').html('邮箱格式错误').css('color', 'red');
    }
});
// 密码强度验证
$('.password').on('focus', function () {
    $(this).on('input', function () {
        console.log($(this).val());
        let value = $(this).val();
        let code_length = 0;
        if (/[0-9]/.test(value)) {
            code_length++;
        }
        if (/[a-z]/.test(value)) {
            code_length++;
        }
        if (/[A-Z]/.test(value)) {
            code_length++;
        }

        if (value.length < 8 || value.length > 16 || /[^0-9a-zA-Z]/.test(value)) {
            $('.pw').html('密码长度为8-16位,只包含数字大小写字母').css('color', 'red');
            flag.password = false;
        } else {
            flag.password = true;
            if (code_length == 1) {
                $('.pw').html('密码强度弱').css('color', 'orange');
            } else if (code_length == 2) {
                $('.pw').html('密码强度中').css('color', 'darkorange');
            } else if (code_length == 3) {
                $('.pw').html('密码强度强').css('color', 'green');
            }
        }
    });
});
$('.password').on('blur', function () {
    if (flag.password) $('.pw').html('密码输入正确').css('color', 'green');
});
// 密码重复验证
// $('.repeatPassword').on('focus', function () {
//     $(this).on('input', function () {});
// });
$('.repeatPassword').on('blur', function () {
    if (flag.password) {
        if ($(this).val() != $('.password').val()) {
            flag.repeatPassword = false;
            $('.rpw').html('密码输入错误').css('color', 'red');
        } else {
            flag.repeatPassword = true;
            $('.rpw').html('重复密码入输正确').css('color', 'green');
        }
    } else {
        $('.rpw').html('请先输入密码').css('color', 'red');
    }
});
reg.on('click', function () {
    let isexecute = true;
    for (let i in flag) {
        if (!flag[i]) {
            isexecute = false;
        }
    }
    if (isexecute) {
        username = $('.username').val();
        password = $('.password').val();
        phone = $('.phone').val();
        email = $('.email').val();
        login1();
    } else {
        alert('请正确填写！');
    }
});
function login1() {
    $.ajax({
        type: 'post',
        url: '../../interface/reg.php',
        data: `username=${username}&password=${password}&phone=${phone}&email=${email} `,
        dataType: 'html',
    })
        .then(function (res) {
            if (res == 'false') {
                alert('用户名已存在');
            } else {
                alert('注册成功');
                location.href = '../html/login.html';
            }
        })
        .catch(function (xhr) {
            console.log(xhr.status);
        });
}
