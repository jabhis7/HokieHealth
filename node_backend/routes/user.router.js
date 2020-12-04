var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const recordController = require('../controllers/record.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

/* User handler */
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.addUser);
router.post('/newpatient', authorize(Role.doctor), userController.addPatient);
router.get('/mypatients', authorize(Role.doctor), userController.getAllPatients);

/* Record handler */
router.get('/records', recordController.getAllRecords);
router.post('/addrecord', recordController.addRecord);

module.exports = router;
