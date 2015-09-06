var passport = require('passport-facebook');

//get  ID and secret key
var FACEBOOK_APP_ID = process.env.FACEBOOK_ID;
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_SECRET;

//use element key
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
module.exports = pass-facebook;