import $ from './library/jquery.js';
import cookie from './library/cookie.js';
$(function () {
    // 放大镜
    let small = $('.small'),
        movevbox = $('.movebox'),
        big = $('.big'),
        bigImg = $('.big>img');

    let liList = $('ul>li');
    liList.hover(function () {
        $('.active').attr('src', $(this).children().attr('src'));
    });
    movevbox.css({
        width: (small.width() * big.width()) / bigImg.width() + 'px',
        height: (small.height() * big.height()) / bigImg.height() + 'px',
    });
    small.hover(
        function () {
            movevbox.removeClass('hide');
            big.removeClass('hide');
            let ratio = bigImg.width() / small.width();
            small.on('mousemove', function (e) {
                let top = e.offsetY - movevbox.height() / 2;
                let left = e.offsetX - movevbox.width() / 2;
                top =
                    top <= 0
                        ? 0
                        : top >= small.height() - movevbox.height()
                        ? small.height() - movevbox.height()
                        : top;
                left =
                    left <= 0
                        ? 0
                        : left >= small.width() - movevbox.width()
                        ? small.width() - movevbox.width()
                        : left;

                movevbox.css({
                    top: top + 'px',
                    left: left + 'px',
                });
                bigImg.css({
                    top: -ratio * top + 'px',
                    left: -ratio * left + 'px',
                });
            });
        },
        function () {
            movevbox.addClass('hide');
            big.addClass('hide');
        }
    );
    // 内容渲染
    let id = location.search.split('=')[1];
    $.ajax({
        type: 'get',
        url: '../../interface/getItem.php',
        data: { id: id },
        dataType: 'json',
    })
        .then(function (res) {
            let picture = JSON.parse(res.picture);
            console.log(res);
            $('.pp-title').html(res.title);
            $('.product-price span').html(`￥${res.price}.00`);
            $('.active').attr('src', `${picture[0].src}.png`);
            $('.slider ul li img').each(function (i) {
                $(this).attr('src', `${picture[i].src}.png`);
            });
            $('.add-gowuche').on('click', function () {
                console.log(1);
                addItem(res.id, res.price, $('.num input').val());
            });
        })
        .catch(function (xhr) {
            console.log(xhr.status);
        });
    // 添加购物车
    function addItem(id, price, num) {
        let shop = cookie.get('shop'); // 获得购物车信息

        let product = {
            id,
            price,
            num,
        };

        // 判断当前cookie中是否存有购物车数据
        if (shop) {
            // 如果有数据 数据将是字符串格式
            shop = JSON.parse(shop); // 转对象（数组）

            // 判断购物车数据中是否已有某个id 如果有则修改数量 没有则添加
            if (shop.some(el => el.id === id)) {
                let _index = shop.findIndex(elm => elm.id === id); // 找到已存在数据的索引值
                let count = parseInt(shop[_index].num);
                count += parseInt(num);
                shop[_index].num = count;
            } else {
                shop.push(product);
            }
        } else {
            // 初始情况下没有数据
            shop = []; // 初始化一个数组
            shop.push(product); // 将商品加入购物车数据
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }
    //图片展示左右移动
    let slider = $('.slider ul');
    let moveDisdence = $('.slider ul li').outerWidth();
    console.log(moveDisdence);
    let leftbt = $('.left-bt');
    let rightbt = $('.right-bt');
    leftbt.on('click', function () {
        console.log(slider);
        slider.animate({ left: `0px` }, 100);
    });
    rightbt.on('click', function () {
        console.log(slider);
        slider.animate({ left: `-${moveDisdence}` }, 100);
    });
});
