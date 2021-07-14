import $ from './library/jquery.js';
$(function () {
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
                console.log(e.clientX, e.offsetX, e.pageX, movevbox.height());
                console.log(top, left);
                //定位方法二 offsetX，offsetY 这个要在移动的项目的css属性加上 pointer-events: none; 防止出现数值突然归零
                // let top = ev.offsetY - movebox.height() / 2;
                // let left = ev.offsetX - movebox.width() / 2;
                //定位方法三pageX，pageY
                // let top = ev.pageY - this.offsetTop - movebox.height() / 2;
                // let left = ev.pageX - this.offsetLeft - movebox.width() / 2;
                // console.log(this.offsetTop, this.offsetLeft);
                //    console.log(top, left);
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
});
