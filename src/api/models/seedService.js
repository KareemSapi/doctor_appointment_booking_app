/**
 * @title
 * seed service: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

const sequelize = require('../../db/postgreClient');
const logger = require('../../utils/logger');

const Roles = require('./Roles');
const Users = require('./Users');
const Session = require('./Session');

module.exports = sequelize
  .sync({force: true})
  .then((response) => {
    logger.info(response);
    return (Roles.create({name: 'administrator'}));
  })
  //.then(role => logger.info(role))
  .catch(error => logger.error(`${error}`));