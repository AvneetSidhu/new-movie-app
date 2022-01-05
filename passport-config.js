const LocalStrategy = require('passport-local').Strategy
const User = require('./models/usrSchema')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const exUser = await User.findOne({ email: email });
                    if (exUser) {
                        const result = await bcrypt.compare(password, exUser.password);
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, { message: 'incorrect password.' });
                        }
                    } else {
                        done(null, false, { message: 'user not found.' });
                    }
                } catch (err) {
                    console.error(err);
                    done(err);
                }
            }
        ),

    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        })
    })

};