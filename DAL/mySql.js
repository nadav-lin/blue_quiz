/**
 * Created by פנינה on 19/09/2015.
 */
var mySql = require('mysql');

var question = function(question, op1, op2, op3, op4)
{
    this.question = question;
    this.op1 = op1;
    this.op2 = op2;
    this.op3 = op3;
    this.op4 = op4;
    this.index = 1;
}

exports.addQuizz = function(param) //-- ADD QUIZZ
{
    var queryStr = "INSERT INTO quiz VALUES (Null,"+param+");";
    QueryFromDB(function(){}, queryStr);
};
exports.addQuestion = function(param) //-- ADD QUESTION
{
    var queryStr = "INSERT INTO questions (quiz_name,private,premission_id,category_id) VALUES ("+param+");";
    QueryFromDB(function(){}, queryStr);
};
exports.getQuizzId = function(name,callback)
{
    var queryStr = "Select quiz_id from quiz where quiz_name = '" + name+"';";
    QueryFromDB(callback, queryStr);
};
exports.getQuestions = function(callback, quizId)
{
    var queryStr = "Select * from questions where quiz_id = " + quizId.toString();
    QueryFromDB(callback, queryStr);
};

function QueryFromDB(callback, queryStr)
{
    var conn = mySql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'YellowOfficer',
            database: 'quizdb'
        });

    console.log('Connecting to db');
    conn.connect();
    console.log('db connected');

    var query = conn.query(queryStr, callback);

    console.log(query.sql);
    conn.end();
}

exports.getQuizes = function(callback)
{
    QueryFromDB(callback, "Select * from quiz");
}
