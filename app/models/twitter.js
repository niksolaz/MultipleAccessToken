var passTwitter = require('passport-twitter');

//get  ID and secret key
var TWITTER_CONSUMER_KEY = process.env.TWITTER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_SECRET;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = twitter;