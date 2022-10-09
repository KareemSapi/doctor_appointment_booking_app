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
 const appointmentController = require('../controllers/common/appointmentController');
 const validator = require('../../utils/validators');

 const auth = passport.authenticate('jwt', {session: false});

//route to register patient
router.post('/add', validator.validate("add_appointment"), appointmentController.create_appointment);

//router to get patients appointments
router.get('/all', appointmentController.get_appointments);

router.put('/confirm', appointmentController.confirm_appointment);


module.exports = router;