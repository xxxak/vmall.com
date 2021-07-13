import $ from './library/jquery.js';
//
$(function () {
    console.log($('.slider').slider());
    let jianto = $('.slider span');
    console.log($('.side-bar>ul>li'));
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
        console.log(parseInt(jingping.css('left').slice(0, -2)));
        jingping.animate(
            {
                left: `${-1200 + left}px`,
            },
            200,
            function () {
                left += -1200;
                console.log(left);
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
    // 防抖
    // function debounce(fn, delay) {
    //     let timer = null; //借助闭包
    //     return function () {
    //         if (timer) {
    //             clearTimeout(timer);
    //         }
    //         timer = setTimeout(fn, delay); // 简化写法
    //     };
    // }
    let time = null;
    let point = $('.small-slider p span');
    let slPic = $('.small-slider ul li');
    let start = function () {
        time = setInterval(function () {
            let index = point.parent().find('.show').index();
            index = index > 2 ? 0 : index + 1;
            slPic.eq(index).fadeIn(200).siblings().fadeOut(400);
            point.eq(index).addClass('show').siblings().removeClass();
        }, 1000);
    };
    let end = function () {
        clearInterval(time);
        time = null;
    };
    start();
    let timerout = null;
    // console.log(point);
    point.hover(function () {
        end();
        slPic.eq($(this).index()).fadeIn(200).siblings().fadeOut(400);
        $(this).addClass('show').siblings().removeClass();
        if (timerout) {
            clearTimeout(timerout);
            timerout = setTimeout(start, 1000);
        }
    });
});
