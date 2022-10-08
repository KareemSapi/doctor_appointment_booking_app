/**
 * @title
 * Patient Controller: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const logger = require('../../../utils/logger');
 const User = require('../../models/Users');
 const Patient = require('../../models/Patient');
//  const config = require('config');
//  const passport = require('passport');
 const { validationResult } = require('express-validator');
const { saltHashPassword } = require('../../../utils/cipher');

/**
 * @method: register patient
 */
 exports.add_patient = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }

    const { first_name, middle_name, last_name, email, phone_number, date_of_birth, gender, address, blood_group, medical_conditions, password, confirm_password } = req.body
    console.log(req.body)

    try {
        const Result = await User.findOne({where: {username: `${email}`}})

        if(password !== confirm_password){ return res.status(400).json({message: `passwords do not match`})}
  
        if(Result){ return res.status(400).json({message: `User already exists`})}
  
        const  passwordHash = saltHashPassword(password, email);

        const USER = await User.create({
            username: email,
            password: passwordHash,
            is_patient: true,
        })

        await Patient.create({
            first_name,
            middle_name,
            last_name,
            phone_number,
            date_of_birth,
            gender,
            address,
            blood_group,
            medical_conditions,
            UserId: USER.dataValues.id
        })

        return res.status(201).json({message: 'Patient successfully registered'});


    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }