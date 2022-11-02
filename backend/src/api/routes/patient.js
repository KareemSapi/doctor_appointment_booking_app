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
router.get('/current', auth, patientController.get_current_patient);

//route to update patient
router.put('/', validator.validate('add_patient'), patientController.update_patient)

module.exports = router;