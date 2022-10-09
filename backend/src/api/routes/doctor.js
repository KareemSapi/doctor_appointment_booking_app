/**
 * @title
 * Doctor Router: 
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
 const doctorController = require('../controllers/common/doctorController');
 const validator = require('../../utils/validators');

 const auth = passport.authenticate('jwt', {session: false});

//route to create doctor's profile
router.post('/add',auth, validator.validate("add_doctor"), doctorController.add_doctor);

//route to search for doctors
router.get('/:term', auth, doctorController.get_doctor_by_specialization)

module.exports = router;