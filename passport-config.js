const LocalStrategy = require('passport-local').Strategy
const User = require('./models/usrSchema')
const bcrypt = require('bcrypt')

function initialize(passport){
    const authenticateUser = async (email, password, done) => {
        let user = await User.findOne({email});
        if(user == null){
            return done(null, false, {message: "no user with that email"})
        }

        try{
            if (await bcrypt.compare(password, user.password)) {
                console.log("login Success")
                return done(null, user)
            } else {
                 return done(null, false, {message: "incorrect password"})
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, 
    authenticateUser))

    passport.serializeUser((user, done) => { })
    passport.deserializeUser((user, done) => { })
}

module.exports = initialize