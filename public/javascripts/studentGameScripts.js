/**
 * Created by DANI on 12/09/2015.
 */
var selected=-1;
var waiting=false;
var corr=0;
var usedFifty=false;
var fiftyRem=[];
var gameId;
var currentQuestion;
var traceback={};
//-- select answer
function selekt(num)
{
    if(waiting)
        return;
    if(usedFifty && fiftyRem.indexOf(num)!=-1)
        return;
    if(selected!=-1){
        $("#a"+selected.toString()).attr('src','/images/A.jpg');
        $("#d"+selected.toString()).css({color:'white'});
        selected=-1;
    }
    var sel="#a"+num.toString();
    $(sel).attr('src','/images/S.jpg');
    $("#d"+num.toString()).css({color:'black'});
    selected=num;
}
function longPoll_feed ()
{
    var gameid = document.getElementById("gameId").value;
    var currentQuestion = document.getElementById("currentQuestion").value;

    $.ajax({
        cache: false,
        dataType: 'json',
        type: "POST",
        data: { gameId: gameid, currentQuestion : currentQuestion} ,
        url: "/studentGame",
        error: function (e) {
            //don't flood the servers on error, wait 1 seconds before retrying
            //delete this on operational
            // alert("error " + e.message);
            setTimeout(longPoll_feed, 1000);
        },
        success: function (data) {
            display_event(data);
            if(data.over)
                return;
            //if everything went well, begin another request immediately
            //the server will take a long time to respond
            //how long? well, it will wait until there is another message
            //and then it will return it to us and close the connection.
            //since the connection is closed when we get data, we longPoll again
            setTimeout(longPoll_feed, 1000);
        }
    });
}

$(document).ready(function() {
    //begin listening for updates right away
    longPoll_feed();
});
$(window).on('resize', function(){
    placeDiv();
});
$(function(){
    $(window).load(function(){
        placeDiv();
    });
});
//--Place divs
function placeDiv(){
    for(var i=1;i<5;i++)
    {
        inf=$("#a"+i.toString()).position();
        t=inf.top;
        l=inf.left;
        $("#d"+i.toString()).css({top:t-5,left:l+375});
    }
    inf=$("#q").position();
    t=inf.top;
    l=inf.left;
    $("#qu").css({top:t+10,left:l+800});
}

/*
 function placeDiv(){
 for(var i=1;i<5;i++)
 {
 inf=$("#a"+i.toString()).position();
 t=inf.top;
 l=inf.left;
 $("#d"+i.toString()).css({top:t-5,left:l+50});
 }
 inf=$("#q").position();
 t=inf.top;
 l=inf.left;
 $("#qu").css({top:t+10,left:l+85});
 }
 */
function fify(){

    if(usedFifty)
        return;
    $('#fifty').hide();
    $("#d"+fiftyRem[0].toString()).css({color:'black'});
    $("#d"+fiftyRem[1].toString()).css({color:'black'});
    if(fiftyRem.indexOf(selected)!=-1){
        $("#a"+selected.toString()).attr('src','/images/A.jpg');
        selected=-1;
    }
    usedFifty=true;
}
function display_event(data)
{
    if(data.wait)
    {
        var currentQuestion = document.getElementById("currentQuestion").value;
        var gameId = document.getElementById("gameId").value;

        waiting=true;
        $("#a"+corr.toString()).attr('src','/images/R.jpg');
        $("#d"+corr.toString()).css({color:'black'});
        var exp ={ gameId: gameId,
            currentQuestion: currentQuestion,
            myAnswer: traceback[selected]};//  myAnswer: "1"}; //
        if(selected==-1)
            return;
        $.ajax({
            cache: false,
            dataType: 'json',
            type: "POST",
            data: exp,
            url: "/studentGame"});
        return;
    }
    if(data.over)
    {
        $('#tq').html("Quizz Over");
        waiting=true;
        for(i=1;i<5;i++) {
            $('#t' + i.toString()).html(" ");
            $("#a"+i.toString()).attr('src','/images/A.jpg');
        }
        return;
    }
    if (data != null)
    {
        currentQuestion=data.index;
        gameId=data.gameId;
        waiting=false;
        corr=Math.floor(Math.random()*4)+1;
        $('#tq').html(currentQuestion+". "+data.question_desc);
        var anss=[data.answer1,data.answer2,data.answer3].sort(function() {
            return 0.5 - Math.random();
        });

        $('#t'+corr.toString()).html(data.right_answer);
        traceback[corr]=0;
        var j=0;
        for(i=1;i<5;++i) {
            if (i == corr)
                continue;
            $('#t' + i.toString()).html(anss[j]);
            switch(anss[j]){
                case data.answer1:
                    traceback[i]=1;
                    break;
                case data.answer2:
                    traceback[i]=2;
                    break;
                case data.answer3:
                    traceback[i]=3;
                    break;
            }
            j++;
        }
        var i=corr;
        fiftyRem=[];
        while(i==corr && fiftyRem.length<2)
        {
            i=Math.floor(Math.random()*4)+1;
            if(i!=corr && fiftyRem.indexOf(i)==-1)
                fiftyRem.push(i);
            i=corr;
        }
        for(i=1;i<5;i++) {
            $("#a"+i.toString()).attr('src','/images/A.jpg');
            $("#d"+i.toString()).css({color:'white'});
        }

        document.getElementById("currentQuestion").value = data.index;
        //$("#currentQuestion").value = data.index;
        usedFifty=false;
    }
}