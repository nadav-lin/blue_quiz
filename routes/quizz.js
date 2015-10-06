/**
 * Created by Dani on 06/10/2015.
 */
var express = require('express');
var router = express.Router();
var mySql = require('./../DAL/mySql.js');

router.post('/', function(req, res)
{
    quiz_name=req.body.name;
    categ=req.body.category;
    mySql.addQuizz(quiz_name.toString()+',0,premission_id,'+categ.toString());
    mySql.getQuizzId(quiz_name,regQuestions);
});
function regQuestions(data){
    console.log(data);
}
module.exports = router;

