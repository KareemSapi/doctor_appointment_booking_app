/**
 * @title
 * User Controller: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

const logger = require('../../../utils/logger');
const User = require('../../models/Users');
const config = require('config');
const jwt = require('jsonwebtoken');
const cipher = require('../../../utils/cipher');
const { sign_jwt } = require('../../../utils/jwt.utils');
const { send_verification_email } = require('../../../utils/emailService');

/**
 * @method: Get user by id
 */
exports.get_user_by_id = async (req,res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({where: {id: id}});

        if(!user){ return res.status(400).json({message: 'Something went wrong!!!'})}

        return res.status(200).json(user);
    } catch (error) {
        logger.error(error)
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

/**
 * @method: email verification
 */
exports.email_verification = (req,res) => {
    const token = req.body.token;
    console.log(token)

    if(token){ 

        try {
            
            jwt.verify(token, config.get('auth.jwt.secret'), async function(err, decodedToken){ //console.log(decodedToken)
                if(err){ return res.status(403).json(err)}
    
                try {
                    const USER = await User.findOne({where: {id: decodedToken.id, username: decodedToken.username}})
                    console.log(USER);
        
                    if(!USER){ return res.status(400).json({message: 'token error'}) }
    
                    User.update({is_verified: true}, {where: {id: USER.id}})
    
                    return res.status(201).json({message: 'Email is verified'})
    
                } catch (error) {
                    logger.error(error);
                    return res.status(400).json({message: `Something went wrong!!!`})
                }
    
            })

        } catch (error) {
            return res.status(400).json({message: `${error}`})
        }

    }else{
        return res.status(400).json({message: `Something went wrong!!!`});
    }
}

/**
 * @method: updating user's password when a user is in session
 */
exports.update_password = async (req, res) => {
    const id = req.user.id; //get id from params or body
    const{ old_password, new_password, confirm_new_password } = req.body;

    if(new_password !== confirm_new_password){ return res.status(400).json({message: `password and confirm password do not match`})}
    
    try {
        const USER = await User.findOne({where: {id}})

        if(!USER){ return res.status(400).json({message: `Something went wrong!!!`})}

        const oldPasswordHash = cipher.sha512(old_password, USER.username)

        if(oldPasswordHash !== USER.password){ return res.status(400).json({message: `passwords don't match`})}

        const newPasswordHash = cipher.sha512(new_password, USER.username);

        const Results = await User.update({password: newPasswordHash}, {where: {id: USER.id}})
        
        return res.status(201).json({message: `password succesfully updated`})

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: `Something went wrong!!!`})
    }
}

/**
 * @method: re send verification email.
 */
exports.re_send_verification_email = async (req, res) => {
    const { id, token } = req.body;

    try {
        const USER = await User.findOne({where: {id: id}});

        if(!USER){ return res.status(400).json({message:`Something went wrong!!!`})}

        const token = sign_jwt({id: USER.id, username: USER.username}, "30m")
        console.log(token)

        send_verification_email(USER.username, "", token)

        return res.status(200).json({message: `An email containing a verification link has been sent, kindly activate your account`})

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: `Something went wrong!!!`})
    }
}

/**
 * @method: Delete User by id
 */
exports.delete_user = async (req, res) => {
    const idToDelete = req.body.id; //id of the user to be deleted

    const id = req.user.id; //id of the User deleting other Users

    try {
        const ROLE = await User.findOne({where: {id: id}})

        if(ROLE.dataValues.RoleId != 1 || !ROLE){ return res.sendStatus(403) }

        const USER = await User.findOne({where: {id: idToDelete}})

        if(!USER){ return res.status(400).json({message: `User doesn't exist`})}

        USER.destroy();

        return res.status(200).json({message: `User succesfully deleted`})

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: `Something went wrong!!!`})
    }
}

/**
 * @method: Get user by access token
 */
 exports.get_user_by_accessToken = async (req,res) => {
    const id = req.user.id;

    try {
        const user = await User.findOne({where: {id: id}});

        if(!user){ return res.status(400).json({message: 'Something went wrong!!!'})}

        return res.status(200).json(user);
    } catch (error) {
        logger.error(error)
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
}

