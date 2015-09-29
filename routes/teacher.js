/**
 * Created by user on 04/09/2015.
 */
var express = require('express');
var router = express.Router();
var gameManager = require('./../BL/GameManager.js');

router.post('/', function(req, res)
{
    var opration = req.body.Operation;
    if (opration == "Start Game!")
    {
        result = gameManager.AddGame(req.body.chosenQuizId, res);
    }
    else if (opration == "Edit quiz")
    {
        res.render('quiz', {id: req.body.chosenQuizId});
    }
    else
    {
        res.render('newQuizz', {id: ""});
    }

});


module.exports = router;
