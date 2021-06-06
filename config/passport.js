process.env.NODE_ENV === 'development' && require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            // return the user to the frontend
            return done(null, user);
          } else {
            // return false since there is no user
            return done(null, false);
          }
        })
        .catch((err) => console.log(err));
    })
  );
};
