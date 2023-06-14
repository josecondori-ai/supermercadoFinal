import express from 'express';
//const express = require('express');
const app = express();

//const path = require('path');
import path from 'path';

//const bodyParser = require('body-parser');
import bodyParser from 'body-parser';


//const dotenv = require('dotenv');
import dotenv from 'dotenv'

//const mongoose = require('mongoose');
import mongoose from 'mongoose';

//const flash = require('connect-flash');
import flash from 'connect-flash'


//const session = require('express-session');
import session from 'express-session';


//const methodOverride = require('method-override');
import methodOverride from 'method-override'

//const passport = require('passport');
import passport from 'passport';


//const LocalStrategy = require('passport-local').Strategy;
import LocalStrategy from 'passport-local'
//Requiring user and admin route
//const userRoutes = require('./routes/users');
import userRoutes from './routes/users.js'

//const adminRoutes = require('./routes/admin');

//Requiring user model
//const User = require('./models/usermodel');
import User from './models/usermodel.js'

dotenv.config({path : './config.env'});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(con => {
    console.log('MongoDB Database connected successfully.');
});

//middleware for session
app.use(session({
    secret : 'Just a simple login/sign up application.',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField : 'email'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for method override
app.use(methodOverride('_method'));

//middleware flash messages
app.use(flash());

//setting middlware globally
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    res.locals.error = req.flash(('error'));
    res.locals.currentUser = req.user;
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(userRoutes);
//app.use(adminRoutes);

app.listen(process.env.PORT, ()=> {
    console.log('Server is started');
});