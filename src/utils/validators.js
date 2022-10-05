/**
 * @title
 * Validator functions: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 29 2022, Kareem Sapi
 */

const { check, validationResult }  = require('express-validator');

exports.validate = (method) => {

    switch(method){
        case "register_user": {
            return [
                check('username', 'Invalid email').exists().isEmail().trim(),
                check('password').trim().isLength({min: 8}),
                check('confirm_password').trim(),
            ]
        }

        case "add_role": {
            return [
                check('name', `Role doesn't exist`).exists().trim(),
                check('description').trim().optional(),
            ]
        }

        case "add_session": {
            return [
                check('token').isJWT().trim()
            ]
        }
    }
}