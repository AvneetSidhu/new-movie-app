require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbURI = "mongodb+srv://user:123p@cluster0.szcic.mongodb.net/movie-app?retryWrites=true&w=majority"
//const dbURI = 'mongodb+srv://firstuser:123p@cluster0.drrxn.mongodb.net/to-do-app?retryWrites=true&w=majority'
const User = require('./models/usrSchema')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const jwt = require('jsonwebtoken')

port = 5000;

// middleware 
app.use(express.json())
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
require('./passport-config')(passport);


//connect to db

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port);
        console.log("server started");
    })
    .catch((err) => console.log(err));

// routes

app.get("/", (req, res) => {
    res.json({ "users": ["a", "b"] })
})
app.use("/get-movie-by-id", require('./routes/getMovieById'))
app.use("/sign-up", require('./routes/signUp'))
app.use('/pop-movies', require('./routes/getPop'))
app.post('/log-in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send(info);
        else {
            req.logIn(user, err => {
                if (err) throw err;
                
               // console.log(req.user)
                const user = req.user.email
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                //console.log(accessToken)
                res.json({accessToken: accessToken ,redirect: "success", user: req.user})
            });
        }
    })(req, res, next);
})


