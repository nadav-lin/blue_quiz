/**
 * Created by פנינה on 12/09/2015.
 */
$('#NextQuestionBtn').click(function()
{
    var currentMode = document.getElementById("NextQuestionBtn").value;
    var operation;
    if (currentMode == "עבור שאלה")
    {
        document.getElementById("NextQuestionBtn").value = "סיים שאלה";
        operation = "NextQuestion";
    }
    else
    {
        document.getElementById("NextQuestionBtn").value = "עבור שאלה";
        operation = "EndQuestion";
    }

    var gameId = document.getElementById("gameId").value;

    $.ajax({
        cache: false,
        dataType: 'json',
        type: "POST",
        data: { gameId: gameId, operation : operation},
        url: "/teacherGame",
        error: function (e)
        { },
        success: function (data)
        {
            if(data.question_desc)
                document.getElementById("currentQuestion").textContent = data.question_desc;
        }
    });

    //$.post('/teacherGame',
    //    {
    //        operation: "NextQuestion",
    //        gameId: document.getElementById("gameId").value,
    //    },
    //    function(data, status)
    //    {
    //        //if (!(data.wait == "true" || data.over == "true"))
    //        //{
    //        alert(data);
    //
    //            alert(data.question_desc.toString());
    //            document.getElementById("currentQuestion").value = data.question_desc.toString();
    //       // }
    //    });
});

$('#EndQuestion').click(function()
{
    $.post('/teacherGame',
        {
            operation: "EndQuestion",
            gameId: document.getElementById("gameId").value,
        },
        function(data, status)
        {
            //$('#currentQuestion').html(data);
        });
});


$('#EndGame').click(function()
{
    $.post('/teacherGame',
        {
            operation: "EndGame",
            gameId: document.getElementById("gameId").value,
        },
        function(data, status)
        {
            //$('#currentQuestion').html(data);
        });
});