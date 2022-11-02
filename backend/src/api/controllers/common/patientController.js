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

    try {
        const Result = await User.findOne({where: {username: `${req.body.email}`}})

        if(req.body.password !== req.body.confirm_password){ return res.status(400).json({message: `passwords do not match`})}
  
        if(Result){ return res.status(400).json({message: `User already exists`})}
  
        const  passwordHash = saltHashPassword(req.body.password, req.body.email);

        const USER = await User.create({
            username: req.body.email,
            password: passwordHash,
            is_patient: true,
        })

        await Patient.create({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            address: req.body.address,
            blood_group: req.body.blood_group,
            medical_conditions: req.body.medical_conditions,
            UserId: USER.dataValues.id
        })

        return res.status(201).json({message: 'Patient successfully registered'});


    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }

 exports.get_current_patient = async (req, res) => { //console.log(req.user)
    try {

        if(!req.user.is_patient) return res.sendStatus(403)

        const PATIENT = await Patient.findOne({where: {UserId: req.user.id}})
        //console.log(PATIENT)

        if(!PATIENT) return {};

        return res.status(200).json(PATIENT);

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }

 /**
 * @method: update patient
 */
  exports.update_patient = async (req, res) => { 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }

    try {

        const PATIENT = await Patient.findOne({where: {UserId: req.user.id}})

        PATIENT.update({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            address: req.body.address,
            blood_group: req.body.blood_group,
            medical_conditions: req.body.medical_conditions,
        })

        return res.status(201).json({message: 'Patient successfully updated'});


    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }