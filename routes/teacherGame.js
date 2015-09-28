/**
 * Created by ????? on 12/09/2015.
 */
var express = require('express');
var router = express.Router();

var manager = require('./../BL/GameManager.js');

// teacher press next question
router.post('/', function(req, res)
{
    var operation = req.body.operation;
    var gameId = req.body.gameId;

    switch (operation)
    {
        case("NextQuestion"):
        {
            var newQuestionIndex = req.body.currentQuestionIndex;
            manager.GetNextQuestion(gameId, res, newQuestionIndex);
            break;
        }
        case("EndQuestion"):
        {
            console.log("EndQuestion");

            manager.EndQuestion(gameId, res);
            break;
        }
        case("GetStatistic"):
        {
            console.log("GetStatistic");

            var questionIndex = req.body.questionIndex;
            manager.GetStatistic(gameId, questionIndex, res);
            break;
        }
        case("EndGame"):
        {
            manager.EndGame(gameId, res);
            break;
        }
    }
});

module.exports = router;
