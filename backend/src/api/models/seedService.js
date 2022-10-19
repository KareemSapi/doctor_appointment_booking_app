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


module.exports = sequelize
  .sync({force: true})
  .then((response) => {
    //logger.info(response);
    console.log(response)
  })
  .catch(error => logger.error(`${error}`));