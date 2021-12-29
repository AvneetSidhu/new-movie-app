if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbURI = "mongodb+srv://user:123p@cluster0.szcic.mongodb.net/movie-app?retryWrites=true&w=majority"
//const dbURI = 'mongodb+srv://firstuser:123p@cluster0.drrxn.mongodb.net/to-do-app?retryWrites=true&w=majority'
const User = require('./models/usrSchema')
const bcrypt = require('bcrypt')
const initializePassport = require('./passport-config')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
port = 5000;

app.use(express.json())
initializePassport(passport)
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port);
        console.log("server started");
    })
    .catch((err) => console.log(err));
    
app.get("/", (req, res) => {
    res.json({"users":["a","b"]})
})

app.use("/sign-up",require('./routes/signUp'))

app.post('/log-in', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))