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

        case "add_doctor": {
            return [
                check('first_name', 'First Name can\'t be empty').exists().trim(),
                check('middle_name').trim(),
                check('last_name', 'Last Name can\'t be empty').exists().trim(),
                check('date_of_birth', 'Date of Birth can\'t be empty').exists().isDate({format: 'YYYY-MM-DD'}).trim(),
                check('gender', 'Gender can\'t be empty').exists().trim(),
                check('registration_number', 'Registration Number can\'t be empty').exists().trim(),
                check('qualification', 'Qualification can\'t be empty').exists().trim(),
                check('specialization', 'Specialization can\'t be empty').exists().trim(),
            ]
        }

        case "add_patient": {
            return [
                check('first_name', 'First Name can\'t be empty').exists().trim(),
                check('middle_name').trim(),
                check('last_name', 'Last Name can\'t be empty').exists().trim(),
                check('date_of_birth', 'Date of Birth can\'t be empty').exists().isDate({format: 'YYYY-MM-DD'}).trim(),
                check('gender', 'Gender can\'t be empty').exists().trim(),
                check('email', 'Invalid email').exists().isEmail().trim(),
                check('password').trim().isLength({min: 8}),
                check('confirm_password').trim(),
            ]
        }

        case "add_appointment": {
            return [
                check('start_time', 'Start time can\'t be empty').exists().isDate({format: 'YYYY-MM-DD'}).trim(),
            ]
        }
    }
}