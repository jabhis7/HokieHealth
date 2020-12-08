const db = require('../_helpers/database'); // TODO: fill out this file
const mongoose = require("mongoose");
const { findOne } = require('../models/user.model');
const User = db.User;
const Record = db.Record;


module.exports = {
    getAllRecords,
    getAllPatientRecords,
    addRecord
}

/**
 * Obtains all records for a given patient.
 * @param {request} req The request body to get all records; contains
 * a patientid if a doctor is handling the request s.t. the doctor
 * can see all of a patient's records
 */
async function getAllRecords(req) {
    let userid = req.user.sub;
    let user = await User.findOne({_id: userid}).populate('records');
    return user.records;
    if (user.role === "Doctor") {
        // do doctor things
        let username = req.body.username;
        let patient = await User.findOne({username: username}).populate('records');
        if (!patient) {
            throw new Error("patient " + username + " not found");
        }
        return patient.records;
    }
    else {
        // do patient things
        return user.records;
    }
}

async function getAllPatientRecords(pat) {
    let patient = await User.findOne({username: pat}).populated('records');
    return patient.records;
}

// TODO: do we want this
async function deleteCourse(id) {
     return await Course.deleteOne({"_id":id});
}

/**
 * Adds a record to the database of records
 * @param {request} req the request containing the current user's id and a body
 * with the record data
 */
async function addRecord(req) {
    let record = req.body;
    let userid = req.user.sub;
    let user = await User.findOne({_id: userid});

    if (user.role === "Doctor") {
        throw new Error("Doctors are not responsible for reporting patients' problems");
    }
    else if (user.role === "Patient") {
        // validate request body
        if (record.heartrate) {
            record.user = userid;
            const recordLiteral = Record(record);
            let patient = await User.findOne({_id: userid});
            await recordLiteral.save();
            patient.records.push(recordLiteral);
            return await User.updateOne({"username": patient.username}, {$set: {"records": patient.records}});
        }
        else {
            throw new Error("Invalid record input, please fill in required fields");
        }
    }
}
