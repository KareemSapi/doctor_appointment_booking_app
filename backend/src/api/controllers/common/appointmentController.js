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

/**
 * @method: create appointment
 */
exports.create_appointment = async (req, res) => {
    const id = req.user.id;
    const { start_time, doctorId } = req.body;

    try {
        const Patient = await Patient.findOne({where: {UserId: id}, include: User})

        const USER = Patient.User.dataValues

        if(!USER.is_patient){ return res.sendStatus(403) }

        await Appointment.create({
            start_time,
            end_time: start_time + (60000*30),
            DoctorId: doctorId,
            PatientId: Patient.dataValues.id,
            createdBy: id
        });

        return res.status(201).json({message: 'Appointment successfully created'})

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

/**
 * @method: get appointments by patient
 */
exports.get_appointments = async (req, res) => {
    const id = req.user.id

    try {
        const APPOINTMENTS = await Appointment.findAll({where: {createdBy: id}})

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