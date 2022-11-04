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

    //console.log(id, req.body)

    try {
        const PATIENT = await Patient.findOne({where: {UserId: id}})
        //console.log(PATIENT);

        if(!req.user.is_patient){ return res.sendStatus(403) }

        await Appointment.create({
            time: req.body.time,
            DoctorId: req.body.doctorId,
            PatientId: PATIENT.dataValues.id,
            patient_feedback: req.body.patient_symptoms,
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
            //console.log(APPOINTMENTS)

        }else{
            const DOCTOR = await Doctor.findOne({where: {UserId: id}})

            APPOINTMENTS = await Appointment.findAll({where: {DoctorId: DOCTOR.dataValues.id}})
            //console.log(APPOINTMENTS)
        }
       

        return res.status(200).json(APPOINTMENTS)

    } catch (error) {
         logger.error(error)
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

/**
 * @method: get appointments by its respective id
 */
 exports.get_appointment_by_id = async (req, res) => {
    const id = req.params.id

    try {
        const APPOINTMENT = await Appointment.findOne({where: {id: id}})
        //console.log(APPOINTMENT)
        const PATIENT = await Patient.findOne({where: {id: APPOINTMENT.dataValues.PatientId}})

        !APPOINTMENT && !PATIENT? {}: res.status(200).json(map_appointment(APPOINTMENT, PATIENT));

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'});
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

//map appointment data & patient data
function map_appointment(appointment, patient){

    function getAge(dob){
        var diff = Date.now() - Date.parse(dob);
        var age = new Date(diff)

        return Math.abs(age.getFullYear() - 1970);
    }

    //console.log(appointment)

    return {
        id: appointment.id,
        first_name: patient.first_name,
        middle_name: patient.middle_name,
        last_name: patient.last_name,
        gender: patient.gender,
        blood_group: patient.blood_group,
        medical_conditions: patient.medical_conditions,
        age: getAge(patient.date_of_birth),
        time: appointment.time,
        remarks: appointment.doctor_remarks,
        symptoms: appointment.patient_symptoms,
    }
}