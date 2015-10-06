var express = require('express');
var router =  express.Router();
var manager = require('./../BL/GameManager.js');
var mySql = require('./../DAL/mySql.js');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res)
{
  var userName = req.body.userName;
  console.log(userName);
  if (userName == "teacher")
  {
    mySql.getQuizes(function (err, result)
    {
      res.render('teacher', {userName: userName, quizes: result});
    })
  }
  else if (userName == "student")
  {
    var keys = Object.keys(manager.GetGames());

    res.render('student', {userName: userName, keys: keys});
  }
  else
  {
    res.render('login', {msg: "Wrong username or password"});
  }
});

module.exports = router;

