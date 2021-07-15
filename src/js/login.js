import $ from './library/jquery.js';
import cookie from './library/cookie.js';

let username = $('input[type="text"]');
let password = $('input[type="password"]');
let login = $('input[type="button"]');
console;
login.on('click', function () {
    console.log('1');
    login1();
});
function login1() {
    $.ajax({
        type: 'GET',
        url: '../../interface/login.php',
        data: `username=${username.val()}&password=${password.val()}`,
        dataType: 'html',
    })
        .then(function (res) {
            console.log(res, !!res);
            if (res == 1) {
                alert('用户名密码正确');
                location.href = '../html/index.html';
            } else {
                alert('用户名密码错误');
            }
        })
        .catch(function (xhr) {
            console.log(xhr.status);
        });
}
