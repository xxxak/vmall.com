console.log('1');
import $ from './library/jquery.js';
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
          
    );
});
