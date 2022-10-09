/**
 * @title
 * Patient Controller: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 08 2022, Kareem Sapi
 */

 const logger = require('../../../utils/logger');
 const User = require('../../models/Users');
 const Appointment = require('../../models/Appointment');
 const Patient = require('../../models/Patient')
 const Doctor = require('../../models/Doctor')
 const { validationResult } = require('express-validator');

/**
 * @method: create appointment
 */
exports.create_appointment = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }

    const id = req.user.id;
    const { time, doctorId } = req.body;
    console.log(id, time, doctorId)

    try {
        const PATIENT = await Patient.findOne({where: {UserId: id}, include: User})
        console.log(Patient);

        const USER = PATIENT.User.dataValues
        console.log(USER)

        if(!USER.is_patient){ return res.sendStatus(403) }

        await Appointment.create({
            time,
            DoctorId: doctorId,
            PatientId: PATIENT.dataValues.id,
            createdBy: id
        });

        return res.status(201).json({message: 'Appointment successfully created'})

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

/**
 * @method: get appointments
 */
exports.get_appointments = async (req, res) => {
    const id = req.user.id
    //console.log(id, req.user)

    let APPOINTMENTS

    try {
        if(req.user.is_patient){

            APPOINTMENTS = await Appointment.findAll({where: {createdBy: id}})
            console.log(APPOINTMENTS)

        }else{
            const DOCTOR = await Doctor.findOne({where: {UserId: id}})
            console.log(DOCTOR.dataValues.id)

            APPOINTMENTS = await Appointment.findAll({where: {DoctorId: DOCTOR.dataValues.id}})
            console.log(APPOINTMENTS)
        }
       

        return res.status(200).json(APPOINTMENTS)

    } catch (error) {
         logger.error(error)
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

/**
 * @method: get appointments by doctor id
 */
 exports.get_appointments_by_doctor_id = async (req, res) => {
    const id = req.user.id

    try {
        const DOCTOR = await Doctor.findOne({where: {UserId: id}})

        if(!DOCTOR){ return res.status(400).json({message: 'Something went wrong!!!'})}

        const APPOINTMENTS = await Appointment.findAll({where: {DoctorId: DOCTOR.dataValues.id}})

        return res.status(200).json(APPOINTMENTS)

    } catch (error) {
         logger.error(error)
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

/**
 * @method: confirm appointments
 */
exports.confirm_appointment = async (req, res) => {
    const appointmentId = req.body.id

    try {
       const APPOINTMENT = await Appointment.findOne({where: {id: appointmentId}})

       APPOINTMENT.update({is_active: false})

       return res.sendStatus(200)

    } catch (error) {
         logger.error(error)
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}