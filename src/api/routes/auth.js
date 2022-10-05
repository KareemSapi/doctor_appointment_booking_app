/**
 * @title
 * Auth Router: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 29 2022, Kareem Sapi
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/common/authController');
const validator = require('../../utils/validators');

const auth = passport.authenticate('jwt', {session: false});

//route to register user
router.post('/sign-up', validator.validate("register_user"), authController.register_user);

//route for user login
router.post('/login', authController.login);

//route for logging out
router.post('/logout', auth, authController.logout);

//route for refresh token
router.post('/refresh', authController.refresh_token)

//route for requesting token to reset password
router.post('/forgot-password', authController.forgot_password);

//route to reset password
router.post('/reset-password', authController.reset_password);

module.exports = router;