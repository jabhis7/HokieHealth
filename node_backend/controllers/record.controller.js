const recordService = require('../services/record.service');


module.exports = {
    getAllRecords,
    getAllPatientRecords,
    addRecord,
    sendFeedback
};


function getAllRecords(req, res, next) {
       recordService.getAllRecords(req)
        .then(records => res.json(records))
        .catch(err => next(err));
}

function getAllPatientRecords(req, res, next) {
    recordService.getAllPatientRecords(req.body.username)
        .then(records => res.json(records))
        .catch(err => next(err));
}

function addRecord(req, res, next) {
    recordService.addRecord(req)
        .then(suc => res.json(suc))
        .catch(err => next(err));
}

function sendFeedback(req, res, next) {
    recordService.sendFeedback(req)
        .then(ack => res.json(ack))
        .catch(err => next(err));
}