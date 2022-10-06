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

module.exports = router;