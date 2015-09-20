/**
 * Created by פנינה on 12/09/2015.
 */
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
            alert("error " + e.message);
            setTimeout(longPoll_feed, 1000);
        },
        success: function (data) {
            display_event(data);

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

function display_event(data)
{
    if (data != null)
    {
        $('#question').html(data.question_desc);
        $('#op1').html(data.right_answer);
        $('#op2').html(data.answer1);
        $('#op3').html(data.answer2);
        $('#op4').html(data.answer3);
        document.getElementById("currentQuestion").value = data.index;
    }
    else
    {
        $('#question').html("Game Over");
    }
}