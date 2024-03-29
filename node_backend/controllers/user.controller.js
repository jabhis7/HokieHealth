const userService = require('../services/user.service');


module.exports = {
    authenticate,
    getAllPatients,
    addUser,
    addPatient,
    getUnchosenPatients,
    deletePatient,
    newRubric
};


function authenticate(req, res, next) {

       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function newRubric(req, res, next) {
        userService.newRubric(req.body)
            .then(updated => res.json(updated))
            .catch(err => next(err));
}

function getAllPatients(req, res, next) {

    userService.getAllPatients(req)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getUnchosenPatients(req, res, next) {
    userService.getUnchosenPatients()
        .then((unchosen) => res.json(unchosen))
        .catch((err) => next(err));
}

function deletePatient(req, res, next) {
    userService.deletePatient(req)
        .then((remaining) => res.json(remaining))
        .catch(err => next(err));
}

function addPatient(req, res, next) {
    userService.addPatient(req)
        .then(pat => res.json(pat))
        .catch(err => next(err));
}

function addUser(req, res, next) {

   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
