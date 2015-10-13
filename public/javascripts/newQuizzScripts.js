/**
 * Created by Dani on 29/09/2015.
 */
var lastQ=5;
function extend(){
    lastQ++;
    $('#qCount').attr('value',lastQ);
    var nextQ = '<tr><td><p>'+lastQ.toString()+
        '.</p></td><td><input value="Question text" id="q'+lastQ+'text" name="q'+lastQ+'text"></td></tr><tr><td colspan="2">'+
        '<p>A.<input value="Correct answer text" width="100%" id="q'+lastQ+'correct" name="q'+lastQ+'correct"></p>'+
        '<p>B.<input value="Answer 1 text" id="q'+lastQ+'answerB" name="q'+lastQ+'answerB"></p>'+
        '<p>C.<input value="Answer 2 text" id="q'+lastQ+'answerC" name="q'+lastQ+'answerC"></p>'+
        '<p>D.<input value="Answer 3 text" id="q'+lastQ+'answerD" name="q'+lastQ+'answerD"></p></td></tr>';
    $("#MyTable tr:last").after(nextQ);



}