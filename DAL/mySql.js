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
