/**
 * @title
 * Patient Model: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const Sequelize = require('sequelize');
 const sequelize = require('../../db/postgreClient');
 const User = require('./Users');

 const Patient = sequelize.define('Doctor', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    
    first_name: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    middle_name: { 
        type: Sequelize.STRING,
        allowNull: true,
    },

    last_name: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            min: 9
        }
    },

    date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    gender: { 
        type: Sequelize.ENUM,
        values: ['Male', 'Female'],
        allowNull: false,
    },

    blood_group: { 
        type: Sequelize.STRING,
        allowNull: true,
    },

    medical_conditions: { 
        type: Sequelize.STRING,
        allowNull: true,
    },

});

module.exports = Patient