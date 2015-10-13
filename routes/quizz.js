/**
 * Created by Dani on 06/10/2015.
 */
var express = require('express');
var router = express.Router();
var mySql = require('./../DAL/mySql.js');
var tmp;

router.post('/', function(req, res)
{
    quiz_name=req.body.name;
    tmp=req.body;
    categ=req.body.category;
    mySql.addQuizz("'"+quiz_name.toString()+"',0,8,"+categ.toString());
    mySql.getQuizzId(quiz_name,regQuestions);

});
function regQuestions(err,data){
    q_id=data[0].quiz_id;
    for(var i=0;i<=tmp.qc;i++){
        text=tmp['q'+i+'text'];
        corr=tmp['q'+i+'correct'];
        ansB=tmp['q'+i+'answerB'];
        ansC=tmp['q'+i+'answerC'];
        ansD=tmp['q'+i+'answerD'];
        console.log([text,corr,ansB,ansC,ansD]);
    }

}
module.exports = router;
