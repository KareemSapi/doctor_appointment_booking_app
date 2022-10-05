/**
 * @title
 * Role Router: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 01 2022, Kareem Sapi
 */

 const express = require('express');
 const passport = require('passport');
 const router = express.Router();
 const roleController = require('../controllers/common/roleController');
 const validator = require('../../utils/validators');

 const auth = passport.authenticate('jwt', {session: false})

 //route to create role
 router.post('/add-role', validator.validate('add_role'), roleController.create_role);

 module.exports = router;
