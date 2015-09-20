/**
 * Created by ????? on 12/09/2015.
 */
var express = require('express');
var router = express.Router();

var manager = require('./../BL/GameManager.js');

// teacher press next question
router.post('/', function(req, res)
{
    var gameId = req.body.gameId;
    var question = manager.GetNextQuestion(gameId);

    if (question == null)
        res.send("Game over")
    else
        res.send(question.question);
});

router.get('/', function(req, res)
{
    var gameId = req.body.gameId;
    var question = manager.GetNextQuestion(gameId);

    if (question == null)
        res.send("Game over")
    else
        res.send(question.question);
});

module.exports = router;
