/**
 * Created by khoale on 7/24/16.
 */
//variables
var playing = false;
var score;
var trials;
var fruits = ['apple', 'banana','boom','watermelon'];
var gravity;
var theaction;

$(function(){

    $("#start").click(function () {
        if (playing){
            location.reload();
        } else {
            playing = true;
            score = 0;
            trials = 3;
            $("#scorevalue").show();
            $("#gameover").hide();
            addHearts();
            $("#start").html("Reset");
            action();
        }
    });

    //SLICE FRUIT
    $("#fruit1").mouseover(function () {

        if($("#fruit1").attr('src') == 'img/fruitsimage/boom.png'){
            $("#gameover").show();
            $("#gameover").html('<p> Oops you chopped the boom </p> <p> your score:'+ score+'</p>');
            stop();
        } else{
            score++;
            $("#scorevalue").html(score);
            clearInterval(theaction);
            $("#fruit1").hide("explode", 400);
            setTimeout(action, 400);
        }
    });

    function addHearts() {
        $("#life").empty();
        for (i=0 ; i < trials; i++){
            $("#life").append('<img src="img/fruitsimage/hearticon.png" class="heart">');
        }
    }

    function action(){
        $("#fruit1").show();
        //choose random start position
        chooseFruit();
        //random step
        gravity = Math.round(6*Math.random()+1);

        theaction = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + gravity);
            if (($("#fruit1").position().top > $("#canvas").height()))
            {
                if (($("#fruit1").attr('src') == 'img/fruitsimage/boom.png')){
                    if ($("#fruit1").position().top > $("#canvas").height()-10)
                    {
                        $("#frui1").hide();
                        $("#fruit1").show();
                        chooseFruit();
                    }
                } else {
                    if (trials > 1) {
                        $("#fruit1").show();
                        chooseFruit();
                        $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});
                        gravity = Math.round(5 * Math.random())+1;
                        trials--;
                        addHearts();
                    } else {
                        playing = false;
                        $("#start").html("Start");
                        $("#gameover").show();
                        $("#gameover").html('<p> Game Over </p> <p> your score:'+ score+'</p>');
                        stop();
                    }
                }
            }
        }, 7);
    }


    function chooseFruit() {
        $("#fruit1").attr('src','img/fruitsimage/' + fruits[Math.round(Math.random()*3)]+'.png');
        $("#fruit1").css({
            'left':Math.round(Math.random()*550),
            'top': -50
        });
    }
    function stop () {
        clearInterval(theaction);
        $("#fruit1").hide();
    }

});
/**
 * Created by khoale on 7/30/16.
 */
