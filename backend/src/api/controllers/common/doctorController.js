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

    const { first_name, middle_name, last_name, date_of_birth, gender, phone_number, address, registration_number, qualification, specialization } = req.body

    try {
        const USER = await Users.findOne({where: {id: userId}})

        if(!USER || USER.dataValues.is_doctor === false){ 
            return res.sendStatus(403);
        }

        await Doctor.create({
            first_name, 
            middle_name, 
            last_name, 
            date_of_birth, 
            gender,
            phone_number,
            address, 
            registration_number, 
            qualification, 
            specialization, 
            UserId: userId
        })

        return res.status(201).json({message: 'Doctor successfully registered'});

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
 }