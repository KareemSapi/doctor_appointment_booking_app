/**
 * @title
 * Session Model: 
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

const Session = sequelize.define('Session', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    valid: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },

})

//User.hasMany(Session);

module.exports = Session;
