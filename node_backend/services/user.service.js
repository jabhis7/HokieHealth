const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const roles = require('../_helpers/role');
const User = db.User;

module.exports = {
    authenticate,
    getAllPatients,
    addUser,
    addPatient,
    getById,
    getUnchosenPatients,
    deletePatient
}

/**
 * Authenticates a given user by his or her username or password.
 * @param {Object} param0 a username/password pair to authenticate a user
 */
async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

/**
 * Get a user by his or her id
 * @param {String} id 
 */
async function getById(id) {
    return await User.find({_id:id});
}

/**
 * Gets all patients for a given doctor
 * @param {request} req The request containing the current user
 */
async function getAllPatients(req) {
    let userid = req.user.sub;
    let user = await User.findOne({_id: userid}).populate({
        path: 'patients',
        populate: { path: 'records' }
    });
    if (user.role === "Patient") {
        throw new Error("Patients cannot view other patients");
    }
    return user.patients;
}

async function getUnchosenPatients() {
    let patients = await User.find({role: roles.patient});
    temp = [];
    patients.forEach((patient) => {
        if (!patient.doc) { temp.push(patient); }
    });
    return temp;
}

/**
 * Used to add a patient to a doctor's list of patients.
 * @param {request} req The request to add a patient to a doctor user.
 */
async function addPatient(req) {
    let username = req.body.username;
    
    let userid = req.user.sub;
    let user = await User.findOne({_id: userid});
    if (!user) { throw new Error("doctor nonexistant"); }
    if (!user.patients) { user.patients = []; }
    
    if (user.role === "Patient") {
        throw new Error("Patients cannot have patients");
    }
    let patient = await User.findOne({username: username});
    if (patient.doc) { throw new Error("patient is already assigned a doctor"); }
    if (patient) {
        user.patients.forEach((p) => {
            if (p == patient._id) {
                throw new Error("cannot add duplicate patients");
            }
        });
        patient.doc = userid;
        user.patients.push(patient._id);
    }
    else {
        throw new Error("patient nonexistant");
    }
    await User.updateOne({"username": user.username}, {$set: {"patients": user.patients}});
    await User.updateOne({"username": patient.username}, {$set: {"doc": patient.doc}})
    return user;
}

async function deletePatient(req) {
    let username = req.params.username;
    let user = await User.findOne({username: username});
    let doc = user.doc;
    let doctor = await User.findOne({_id: doc});
     let temp = [];
     doctor.patients.forEach((patient) => {
         if (!user._id.equals(patient)) {
            temp.push(patient);
         }
     })
    await User.deleteOne({username:username});
    await User.updateOne({_id: doc}, {$set: {"patients": temp}});
    return temp;
}

/**
 * Registers a new user
 * @param {Object} userParam an object containing a username/password/role
 * for registration
 */
async function addUser(userParam) {

    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();

}

