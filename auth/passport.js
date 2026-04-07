
const passport = require("passport");
const LocalStarategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
    new LocalStarategy({usernameField:"email"},async(email, password, done) => {
        try{
            const user = await User.findOne({email});
            if(!user) return done(null, false);
            const ok = await bcrypt.compare(password, user.passwordHash); // will return true or false
            if(!ok) return done(null, false);
            // here authentication is done the email and password is correct
            return done(null, user);
        }catch(err){
            return done(err);
        };
    })
);

// defining what will be stored in the session cookie

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async(id, done) => {
    try{
        const user = await User.findById(id).select("name");
        done(null, user);
    }catch(err){
        done(err);
    };
});

module.exports = passport;