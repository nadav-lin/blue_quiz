/**
 * Created by user on 14/09/2015.
 */
var mySql = require('./../DAL/mySql.js');
//
var question = function(question, op1, op2, op3, op4)
{
    this.question = question;
    this.op1 = op1;
    this.op2 = op2;
    this.op3 = op3;
    this.op4 = op4;
    this.index = 1;
};

var Game = function(chosenQuizId)
{
    var isStarted = false;
    var name = "gameName";
    var currentQuestionIndex = -1;
    var questions = [];
    var connections = [];

    mySql.getQuestions(function(err, result)
    {
        questions = result;
    }, chosenQuizId);

    this.GetNextQuestion = function ()
    {
        currentQuestionIndex++;

        if (!isStarted)
        {
            isStarted = true;
        }

        if(questions.length > currentQuestionIndex)
        {
            return questions[currentQuestionIndex];
        }

        return null;
    };

    this.GetCurrentQuestion = function (userCurrentQuestion)
    {
        // the user already has the current question
        if (!isStarted || userCurrentQuestion == currentQuestionIndex)
            return null;

        var tempQuestion = null;

        // if there is another question, give it to him
        if(questions.length > currentQuestionIndex)
        {
            tempQuestion = questions[currentQuestionIndex];
        }
        else
        {
            tempQuestion = new question("Game Over", "", "", "", "");
        }

        if (tempQuestion != null)
            tempQuestion.index = currentQuestionIndex;

        return tempQuestion;
    };
};

module.exports = Game;