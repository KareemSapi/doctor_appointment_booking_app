/**
 * @title
 * Doctor Model: 
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

 const Doctor = sequelize.define('Doctor', {

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

    date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    gender: { 
        type: Sequelize.ENUM,
        values: ['Male', 'Female'],
        allowNull: false,
    },

    registration_number: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    qualification: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    specialization: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

});

module.exports = Doctor