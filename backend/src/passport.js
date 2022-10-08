/**
 * @title
 * Auth configuration: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Oct 05 2022, Kareem Sapi
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../src/api/models/Users');
const crypto = require('crypto');
const cipher = require('./utils/cipher');
const config = require('config');
const secret = config.get('auth.jwt.secret');

passport.use(new LocalStrategy((username, password, cb) => { 
    return User.findOne({where: {username: username}})
      .then(user => { 
        if(!user){return cb(null, false, {message: `Incorrect username or password`})}

        const passwordHash = cipher.sha512(password, username);

        if(passwordHash !== user.password){
          return cb(null, false, {message: `Incorrect username or password`})
        }

        return cb(null, {
          id: user.id,
          username: user.username,
          is_verified: user.is_verified,
          is_approved: user.is_approved,
          is_active: user.is_active,
          is_doctor: user.is_doctor,
          is_patient: user.is_patient,
          is_admin: user.is_admin
        });
      })
      .catch((error) => { return cb(error)});

}));

/**
 * @method: Authenticate JWT token
 */

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  }, 
    function(jwt_payload, done){
       return done(null, jwt_payload)
}))