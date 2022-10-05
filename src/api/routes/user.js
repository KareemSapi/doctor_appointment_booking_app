/**
 * @title
 * User Router: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const express = require('express')
 const router = express.Router();
 const userController = require('../controllers/common/userController');
 const passport = require('passport');

 const auth = passport.authenticate('jwt', {session: false});

 //route to get user by id.
 router.get('/:id', auth, userController.get_user_by_id);

 //route to verify user's account
 router.post('/email-verification', userController.email_verification)

 //route to update a users password
 router.put('/update/password', auth, userController.update_password)

 //route to re-send an email containing a verification link
 router.post('/re-send/email', userController.re_send_verification_email)

 //route to delete user
 router.delete('/', auth, userController.delete_user) 

 module.exports = router;