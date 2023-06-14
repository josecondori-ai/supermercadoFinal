//const mongoose = require('mongoose');
import mongoose from 'mongoose';

//const passportLocalMongoose = require('passport-local-mongoose');
import passportLocalMongoose from 'passport-local-mongoose'

let userScheme = new mongoose.Schema({
    name : String,
    email : String,
    password : {
        type : String,
        select : false
    },
    resetPasswordToken : String,
    resetPasswordExpires : Date
});

userScheme.plugin(passportLocalMongoose, {usernameField : 'email'});
export default  mongoose.model('User', userScheme);