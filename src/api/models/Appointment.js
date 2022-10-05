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
 const Doctor = require('./Doctor');
 const Patient = require('./Patient');

 const Appointment = sequelize.define('Appointment', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    start_time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    
    
    end_time: {
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

    patient_feedback: {
        type: Sequelize.TEXT,
        allowNull: true
    }
 })

 Doctor.hasMany(Appointment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 })

 Patient.hasMany(Appointment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
 })

 module.exports = Appointment;