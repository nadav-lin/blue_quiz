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

    setTimeout(getCurrentQuestion, 0, res, gameId, currentQuestion);
});

function getCurrentQuestion(res, gameId, currentQuestion)
{
    var question = manager.GetCurrentQuestion(gameId, currentQuestion);

    if (question != null)
    {
        res.end(JSON.stringify(question));
    }
    else
    {
        // need to check how to abort the loop if the request is timed out
        // if (req.isAlive == true)
        setTimeout(getCurrentQuestion, 100, res, gameId, currentQuestion);
    }
}

module.exports = router;
