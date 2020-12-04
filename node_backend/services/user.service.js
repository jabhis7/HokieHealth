const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    authenticate,
    getAllPatients,
    addUser,
    addPatient
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
    let user = await User.findOne({_id: userid});
    if (user.role === "Patient") {
        throw new Error("Patients cannot view other patients");
    }
    return user.patients;
}

/**
 * Used to add a patient to a doctor's list of patients.
 * @param {request} req The request to add a patient to a doctor user.
 */
async function addPatient(req) {
    let reqid = req.body.patientid;
    
    let userid = req.user.sub;
    let user = await User.findOne({_id: userid});
    if (!user.patients) { user.patients = []; }
    
    if (user.role === "Patient") {
        throw new Error("Patients cannot have patients");
    }
    user.patients.forEach((patient) => {
        if (patient == reqid) {
            throw new Error("cannot add duplicate patients");
        }
    });
    user.patients.push(reqid);
    await User.updateOne({"username": user.username}, {$set: {"patients": user.patients}});
    return user;
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

