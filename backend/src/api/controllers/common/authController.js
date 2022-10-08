/**
 * @title
 * Auth Controller: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

 const logger = require('../../../utils/logger');
 const Users = require('../../models/Users');
 const Session = require('../../models/Session');
 const config = require('config');
 const cipher = require('../../../utils/cipher');
 const passport = require('passport');
 const jwt = require('jsonwebtoken');
 const email = require('../../../utils/emailService');
 const jwt_service = require('../../../utils/jwt.utils');
 const { validationResult } = require('express-validator');

 /** 
  *@method: User registration 
  */
 exports.register_user = async (req,res) => { 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    }

    try {
      const USER = await Users.findOne({where: {username: `${req.body.username}`}})
      

      if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({message: `passwords do not match`})
      }

      if(USER){
          return res.status(400).json({message: `User already exists`})
      }

     const  passwordHash = cipher.saltHashPassword(req.body.password, req.body.username);
      //console.log(passwordHash);

      await Users.create({
          username: req.body.username,
          password: passwordHash,
          is_doctor: true,
          is_admin: true
      })

      return res.status(201).json({message: `User succesfully created`})

    } catch (error) {
        logger.error(error);
        return res.status(400).json({message: 'Something went wrong!!!'})
    }
        
 }

 /**
  * @method: User login 
  */
 exports.login = (req,res) => {

  passport.authenticate('local', {session: false}, (err, user) => {
    if(err || !user){
      return res.status(400).json({message: `Incorrect username or password`})
    }
    
    req.login(user, { session: false }, (error) => { 
          if (error) {
              return res.send(error);
          } 

            const accessToken = jwt_service.sign_jwt(user, "1w") //create access token
         
            //const refreshToken = jwt_service.sign_jwt({id: user.id}, "1y") //create refresh token

            //save_refresh_token(refreshToken, user.id) //save refresh token


        return res.status(200).json({ user, accessToken, message: `Login succesful` });
    });

  })(req,res)
 }

   /**
   * @method: user logout
   */
 exports.logout = async (req, res, next) => {
  //invalidate refresh token in storage
  const { refreshToken } = req.body; console.log(refreshToken)
  
  if(refreshToken){
    try {
      const session = await Session.findOne({where: {token: refreshToken}})
  
      if(!session){ return res.status(401).json({message: 'Something went wrong!!!'})}
  
      await session.destroy({force: true});
  
      return res.sendStatus(204)
  
    } catch (error) {
      logger.error(error);
    }
  }else{
    return res.status(400).json({message: `Something went wrong!!!`});
  }

 }

 /**
  * @method: Send reset password token 
  */
 exports.forgot_password = async (req,res) => {
  const username = req.body.username;

  try {
    const user = await Users.findOne({where: {username: username}});

    if(!user){ return res.status(400).json({message: 'User does not exist'}) }

    const USER = {id: user.id}

    const reset_password_token = jwt_service.sign_jwt(USER, "30m");
    console.log(reset_password_token);

    email.send_reset_password_email(USER.username, reset_password_token);

    return res.status(200).json({message: 'An email containing instructions has been sent'})

  } catch (error) {
    return res.status(400).json({message: error});
  }
 }

 /**
  * @method: Reset password
  */
 exports.reset_password = async (req, res) => {

  const {token, password, confirm_password} = req.body;

  try {
    jwt.verify(token, config.get('auth.jwt.secret'), async function(err, decodedToken){

      if(err){ return res.status(403).json(err)}

      if(password !== confirm_password){ return res.status(400).json({message: `password don't match`}) }

      const USER = await Users.findOne({where: {id: decodedToken.id}})

      if(!USER){ return res.status(400).json({message: 'token error'}) }

      const passwordHash = cipher.sha512(password, USER.username);

      await Users.update({password: passwordHash}, {where: {id: USER.id}});

      return res.status(201).json({message: `password is succesfully updated`})

    })
  } catch (error) {
    return res.status(400).json('Something went wrong!!!');
  }
 }

 /**
  * @method: save refresh token to storage
  */
async function save_refresh_token(token, id){ 

  if(token){

    try {
      //save token in db or temp storage
     await Session.create({
        token: token,
        UserId: id
      });
      
    } catch (error) {
      logger.error(error);
    }

  }else{
    logger.error('token error')
  }

 }

 /**
  * @method: create new access token through refresh token
  */
 exports.refresh_token = async (req,res) => {
  const { refreshToken } = req.body

  if(refreshToken){ 

    try {

      jwt.verify(refreshToken, config.get('auth.jwt.secret'), async function(err, decodedToken){
        if(err){ return res.status(400).json(err)}

        const USER = await Session.findOne({where: {token: refreshToken}, include: Users})
        //console.log(USER)

        if(!USER){ return res.status(400).json({message: `Something went wrong`})}
        console.log(map_user(USER.User.dataValues))

        const accessToken = jwt_service.sign_jwt(map_user(USER.User.dataValues), "10m");

        return res.status(200).json({accessToken})
      })
      
    } catch (error) {
      return res.status(400).json(error)
    }

  }else{
    return res.sendStatus(403)
  }
 }

 /**
  * @method: filter user data when returning user object when refreshing token
  */
 function map_user(user){

  const User = user

  return user? {
          id: User.id,
          username: User.username,
          isVerified: User.is_verified,
          isApproved: User.is_approved,
          role: User.RoleId
  }: {};
 }
 