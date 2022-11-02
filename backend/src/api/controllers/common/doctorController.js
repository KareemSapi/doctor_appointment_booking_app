/**
 * @title
 * Auth Controller: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const logger = require('../../../utils/logger');
 const Users = require('../../models/Users');
 const Doctor = require('../../models/Doctor');
 const config = require('config');
 const passport = require('passport');
 const email = require('../../../utils/emailService');
 const { validationResult } = require('express-validator');

/**
 * @method: add info about doctor
 */
exports.add_doctor = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }

    const userId = req.user.id
    //console.log(req.body)

    //const { first_name, middle_name, last_name, date_of_birth, gender, phone_number, address, registration_number, qualification, specialization } = req.body

    try {
        const USER = await Users.findOne({where: {id: userId}})

        if(!USER || USER.dataValues.is_doctor === false){ 
            return res.sendStatus(403);
        }

        //Check if respective doctor already has a profile
        const DOCTOR = await Doctor.findOne({where: {UserId: userId}})

        //update doctor if exists
        if(DOCTOR){
            DOCTOR.update({
                first_name: req.body.first_name, 
                middle_name: req.body.middle_name, 
                last_name: req.body.last_name, 
                date_of_birth: req.body.date_of_birth, 
                gender: req.body.gender,
                phone_number:req.body.phone_number,
                address: req.body.address, 
                registration_number: req.body.registration_number, 
                qualification: req.body.qualification, 
                specialization: req.body.specialization,
            })

            return res.status(201).json({message: 'profile updated!'})
        }

        await Doctor.create({
            first_name: req.body.first_name, 
            middle_name: req.body.middle_name, 
            last_name: req.body.last_name, 
            date_of_birth: req.body.date_of_birth, 
            gender: req.body.gender,
            phone_number:req.body.phone_number,
            address: req.body.address, 
            registration_number: req.body.registration_number, 
            qualification: req.body.qualification, 
            specialization: req.body.specialization, 
            UserId: userId
        })

        return res.status(201).json({message: 'Doctor successfully registered'});

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }

 /**
  * @method: search for doctors based on their specialization
  */
 exports.get_doctor_by_specialization = async (req, res) => { //console.log(req.params)
    const term = req.params.term; 

    try {
        const DOCTORS = await Doctor.findAll({where: {specialization: term}})
        //console.log(DOCTORS)
        
        if(!DOCTORS){ return res.status(200).json([])}

        return res.status(200).json(DOCTORS)

    } catch (error) {
         logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 } 

 exports.get_current_doctor = async (req, res) => { //console.log(req.user)
    try {

        if(!req.user.is_doctor) return res.sendStatus(403)

        const DOCTOR = await Doctor.findOne({where: {UserId: req.user.id}})
        //console.log(DOCTOR)

        if(!DOCTOR) return {};

        return res.status(200).json(DOCTOR);

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }

 exports.get_doctor_by_id = async (req, res) => { 
    try {

        const DOCTOR = await Doctor.findOne({where: {id: req.params.id}})
        //console.log(DOCTOR)

        if(!DOCTOR) return {};

        return res.status(200).json(DOCTOR);

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }