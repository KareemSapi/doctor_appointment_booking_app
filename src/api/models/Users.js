/**
 * @title
 * User Model: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 01 2022, Kareem Sapi
 */

const Sequelize = require('sequelize');
const sequelize = require('../../db/postgreClient');
const Roles = require('./Roles');
const Session = require('./Session');

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

    //salt: { type: Sequelize.STRING},

    password: { 
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 8,
        },
        
    },

    //user_verification_token: {type: Sequelize.STRING, defaultValue: null},

    is_verified: { type: Sequelize.BOOLEAN, defaultValue: true},

    is_approved: { type: Sequelize.BOOLEAN, defaultValue: true},

    is_active: { type: Sequelize.BOOLEAN},

    remember_me: { type: Sequelize.BOOLEAN, defaultValue: false},

    two_factor_allowed: { type: Sequelize.BOOLEAN, defaultValue: false},

    // createdBy: { 
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    // },

    // updatedBy: { 
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    // },

    last_login: {type: Sequelize.DATE},

    //paranoid: true //allow soft delete

});

Roles.hasMany(User, {
    onDelete: 'NO ACTION', //do nothing instead of setting to null
    onUpdate: 'CASCADE'
});
Session.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = User;
