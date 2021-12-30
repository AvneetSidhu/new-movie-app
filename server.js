const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbURI = "mongodb+srv://user:123p@cluster0.szcic.mongodb.net/movie-app?retryWrites=true&w=majority"
//const dbURI = 'mongodb+srv://firstuser:123p@cluster0.drrxn.mongodb.net/to-do-app?retryWrites=true&w=majority'
const User = require('./models/usrSchema')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const cookieParser = require('cookie-parser');
const session = require('express-session')

port = 5000;

// middleware 
app.use(express.json())
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))
app.listen(cookieParser("secret"))
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
    res.json({"users":["a","b"]})
})

app.use("/sign-up",require('./routes/signUp'))

app.post('/log-in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No user found");
        else{
            req.logIn(user, err => {
                if (err) throw err;
                res.send("successful login");
                console.log(req.user)
            });
        }
    })(req,res,next);
})