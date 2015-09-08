module.exports = {
					facebook: {
					 clientID: process.env.FACEBOOK_APP_ID,
					 clientSecret: process.env.FACEBOOK_APP_SECRET,
					 callbackURL: process.env.FACEBOOK_REDIRECTURI
					},
					twitter: {
					 consumerKey: process.env.TWITTER_CONSUMER_KEY,
					 consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
					 callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
					}
