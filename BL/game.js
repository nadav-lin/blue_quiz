/**
 * Created by user on 14/09/2015.
 */
var mySql = require('./../DAL/mySql.js');

var Game = function(chosenQuizId, res, gameId)
{
    var questionsStatistics = {};
    var isStarted = false;
    var currentQuestionIndex = -1;
    var questions = [];
    var connections = [];

    mySql.getQuestions(function(err, result)
    {
        questions = result;
        InitStatistic();
        res.render('teacherGameWindow', {id: gameId, questions: result});
    }, chosenQuizId);

    this.GetStatistic = function (questionIndex, res)
    {
        if (questionsStatistics[questionIndex])
        {
            var result = {};
            result["statistic"] = questionsStatistics[questionIndex];
            result["question"] = questions[questionIndex - 1];
            //var questionStatistic = JSON.stringify(result);
            res.end(JSON.stringify(result));
        }
    };

    this.PushAnswer = function (userCurrentQuestion, studentAnswer)
    {
        if (questionsStatistics[userCurrentQuestion])
        {
            ++questionsStatistics[userCurrentQuestion][studentAnswer];
        }
    };

    this.EndQuestion = function (res)
    {
        // send studentAnswers and reset the dic
        var waitSignal = JSON.stringify({wait: "true"});
        res.end(waitSignal);

        Disturbute(waitSignal);
    };

    this.EndGame = function (res)
    {
        var gameOverSignal = JSON.stringify({over: "true"});

        res.end(gameOverSignal);
        Disturbute(gameOverSignal);
    };

    this.GetNextQuestion = function (res, newQuestionIndex)
    {
        currentQuestionIndex = newQuestionIndex;

        if (!isStarted)
        {
            isStarted = true;
        }

        if(questions.length >= currentQuestionIndex)
        {
            var question = questions[currentQuestionIndex - 1];
            question.index = currentQuestionIndex;

            var questionJason = JSON.stringify(question);
            res.end(questionJason);

            Disturbute(questionJason);
        }
        else
        {
            var gameOverSignal = JSON.stringify({over: "true"});
            res.end(gameOverSignal);
            Disturbute(gameOverSignal);
        }
    };

    this.GetCurrentQuestion = function (userCurrentQuestion, res)
    {
        // the user already has the current question
        if (!isStarted || userCurrentQuestion == currentQuestionIndex)
        {
            connections.push(res);
        }
        else
        {
            var tempQuestion = null;

            // if there is another question, give it to him
            if (questions.length >= currentQuestionIndex)
            {
                tempQuestion = questions[currentQuestionIndex - 1];
            }
            else
            {
                tempQuestion = {question_desc: "Game Over"}
            }

            if (tempQuestion != null)
                tempQuestion.index = currentQuestionIndex;

            res.end(JSON.stringify(tempQuestion));
        }
    };

    function InitStatistic()
    {
        for (var index = 1; index <= questions.length; ++index)
        {
            questionsStatistics[index] = {0:0, 1:0, 2:0, 3:0};
        }
    }

    function Disturbute(itemToSend)
    {
        var length = connections.length;
        console.log(length);

        for (var index = 0; index < length; ++index)
        {
            try
            {
                connections.pop().end(itemToSend);
            }
            catch (e)
            {
                console.log("FAILED! " + e.message);
            }
        }
    }
};

module.exports = Game;