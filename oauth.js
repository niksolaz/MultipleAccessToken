module.exports = {
					facebook: {
					 'clientID': process.env.FACEBOOK_MAT_ID,
					 'clientSecret': process.env.FACEBOOK_MAT_SECRET,
					 'callbackURL': process.env.FACEBOOK_MAT_REDIRECTURI
					},
					twitter: {
					 'consumerKey': process.env.MAT_TWITTER_CONSUMER_KEY,
					 'consumerSecret': process.env.MAT_TWITTER_CONSUMER_SECRET,
					 'callbackURL': process.env.MAT_TWITTER_CALLBACK_URL
					}

				}