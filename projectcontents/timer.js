$(document).ready(function () {
  //variables
    var mode = false;
    var counter = 0;
    var lapCounter = 0;
    var counterlap = 0;
    var action;
    var lapsNumber = 0;
    var beginning = 0;
    var duration = 0;
    var hr, min, sec, cs, laphr, lapmin, lapsec, lapcs, durhr, durmin, dursec;
    hr=min = sec =cs =laphr=lapmin=lapsec=durhr = durmin=dursec = 0;

    //on app load show start and lap buttons
    hideShowButton("#start", "#takeLap");
    //click on start button
        $("#start").click(function () {
            //show stop and lap buttons.
            hideShowButton("#stop", "#takeLap");
            mode = true;
            //start counter with a function
            countAction();
        });

    //click on stop button
        //show resume and reset buttons
        $("#stop").click(function(){
           hideShowButton("#resume", "#reset");
            //stop counter
            clearInterval(action);
        });

    //click on resume button
    $("#resume").click(function(){
        //show resume and reset buttons
        hideShowButton("#stop", "#takeLap");
        //start action
        countAction();
    });


    $("#reset").click(function(){
       location.reload();
    });

    //click on lapbutton
    $("#takeLap").click(function () {
       if (mode){
           clearInterval(action);
           lapCounter = 0;
           counterlap = 0;
           addLap();
           countAction();
       }
    });

    function hideShowButton(x, y){
        $(".controlButton").hide();
        $(x).show();
        $(y).show();
    }

    function countAction(){
        action = window.setInterval(function(){
            counter++;
            if (counter == 100*60*100*100){
                counter = 0;
            }
            lapCounter++;
            if (lapCounter == 100*60*100*100){
                lapCounter = 0;
            }
            updateTime();
        }, 1000);
    }

    function updateTime() {
        hr = Math.floor(counter/ 3600);
        min = Math.floor((counter%3600)/60);
        sec = Math.floor(counter%60);

        $('#timerhour').text(format(hr));
        $('#timerminute').text(format(min));
        $('#timersecond').text(format(sec));
        $('#timercentisecond').text(format(cs));

        laphr = Math.floor(lapCounter/ 3600);
        lapmin =  Math.floor((lapCounter % 3600)/60);
        lapsec = Math.floor(lapCounter%60);

        $('#laphour').text(format(laphr));
        $('#lapminute').text(format(lapmin));
        $('#lapsecond').text(format(lapsec));

    }

    function updateDuration(duration){
        durhr = Math.floor(duration/ 3600);
        console.log('durhr: '+durhr +' duration: '+duration);
        duration = duration % 3600;
        durmin = Math.floor(duration/60);
        console.log('durmin: '+ durmin +' duration: '+duration);
        dursec = Math.floor (duration%60);
        console.log('dursec: '+ dursec +' duration: '+duration);
    }

    function format(number){
        if(number < 10){
            return '0'+number;
        } else {
            return number;
        }
    }

    function addLap(){

        //calculate duration
        duration = counter - beginning;
        beginning = counter;
        updateDuration(duration);

        lapsNumber++;
        var value = $("#input").val();
        var myLap = '' +
            '<div id="result">' +
                '<div id="lapHeader">' +
                    lapsNumber + '.  '+ value + ' |' + '&nbsp'+'Duration'+ '&nbsp'+
                    '<span>' +format(durhr) +'</span>'+ ' hr '+
                    '<span>' +format(durmin) +'</span>'+ ' min '+
                    '<span>' +format(dursec) +'</span>'+ ' s ' +
                '</div>' +

                '<div id="lapNumber">' +
                    '<span>' +format(hr) +'</span>'+ ':'+
                    '<span>' +format(min) +'</span>'+ ':'+
                    '<span>' +format(sec) +'</span>'+
                '</div>'+
            '</div>';
        $(myLap).prependTo("#laps");
        $("input").val('Enter your task');
    }
});


