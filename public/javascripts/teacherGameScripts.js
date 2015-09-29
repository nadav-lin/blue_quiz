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

function resetBars()
{
    var a = document.getElementById("rightAnswerBar");
    var b = document.getElementById("Answer1Bar");
    var c = document.getElementById("Answer2Bar");
    var d = document.getElementById("Answer3Bar");

    a.style.width = '15px';
    a.textContent = 0;

    b.style.width = '15px';
    b.textContent = 0;

    c.style.width = '15px';
    c.textContent = 0;

    d.style.width = '15px';
    d.textContent = 0;
}

$('#NextQuestionBtn').click(function()
{
    var currentMode = document.getElementById("NextQuestionBtn").value;
    var currentQuestionIndex = document.getElementById("currentQuestionIndex").value;
    var gameId = document.getElementById("gameId").value;

    var data;
    var operation;

    if (currentMode == "עבור שאלה")
    {
        resetBars();
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
        success: function (data)
        {
            if (data.question_desc)
            {
                document.getElementById("currentQuestion").textContent = data.question_desc;
                document.getElementById("currAns").textContent = data.right_answer;
                document.getElementById("Answer1").textContent = data.answer1;
                document.getElementById("Answer2").textContent = data.answer2;
                document.getElementById("Answer3").textContent = data.answer3;

            }
        }
    });
});

$('#GetStatisticBtn').click(function()
{
    data = {gameId: document.getElementById("gameId").value, operation: "GetStatistic",
            questionIndex: document.getElementById("currentQuestionIndex").value};

    $.ajax({
        cache: false,
        dataType: 'json',
        type: "POST",
        data: data,
        url: "/teacherGame",
        error: function (e) {
        },
        success: function (data)
        {
            var bars = {};
            bars[0] = document.getElementById("rightAnswerBar");
            bars[1]  = document.getElementById("Answer1Bar");
            bars[2]  = document.getElementById("Answer2Bar");
            bars[3]  = document.getElementById("Answer3Bar");

            var factor = 300 / (data["0"] + data["1"] + data["2"] + data["3"]);
            var length;

            for (var index = 0; index < 4; ++index)
            {
                length = Math.max(15 , (data[index.toString()] * 1.0) * factor);
                bars[index].textContent = data[index.toString()];
                bars[index].style.width = length + 'px';
            }
        }
    });
});

$(document).ready(function ()
{
    $('.questionTable tr').click(function()
    {
        var index = $(this).find("td:first").html();

        // header of table was clicked
        if (index == null)
        {
            return;
        }

        $('table tr').css('background', '#ffffff');
        $(this).css('background', '#ff0000');
        document.getElementById("currentQuestionIndex").value = $(this).find("td:first").html();
    });
});