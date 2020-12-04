const userService = require('../services/user.service');


module.exports = {
    authenticate,
    getAllPatients,
    addUser,
    addPatient
};


function authenticate(req, res, next) {

       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllPatients(req, res, next) {

    userService.getAllPatients(req)
        .then(users => res.json(users))
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
