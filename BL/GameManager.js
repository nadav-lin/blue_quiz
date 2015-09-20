/**
 * Created by user on 13/09/2015.
 */
var game = require('./game.js');
var gameDic = {};
var id = 0;

function GetGameId()
{
    // refactor this so the id will reset himself
    return id++;
    //return 1;
}

exports.AddGame = function(chosenQuizId)
{
    var currentGame = new game(chosenQuizId);
    var id = GetGameId();
    gameDic[id]= currentGame;
    return id;
};

exports.GetNextQuestion = function(gameId)
{
    var question = null;

    if(gameDic[gameId])
    {
        question = gameDic[gameId].GetNextQuestion();
    }

    return question;
};

exports.GetCurrentQuestion = function(gameId, userCurrentQuestion) {
    if (gameDic[gameId])
    {
        var question = gameDic[gameId].GetCurrentQuestion(userCurrentQuestion);
        return question;
    }

    return null;
};


exports.GetGames = function(chosenQuizId)
{
    return gameDic;
};