/**
 * Created by פנינה on 12/09/2015.
 */
$('#NextQuestion').click(function()
{
    $.post('/teacherGame',
        {
            gameId: document.getElementById("gameId").value,
        },
        function(data, status)
        {
            $('#currentQuestion').html(data);
        });
});

