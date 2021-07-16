import $ from './library/jquery.js';
import cookie from './library/cookie.js';
$(function () {
    let shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop);
        console.log(shop);
        let idList = shop.map(el => el.id).join();
        $.ajax({
            type: 'get',
            url: '../../interface/getItems.php',
            data: {
                idList,
            },
            dataType: 'json',
        })
            .then(function (res) {
                console.log(res);
                let tempString = '';
                let total = 0;
                let quantity = 0;
                res.forEach(el => {
                    let picture = JSON.parse(el.picture);
                    // 让ajax请求数据结果遍历的id与cookie中对应id相同 才可以填写数据
                    let current = shop.filter(elm => elm.id === el.id);
                    total += current[0].num * el.price;
                    quantity += parseInt(current[0].num);
                    tempString += ` <li class="item clearfix" data-id="${el.id}">
                    <div>
                        <input type="checkbox" />
                        <img src="${picture[0].src}.png" alt="" />
                    </div>
                    <ul class="sub">
                        <li>
                            <p>${el.title}</p>
                            <p>（陶瓷白） 陶瓷白 5G全网通 8GB+256GB 官方标配</p>
                        </li>
                        <li class="price" data-price="${el.price}"><span>¥ ${
                        el.price
                    }.00</span></li>
                        <li>
                            <section>
                                <span class="reduce">-</span>
                                <input  data-id="${el.id}" type="text" value="${current[0].num}" />
                                <span class="add">+</span>
                            </section>
                        </li>
                        <li class="sum" ><span>¥ ${current[0].num * el.price}.00</span></li>
                        <li><a href="javascript:;" class="removeitem" data-id="${
                            el.id
                        } ">删除</a></li>
                    </ul>
                </li>`;
                });

                $('.shop-car-list ul')
                    .html(tempString)
                    .find('.removeitem')
                    .on('click', function () {
                        let res = shop.filter(el => {
                            return parseInt(el.id) !== parseInt($(this).attr('data-id'));
                        });
                        cookie.set('shop', JSON.stringify(res), 1);

                        // location.reload();
                    });

                // 购物车汇总
                $('.totol-price i').html(`￥${total}.00`);
                $('.quantity').html(`￥${quantity}`);

                // 购物车加减
                $('.shop-car-list>ul>li').on('click', function (ev) {
                    // let that = this;
                    let id = $(this).find('input[type="text"]').attr('data-id');
                    let price = $(this).find('.price').attr('data-price');

                    if (ev.target.className == 'add') {
                        addItem(id, price, 1);
                        render(id, this);
                    }
                    if (
                        ev.target.className == 'reduce' &&
                        $(this).find('input[type="text"]').val() != '1'
                    ) {
                        addItem(id, price, -1);
                        render(id, this);
                        // location.reload();
                    }
                });
                // $('.add').on('click', function () {
                //     let inputItem = $(this).parent().find('input');
                //     addItem(inputItem.attr('data-id'), $('.price').attr('data-price'), 1);
                //     location.reload();
                // });
                // $('.reduce').on('click', function () {
                //     let inputItem = $(this).parent().find('input');
                //     if (inputItem.val() == 1) {
                //         alert('no 0');
                //     } else {
                //         addItem(inputItem.attr('data-id'), $('.price').attr('data-price'), -1);
                //         location.reload();
                //     }
                // });
            })
            .catch(function (xhr) {
                console.log('1', xhr.status);
            });
    }
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
    function render(id, that) {
        let newtotal = 0;
        let newnum = 0;
        let newshop = cookie.get('shop');
        newshop = JSON.parse(newshop);
        newshop.forEach((el, i) => {
            console.log(el);
            newtotal += el['price'] * el['num'];
            newnum += parseInt(el['num']);
            if (el['id'] == id) {
                $(that)
                    .find('li.sum span')
                    .html(`￥${el['price'] * el['num']}.00`);
                $(that).find('input[type="text"]').val(`${el['num']}`);
            }
        });
        $('.totol-price i').html(`￥${newtotal}.00`);
        $('.totol-price em').html(`${newnum}`);
    }
    // $('.reduce');
});
