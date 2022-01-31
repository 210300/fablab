const AdminStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const team = require('../model/team');

module.exports = function(passport) {
  passport.use(
    new AdminStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match team
      team.findOne({
        email: email
      }).then(user => {
 
        if (!team) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, team.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(team, done) {
    done(null, team.id);
  });

  passport.deserializeUser(function(id, done) {
    team.findById(id, function(err, team) {
      done(err, team);
    });
  });
};