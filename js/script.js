let counterBagsWidget = 0;
const attempt = 5;
let formTime = 600;
const counterElem = $('.counter_attempts');
var resultWrapper = document.querySelector('.spin-result-wrapper');
var wheel = document.querySelector('.wheel-img');

 
let interval = {};

window.bag = {
    open: (e) => {
        if (counterBagsWidget >= 5) return;
        const target = $(e.currentTarget);

        if (counterBagsWidget < 6 && !target.hasClass('showed-goods')) {
            counterBagsWidget++;
            window.bag.substractConter();
            window.bag.changeClass(counterBagsWidget, target);
        }

        target.addClass('showed-goods');
    },

    substractConter: () => {
        let substr = attempt - counterBagsWidget;
        counterElem.text(substr);
    },

    changeClass: (counter, target) => {
        switch (counter) {
            case 1:
                target.addClass('sale sale-30');
                break;
            case 2:
            case 4:
                target.addClass('sale sale-100');
                break;
            case 3:
                target.addClass('sale sale-50');
                break;
            case 5:
                target.addClass('sale sale-100');
                $('.card__item.sale.sale-100').addClass('glow');
                window.bag.showResultWindow();
                window.bag.showForm();
                break;
        }
    },

    showResultWindow: () => {

        setTimeout(function () {
            $('.spin-result-wrapper').css('display', 'block');
        }, 1000);
    },

    showForm: () => {
        setTimeout(function () {
            $('.spin-wrapper').slideUp();
            $('.order_block').slideDown();
            window.bag.start_timer();
        }, 3000);
    },

    start_timer: () => {
        interval = setInterval(window.bag.tick, 1000);
    },

    tick: () => {
        formTime = formTime - 1;
        let mins = Math.floor(formTime / 60);
        let secs = formTime - mins * 60;
        if (mins == 0 && secs == 0) {
            clearInterval(interval);
        }
        secs = secs >= 10 ? secs : "0" + secs;
        $("#min").html("0" + mins);
        $("#sec").html(secs);
    },
}

$('.card__item').click((e) => {
    window.bag.open(e);
});

$(document).ready(()  => {
    $(".order_block div img").remove();
});


$(function () {
    $("a[href^='#']").click(function () {
        let _href = $(this).attr("href");
        let rul = document.getElementById(_href.slice(1));
        if (!rul) {
            _href = "#order_form";
        }

        $("html, body").animate({scrollTop: $(_href).offset().top + "px"});
        return false;
    });
    $(".fadepopup input").click(function () {
        $('.eeee, .fadepopup').css('display', 'none');
    });
});


var closePopup = document.querySelector('.close-popup');
$('.close-popup, .pop-up-button').click(function (e) {
    e.preventDefault();
    $('.spin-result-wrapper').fadeOut();

    let el = $('#roulette');
    if (!el) {
        el = $('#order_form')
    }
    let top = el.offset().top;
    $('body,html').animate({scrollTop: top}, 800);
});

var time = 600;
var intr;

function start_timer() {
    intr = setInterval(tick, 1000);
}

function tick() {
    time = time - 1;
    var mins = Math.floor(time / 60);
    var secs = time - mins * 60;
    if (mins == 0 && secs == 0) {
        clearInterval(intr);
    }
    secs = secs >= 10 ? secs : "0" + secs;
    $("#min").html("0" + mins);
    $("#sec").html(secs);
}

 
 $(document).ready(
 function() {
 $(".eeee").click( function() {
 $(".eeee").addClass("actsss"); // добавляем в нажатую ссылку класс act
 $(".fadepopup").addClass("actsss"); // добавляем в нажатую ссылку класс act
 $(".fadepopup").removeClass("xxxc"); // добавляем в нажатую ссылку класс act
 $(".eeee").removeClass("xxxc"); // добавляем в нажатую ссылку класс act
 $(".hikj").removeClass("actss"); // добавляем в нажатую ссылку класс act
 $("body").removeClass("modal-show"); // добавляем в нажатую ссылку класс act
 }
 );
 
 setTimeout(function() {
 var flag = true;
 $(window).mouseout(function(e) {
 if (e.pageY - $(window).scrollTop() < 1 && flag == true) {
 $('.fadepopup, .eoxp').fadeIn(300);
 $('.eeee').fadeIn(300);
 flag = false;
 }
 })
 }, 15000);

 $('div.close').click(function() {
 $('.fadepopup').css('display', 'none');
 $('.eeee').css('display', 'none');
 })
 
 
 }
 );


function rus_date() {
 var d = new Date();
 var month = 'январе феврале марте апреле мае июне июле августе сентябре октябре ноябре декабре'.split(' ')[d.getMonth()];
 document.write(month);
 };


 function rus_date2() {
 var d = new Date();
 var month = 'январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь'.split(' ')[d.getMonth()];
 document.write(month);
 };


let date = new Date().getFullYear()
 $('.date-span').text(date)

