/**
 * @title
 * Application db client: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 16 2022, Kareem Sapi
 */

const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');
const config = require('config');

const database = config.get('db.dbName');
const username = config.get('db.username');
const password = config.get('db.password');
const host = config.get('db.host');
const dialect = config.get('db.dialect');

//connect to database
module.exports = new Sequelize(`${database}`, `${username}`, `${password}`, {
    host: host,
    dialect: dialect,
});
