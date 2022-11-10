/**
 * @title
 * JWT Service: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 26 2022, Kareem Sapi
 */

const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('./logger');

const { algorithm, secret,  accessTokenExp,  refreshTokenExp} = config.get('auth.jwt')

/**
 * @method: sign jwt token
 */
exports.sign_jwt = function(payload, expiresIn){

    const options = {
        algorithm: algorithm,
        expiresIn: expiresIn,
    }

    try {

        const token = jwt.sign(payload, secret, options)
        return token;

    } catch (error) {

        logger.error(error);
    }
}
