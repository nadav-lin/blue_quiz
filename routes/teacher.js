/**
 * Created by user on 04/09/2015.
 */
var express = require('express');
var router = express.Router();
var gameManager = require('./../BL/GameManager.js');

router.post('/', function(req, res)
{
    res.header("Content-Type","application/json;charset=utf-8");
    var opration = req.body.Operation;
    if (opration == "Start Game!")
    {
        var id = gameManager.AddGame(req.body.chosenQuizId)
        res.render('teacherGameWindow', {id: id});
    }
    else if (opration == "Edit quiz")
    {
        res.render('quiz', {id: req.body.chosenQuizId});
    }
    else
    {
        res.render('quiz', {id: ""});
    }

});


module.exports = router;
