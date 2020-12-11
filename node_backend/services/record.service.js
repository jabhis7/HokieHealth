const db = require('../_helpers/database'); // TODO: fill out this file
const User = db.User;
const Record = db.Record;


module.exports = {
    getAllRecords,
    getAllPatientRecords,
    addRecord,
    sendFeedback
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
}

async function getAllPatientRecords(pat) {
    let patient = await User.findOne({username: pat}).populate('records');
    return patient.records;
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

async function sendFeedback(req) {
    let feedback = req.body.feedback;
    let forRecord = req.body.recordid;
    let record = Record.findOne({_id: forRecord});
    if (!record) {
        throw new Error("Record " + forRecord + " not found.");
    }
    return await Record.updateOne({_id: forRecord}, {$set: {feedback: feedback}})
}
