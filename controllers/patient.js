var db_query = require('../db/executeQuery');
var async = require('async');
var moment = require('moment');
const groupBy = require('lodash/groupBy');

function savePatient(postData, next) {
    var currentDate = new Date(Date.now()).toLocaleString();
    if (!postData.name) return next("NoUserName");
    var insertQuery = 'INSERT INTO cubezixpatient(name,mobile,createdDate,deleted) VALUE(?,?,?,?)';
    db_query.paramQuery(insertQuery, [postData.name, postData.mobile, currentDate, postData.deleted], function (err, result) {
        if (err) return mext(err);
        return next(result);
    });
}

function getPatients(postData, next) {
    const selectQuery = 'SELECT * FROM cubezixpatient qp WHERE qp.deleted = ? '
    db_query.paramQuery(selectQuery,[0], function (err, result) {
        if (err) return mext(err);
        return next(result);
    });
}

function deletepatient(pid, next) {
    const updateQuery = 'update cubezixpatient qp set qp.deleted= ? WHERE qp.pId = ? '
    db_query.paramQuery(updateQuery,[1,pid], function (err, result) {
        if (err) return mext(err);
        return next(result);
    });
}

exports.savePatient = savePatient;
exports.getPatients = getPatients;
exports.deletepatient = deletepatient;
