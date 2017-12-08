const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('./keys');

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },(accessToken, refreshToken, profile, done) => {
            // console.log(accessToken);
            // console.log(profile);
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            };
            User.findOne({googleID: newUser.googleID})
                .then(user => {
                    if(user){
                        done(null, user);
                        console.log('user exists');
                    }else{
                    User.create(newUser)
                        .then((user)=>{
                            done(null, user);
                            console.log('user created');
                        });}
                });
        })
    );

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user));
    });
};