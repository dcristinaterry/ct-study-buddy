var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var CookieStrategy = require("passport-cookie");

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password  
passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  // passReqToCallback: true
  // Our user will sign in using an email
  function (email, password, done) {
    // When a user tries to sign in this code runs
    console.log(email)
    console.log(password)
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        console.log("Incorrect email")
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log("Incorrect pass")
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.use(new CookieStrategy(
  function(token, done) {
    User.findByToken({ token: token }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));


// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Exporting our configured passport
module.exports = passport;