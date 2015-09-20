/**
 * Created by פנינה on 12/09/2015.
 */
var express = require('express');
var router = express.Router();
var gameManager = require('./../BL/GameManager.js');

router.post('/', function(req, res)
{
    var opration = req.body.Operation;

    if (opration == "Start Game!")
    {
        var gameId = req.body.chosenGameId;

        res.render('studentGameWindow', {id: gameId});
    }
    else
    {
        res.send("Error!")
    }
});

//this method need to be in game, only game knows what games are active
//function getGameFirstQuestion()
//{
//    return [{id: 1, name: "animals"}, {id: 2, name: "techni"}, {id: 3, name: "ofek"}];
//}

module.exports = router;
