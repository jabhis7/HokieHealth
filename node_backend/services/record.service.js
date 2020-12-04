const db = require('../_helpers/database'); // TODO: fill out this file
const mongoose = require("mongoose");
const { findOne } = require('../models/user.model');
const User = db.User;
const Record = db.Record;


module.exports = {
    getAllRecords,
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
    let user = await User.findOne({_id: userid});
    if (user.role === "Doctor") {
        // do doctor things
        let patientid = req.body.patientid;
        let patient = await User.findOne({_id: patientid});
        return patient.records;
    }
    else {
        // do patient things
        return user.records;
    }
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
        if (record.heartrate && record.date) {
            record.user = userid;
            const recordLiteral = Record(record);
            await recordLiteral.save();
            return "record saved successfully";
        }
        else {
            throw new Error("Invalid record input, please fill in required fields");
        }
    }
}
