const config = require('../config/config')
const UsersModel = require('../models/users_model')
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.JWT_SECRET
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try{
        const user = await UsersModel.findById(jwt_payload.id)
        if(!user){
            return done(new Error('user find not found'), null)
        } else {
            return done(null, user)
        }
    }catch(error){
        done(error)
    }
}))

module.exports.isLogin = passport.authenticate('jwt', { session: false })