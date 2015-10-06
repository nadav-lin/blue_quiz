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
        var categories = [{id:1, name:'guy'}, {id:2, name:'guy2'}, {id:3, name:'guy3'}];
        res.render('newQuizz', {categories: categories});
    }

});

module.exports = router;
