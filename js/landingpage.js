/**
 * Created by khoale on 8/4/16.
 */
function startMoving(img) {
    var img$ = $(img);
    var imgWidth = img$.width();
    var screenWidth = $(window).width()-300;
    var amount = screenWidth - (parseInt(img$.css("left"), 10) || 0);
    if (amount <=0 ) {
        img$.css("left", -imgWidth-200);
        amount = screenWidth + imgWidth;
    }
    var moveRate = 100;   // pixels per second to move
    var time = amount * 1000 / moveRate;
    img$.stop(true)
        .animate({left: "+=" + amount}, time, "linear", function() {
            // when animation finishes, start over
            startMoving(this);
        })
}

$(document).ready(function() {
    // readjust if window changes size
    $(window).resize(function() {
        $('.moving').each(function() {
            startMoving(this);
        });
    });
    $('.moving').each(function() {
        startMoving(this);
    });
    $('#myMan').click(function () {
        location.href='mailto: khoadang.le@outlook.com';
    });
    $('.moving').css('cursor', 'pointer');
});