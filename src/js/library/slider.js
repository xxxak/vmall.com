var slider1 = function () {
    console.log('slider');
    return function () {
        console.log('1', $);
        $.fn.extend({
            slider: function (options) {
                let defaults = {
                    speed: 500, //  动画速度
                    delay: 3000, // 图片停留时间
                };

                // 合并参数
                $.extend(defaults, options);

                // 抽象功能(将所有可能要执行的操作都声明成变量)
                let main = null, // 函数入口(主函数)
                    init = null, // 初始化函数
                    start = null, // 开始动画
                    stop = null, // 停止动画
                    next = null, // 播放下一张
                    prev = null, // 播放上一张
                    timer = null, // 计时器
                    point = null, //小点点
                    elms = {}; // 命名空间 提供可以共享作用域的变量

                init = () => {
                    // 获得元素
                    elms.sliderElm = this.children('div');
                    elms.btns = this.children('span');
                    elms.lis = this.children('ul').children('li');
                    console.log(elms.lis);
                    // 初始化图片
                    elms.sliderElm.append(elms.sliderElm.children('img').first().clone());
                    // 获得单张图片宽度(动画距离)
                    elms.imgWidth = elms.sliderElm.children('img').first().width();
                    // 为当前播放的图片设置索引
                    elms.index = 1;
                    // console.log(elms);

                    this.hover(
                        function () {
                            stop();
                        },
                        function () {
                            timer = setInterval(
                                start.bind(null, 1),
                                defaults.delay + defaults.speed
                            );
                        }
                    );

                    elms.btns.on('click', function () {
                        if (elms.btns.index(this)) {
                            next();
                        } else {
                            prev();
                        }
                    });
                    elms.lis.on('click', function () {
                        if ($(this).siblings('.active').index() != -1) {
                            stop();
                            start(
                                Number($(this).index() - $(this).siblings('.active').index() > 0),
                                $(this).siblings('.active').index() + 1
                            );
                            switch (Number($(this).index() + 1)) {
                                case 1:
                                    elms.lis.removeClass().eq(0).addClass('active');
                                    break;
                                case 2:
                                    elms.lis.removeClass().eq(1).addClass('active');
                                    break;
                                case 3:
                                    elms.lis.removeClass().eq(2).addClass('active');
                                    break;
                            }
                        }
                    });
                };

                start = (direction, index) => {
                    if (index >= 0) {
                        elms.index = index;
                    }
                    let left = `-=${elms.imgWidth}`;

                    if (!direction) {
                        left = `+=${elms.imgWidth}`;

                        if (elms.index === 1) {
                            elms.index = 4;
                            let divLeft = this.offset().left,
                                imgLeft = elms.sliderElm.children('img').last().offset().left;
                            elms.sliderElm.css('left', `-${imgLeft - divLeft}px`);
                            switch (elms.index) {
                                case 1:
                                    elms.lis.removeClass().eq(0).addClass('active');
                                    break;
                                case 2:
                                    elms.lis.removeClass().eq(1).addClass('active');
                                    break;
                                case 3:
                                    elms.lis.removeClass().eq(2).addClass('active');
                                    break;
                            }
                        }
                    }

                    elms.sliderElm.animate(
                        {
                            left: left,
                        },
                        defaults.speed,
                        function () {
                            // 动画结束后执行回调

                            if (direction) {
                                elms.index++;
                            } else {
                                elms.index--;
                            }

                            if (elms.index === 4) {
                                elms.index = 1;
                                elms.sliderElm.css('left', 0);
                            }
                            // console.log(elms.index);
                            switch (elms.index) {
                                case 1:
                                    elms.lis.removeClass().eq(0).addClass('active');
                                    break;
                                case 2:
                                    elms.lis.removeClass().eq(1).addClass('active');
                                    break;
                                case 3:
                                    elms.lis.removeClass().eq(2).addClass('active');
                                    break;
                            }
                        }
                    );
                };

                next = () => {
                    stop();
                    start(1);
                };

                prev = () => {
                    stop();
                    start(0);
                };

                stop = () => {
                    clearInterval(timer);
                    elms.sliderElm.stop(true, true);
                };

                main = function () {
                    init();
                    timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay);
                };

                main();
            },
        });
    };
};

export default slider1;
