import $ from './library/jquery.js';
import './library/jquery.lazyload.js';
$(function () {
    //轮播图
    console.log($('.slider'));
    $('.slider').slider();
    let jianto = $('.slider span');
    //  console.log($('.side-bar>ul>li'));
    $('.side-bar>ul>li').hover(
        function () {
            jianto.css('z-index', '99');
        },
        function () {
            jianto.css('z-index', '198');
        }
    );

    // 公告上下滚动
    let count = 0;
    let timer;
    // gs.css('transition', 'all 1.5s');
    let gs = $('.gonggao-sldier ul');
    timer = setInterval(function () {
        gs.css('transition', 'all 1.5s');
        count++;
        gs.css('top', `${count * -20}px`);
        count > 5 ? (count = 0) : count;
        if (count == 0) {
            gs.css('transition', 'none');
            gs.css('top', `0`);
        }
    }, 1500);

    // 精品推荐 左右点击滚动
    let leftBut = $('.left-but');
    let rightBut = $('.right-but');
    let jingping = $('.jinping-re');
    let left = 0;
    rightBut.on('click', function () {
        //  console.log(parseInt(jingping.css('left').slice(0, -2)));
        jingping.animate(
            {
                left: `${-1200 + left}px`,
            },
            200,
            function () {
                left += -1200;
                //   console.log(left);
            }
        );
    });
    leftBut.on('click', function () {
        jingping.animate(
            {
                left: `${1200 + left}px`,
            },
            200,
            function () {
                left += 1200;
            }
        );
    });

    leftBut.on('click', function () {
        if (left == -1200) {
            leftBut.css('display', 'none');
        } else {
            leftBut.css('display', 'block');
            rightBut.css('display', 'block');
        }
    });
    rightBut.on('click', function () {
        if (left == -2400) {
            rightBut.css('display', 'none');
        } else {
            rightBut.css('display', 'block');
            leftBut.css('display', 'block');
        }
    });
    // 小轮播图
    let time = null;
    let sl = $('.small-slider');
    let point = $('.small-slider p span');
    let slPic = $('.small-slider ul li');
    let start = function () {
        time = setInterval(function () {
            let index = point.parent().find('.show').index();
            index = index > 2 ? 0 : index + 1;
            slPic.eq(index).fadeIn(500).siblings().fadeOut(500);
            point.eq(index).addClass('show').siblings().removeClass();
        }, 1000);
    };
    let end = function () {
        clearInterval(time);
        time = null;
    };
    let timerout = setTimeout(start, 1000);
    point.on('mouseenter', function () {
        end();
        slPic.eq($(this).index()).fadeIn(500).siblings().fadeOut(500);
        $(this).addClass('show').siblings().removeClass();
    });
    // point.on('mouseout', function () {
    //     timerout = setTimeout(start, 1000);
    // });
    // 不要用mouseout mousein 冒泡干扰
    sl.on('mouseleave', function () {
        timerout = setTimeout(start, 1000);
        //  console.log(1);
    });
    sl.on('mouseenter', function () {
        //   console.log('mosueenter');
        end();
        clearTimeout(timerout);
        timerout = null;
    });

    // 首页商品信息渲染
    $.ajax({
        type: 'get',
        url: '../../interface/getData.php',
        dataType: 'json',
    })
        .then(function (data) {
            console.log(data);
            var productList = $('.hot-item .right-itme-list ul li');
            var imgs = $('.hot-item .right-itme-list ul li img');
            var p = $('.hot-item .right-itme-list ul li p');
            var price = $('.hot-item .right-itme-list ul li i');
            var span = $('.hot-item .right-itme-list ul li span');
            console.log(productList[0]);

            data.forEach((elm, i) => {
                let picture = JSON.parse(elm.picture);
                console.log(picture[0].src);
                console.log(imgs[i]);
                $(imgs[i]).attr('data-original', `${picture[0].src}.png`);
                $(p[i]).replaceWith(`<p>${elm.title}</p>`);
                $(price[i]).replaceWith(`<i>${elm.price}</i>`);
                $(span[i]).replaceWith(`<span>${elm.details}</span>`);
                //   console.log($('img.lazy'));

                //  imgs[i].append(picture[0].title);
            });
            $('img.lazy').lazyload({
                placeholder: '../img/lazy.jpeg',
                effect: 'fadeIn',
            });
        })
        .catch(function (xhr) {
            console.log(xhr.status);
        });
});
