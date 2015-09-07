var ids = {
facebook: {
 clientID: process.env.FACEBOOK_APPID,
 clientSecret: process.env.FACEBOOK_APPSECRET,
 callbackURL: 'http://127.0.0.1:8080/auth/facebook/callback'
},
twitter: {
 consumerKey: process.env.TWITTER_CONSUMER_KEY,
 consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
 callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
}
module.exports = ids