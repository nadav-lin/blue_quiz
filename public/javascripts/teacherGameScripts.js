function updateTable(previousIndex)
{
    var currentIndex = ++document.getElementById("currentQuestionIndex").value;
    $('table tr').css('background','#ffffff');

    $('table tr').each(function(tbl, tr)
    {
        var index = $(this).find("td:first").html();

        if (index == currentIndex)
        {
            $(this).css('background', '#ff0000');
        }
    });

}


$('#NextQuestionBtn').click(function()
{
    var currentMode = document.getElementById("NextQuestionBtn").value;
    var currentQuestionIndex = document.getElementById("currentQuestionIndex").value;
    var gameId = document.getElementById("gameId").value;

    var data;
    var operation;

    if (currentMode == "עבור שאלה") {
        document.getElementById("NextQuestionBtn").value = "סיים שאלה";
        operation = "NextQuestion";
        data = {gameId: gameId, operation: operation, currentQuestionIndex: currentQuestionIndex};
    }
    else
    {
        document.getElementById("NextQuestionBtn").value = "עבור שאלה";
        operation = "EndQuestion";
        updateTable(currentQuestionIndex);
        data = {gameId: gameId, operation: operation};
    }

    $.ajax({
        cache: false,
        dataType: 'json',
        type: "POST",
        data: data,
        url: "/teacherGame",
        error: function (e) {
        },
        success: function (data) {
            if (data.question_desc)
                document.getElementById("currentQuestion").textContent = data.question_desc;
        }
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

$(document).ready(function ()
{
    $('table tr').each(function(tbl, tr)
    {
        $(tr).click(function()
        {
            var index = $(this).find("td:first").html();

            // header of table was clicked
            if (index == null)
            {
                return;
            }

            $('table tr').css('background','#ffffff');
            $(this).css('background','#ff0000');
            document.getElementById("currentQuestionIndex").value = $(this).find("td:first").html();
        });
    });
});