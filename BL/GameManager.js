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

exports.PushAnswer = function(gameId, userCurrentQuestion, studentAnswer)
{

};

exports.AddGame = function(chosenQuizId)
{
    var currentGame = new game(chosenQuizId);
    var id = GetGameId();
    gameDic[id]= currentGame;
    return id;
};

exports.EndGame = function(gameId, res)
{
    if(gameDic[gameId])
    {
        gameDic[gameId].EndGame(res);
        //delete
    }
};

exports.GetNextQuestion = function(gameId, res)
{
    if(gameDic[gameId])
    {
        gameDic[gameId].GetNextQuestion(res);
    }
};

exports.GetCurrentQuestion = function(gameId, userCurrentQuestion, res)
{
    if (gameDic[gameId])
    {
        gameDic[gameId].GetCurrentQuestion(userCurrentQuestion, res);
    }
};

exports.EndQuestion = function(gameId, res)
{
    if (gameDic[gameId])
    {
        gameDic[gameId].EndQuestion(res);
    }
};

exports.GetGames = function(chosenQuizId)
{
    return gameDic;
};