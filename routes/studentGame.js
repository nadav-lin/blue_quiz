/**
 * Created by ����� on 12/09/2015.
 */
var express = require('express');
var router = express.Router();

var manager = require('./../BL/GameManager.js');

router.post('/', function(req, res)
{
    var gameId = req.body.gameId;
    var currentQuestion = req.body.currentQuestion;
    var myAnswer = req.body.myAnswer;

    if (myAnswer)
    {
        console.log("myAnswer = " + myAnswer);
        manager.PushAnswer(gameId, currentQuestion, myAnswer);
        res.end();
    }
    else
    {
        console.log("GetCurrentQuestion = ");

        manager.GetCurrentQuestion(gameId, currentQuestion, res);
    }
});

module.exports = router;
