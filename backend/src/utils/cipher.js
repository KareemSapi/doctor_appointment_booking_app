/**
 * @title
 * Cipher functions: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 22 2022, Kareem Sapi
 */

const crypto = require('crypto');
const logger = require('./logger');
const config = require('config');

const{
    secret, 
    ttl, 
    algorithm, 
    inputEncoding, 
    outputEncoding,
    ENCRYPTION_KEY,
    IV_LENGTH,
} = config.get('auth.cipherHelper');
 

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

function sha512(password, username) {
    const hash = crypto.createHmac('sha512', username);
    hash.update(password); 
    const passwordHash = hash.digest('hex');

    return passwordHash;
}

function saltHashPassword(password, username) {
    //const salt = genRandomString(32);
    return sha512(password, username);
}

function decipherToken(token){
    try{
        let textParts = token.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    catch(e){
        return logger.info("error: Could not decipher token", e.message);
    }
}

function cipherToken(user){
    try{
        const text = JSON.stringify({ user, valid: new Date().getTime() + ttl });

        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, outputEncoding), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString(outputEncoding) + ':' + encrypted.toString(outputEncoding);
    }
    catch(e){
        logger.info('Error: Could not create token',e.message)
    }

}

module.exports = {
    genRandomString,
    sha512,
    saltHashPassword,
    decipherToken,
    cipherToken
}