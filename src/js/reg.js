import $ from './library/jquery.js';
import cookie from './library/cookie.js';
let username;
let password;
let phone;
let email;
//
let reg = $('input[type="button"]');
console;
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
