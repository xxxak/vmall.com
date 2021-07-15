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
    if (flag.password) $('.pw').html('');
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
            $('.rpw').html('密码输正确').css('color', 'green');
        }
    } else {
        $('.rpw').html('请先输入密码').css('color', 'red');
    }
});
reg.on('click', function () {
    console.log('1');
    username = $('.username').val();
    password = $('.password').val();
    phone = $('.phone').val();
    email = $('.email').val();
    console.log(username, password, phone, email);
    login1();
});
function login1() {
    $.ajax({
        type: 'post',
        url: '../../interface/reg.php',
        data: `username=${username}&password=${password}&phone=${phone}&email=${email} `,
        dataType: 'html',
    })
        .then(function (res) {
            console.log(res);
            // if (res == 1) {
            //     alert('用户名密码正确');
            //     location.href = '../html/index.html';
            // } else {
            //     alert('用户名密码错误');
            // }
        })
        .catch(function (xhr) {
            console.log(xhr.status);
        });
}
