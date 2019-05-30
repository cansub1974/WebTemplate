var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});



//userSchema.plugin(findOrCreate);

//<-------------------LOCAL STRATEGY---------------------------//

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({
        min: 4
    });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'Email is already in use.'
            });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'No user found.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Wrong password.'
            });
        }
        return done(null, user);
    });
}));

//-----------------------GOOGLE STRATEGY--------------------------//
passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/user/google/index',
            //callbackURL: 'https://webtemplatemckay.herokuapp.com/user/google/index',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    password: profile.id,
                    familyName: profile.name.familyName,
                    firstName: profile.name.givenName,
                    imagePath: profile.photos[0].value
                },
                function (err, user) {
                    return cb(err, user);
                }
            );
        }
    )
);