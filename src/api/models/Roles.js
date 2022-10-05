/**
 * @title
 * Roles Model: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 20 2022, Kareem Sapi
 */

 const Sequelize = require('sequelize');
 const sequelize = require('../../db/postgreClient');

 const Role = sequelize.define('Roles', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },

    // createdBy: { 
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    // },

    // updatedBy: { 
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    // },
    
 });

 module.exports = Role;