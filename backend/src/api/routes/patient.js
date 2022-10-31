/**
 * @title
 * Patient Router: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const express = require('express');
 const passport = require('passport');
 const router = express.Router();
 const patientController = require('../controllers/common/patientController');
 const validator = require('../../utils/validators');

 const auth = passport.authenticate('jwt', {session: false});

//route to register patient
router.post('/add', validator.validate("add_patient"), patientController.add_patient);

//route to get patient by auth token
router.post('/current', patientController.get_current_patient);

module.exports = router;