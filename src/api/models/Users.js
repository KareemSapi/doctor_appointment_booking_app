/**
 * @title
 * User Model: 
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
const Session = require('./Session');
const Patient = require('./Patient');

const User = sequelize.define('User', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    
    username: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    password: { 
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 8,
        },
        
    },

    is_verified: { type: Sequelize.BOOLEAN, defaultValue: true},

    is_approved: { type: Sequelize.BOOLEAN, defaultValue: true},

    is_admin: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false,
        defaultValue: false
    },

    is_doctor: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false,
        defaultValue: false
    },

    is_patient: {
        type: Sequelize.BOOLEAN, 
        allowNull: false,
        defaultValue: false
    },

    is_active: { type: Sequelize.BOOLEAN},

    remember_me: { type: Sequelize.BOOLEAN, defaultValue: false},

    two_factor_allowed: { type: Sequelize.BOOLEAN, defaultValue: false},

    last_login: {type: Sequelize.DATE},

    //paranoid: true //allow soft delete

});

User.hasOne(Doctor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.hasOne(Patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Session.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = User;
