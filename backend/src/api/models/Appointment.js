/**
 * @title
 * Appointment Model: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const Sequelize = require('sequelize');
 const sequelize = require('../../db/postgreClient');
 const Patient = require('./Patient')
 const Doctor = require('./Doctor')

 const Appointment = sequelize.define('Appointment', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    

    is_active: { 
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },

    doctor_remarks: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    patient_symptoms: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    
 })

 Patient.hasMany(Appointment, {
    foreignKey: 'PatientId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Doctor.hasMany(Appointment, {
    foreignKey: 'DoctorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

 module.exports = Appointment;