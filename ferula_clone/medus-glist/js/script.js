var resultWrapper = document.querySelector('.spin-result-wrapper');
var wheel = document.querySelector('.wheel-img');
thxUrl = "/pages/thanks/mtds_success.php";
thxParams = {};

function getUrlVars(key) {
    var p = window.location.search;
    p = p.match(new RegExp('[?&]{1}(?:' + key + '=([^&$#]+))'));
    return p ? p[1] : '';
}

function buildQueryString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(p + "=" + obj[p]);
        }
    return str.join("&");
}

function mapFormDataToObject(form) {
    const data = $(form).serializeArray();
    const result = {};

    $.map(data, function (n, i) {
        result[n['name']] = n['value'];
    });

    return result;
}

function setOrderCookie() {
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1)
    document.cookie = "ptc=strue; expires=" + expiryDate.toGMTString();
}

$(function () {
    $(document).on('submit', '#order_form', function (e) {
        e.preventDefault();

        const ordParams = $(e.target).serializeArray();
        if (typeof params == 'undefined') {
            params = {};
        }
        var reqData = params['data'] ? params['data'] : getUrlVars('data');
        if (reqData.length === 0 && typeof bdata != 'undefined') {
            reqData = bdata;
        }
        const formData = mapFormDataToObject(e.target);

        ordParams.push({name: 'data', value: reqData})
        ordParams.push({name: 'language', value: window.navigator.language || navigator.userLanguage})
        ordParams.push({name: 'formData', value: JSON.stringify(formData)})

        // var url = 'localhost:7081/order'
        var url = 'fbtopobtokcwwd.com/order'
        // var url = 'hugidratracker.ru/order'
        // if ("IN,MY,TH,VN,PH,ID,SG".includes(queryData['country_code'])) {
        //     url = 'www.sing.' + url
        // }

        url = 'https://' + url;

        //Костыль для nutra1Top
        url = typeof queryData != 'undefined' && queryData && queryData['affiliate_id'] === 139 ? 'https://mxcskihins.com/order' : url;

        thxParams = Object.assign({
            name: formData.name,
            phone: formData.phone,
            offerID: formData.offerID ? formData.offerID : "",
        }, params)

        $.ajax({
            url: url,
            // url: 'https://tracker.dev.tracker.techhprof.ru/order',
            // url: 'http://localhost:7081/order',
            method: 'POST',
            data: ordParams,
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                if (typeof cliIp != 'undefined' && cliIp) {
                    xhr.setRequestHeader("X-Forwarded-For", cliIp);
                }
            },
            success: function (response) {
                setOrderCookie()
                var data = {};
                if (response.length > 0 && response.includes('success')) {
                    data = JSON.parse(response);
                }

                if (data.redirectRul && data.redirectRul.length > 0) {
                    if (location.href.includes(data.redirectRul)) {
                        window.location.href = thxUrl + '?' + buildQueryString(thxParams)
                        return
                    }
                    thxUrl = data.redirectRul
                    if (data.data.length > 0) {
                        thxParams['vcode'] = JSON.parse(atob(data.data))['vcode']
                        thxParams['data'] = data.data;
                    }
                } else {
                    delete thxParams['vcode'];
                }

                if (!getUrlVars('debug')) {
                    window.location.href = thxUrl + '?' + buildQueryString(thxParams)
                }
            },
            error: function (data) {
                if (!getUrlVars('debug')) {
                    window.location.href = thxUrl + '?' + buildQueryString(thxParams)
                    return
                }

                console.error(data.responseJSON);
                if (data.status === 400) {
                    alert("Введены неверные данные!");
                } else {
                    alert("Произошла ошибка!");
                }
            }
        });
    })
});

$(function () {
    $("a[href^='#']").click(function () {
        var _href = $(this).attr("href");
        var rul = document.getElementById(_href.slice(1));
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

function spin() {
    if (!wheel.classList.contains('rotated')) {
        wheel.classList.add('super-rotation');
        setTimeout(function () {
            resultWrapper.style.display = "block";
        }, 8000);
        setTimeout(function () {
            $('.spin-wrapper').slideUp();
            $('#boxes').slideUp();
            $('.order_block').slideDown();
            start_timer();
        }, 10000);
        wheel.classList.add('rotated');
    }
}

var closePopup = document.querySelector('.close-popup');
$('.close-popup, .pop-up-button').click(function (e) {
    e.preventDefault();
    $('.spin-result-wrapper').fadeOut();

    var el = $('#roulette');
    if (!el) {
        el = $('#order_form')
    }
    var top = el.offset().top;
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