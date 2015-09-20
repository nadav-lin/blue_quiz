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
            manager.GetNextQuestion(gameId, res);
            break;
        }
        case("EndQuestion"):
        {
            manager.EndQuestion(gameId, res);
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
