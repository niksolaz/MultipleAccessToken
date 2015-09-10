//saved info secret and database in bash
var Database = process.env.DATABASE_MODULUS;
var Secret = process.env.SECRET_MODULUS;

//export file
module.exports = {

    'secret': Secret,
    'database': Database,
    'oauth':{
        'facebook': {
		    'clientID': process.env.FACEBOOK_APP_ID,
		    'clientSecret': process.env.FACEBOOK_APP_SECRET,
		    'callbackURL': process.env.FACEBOOK_APP_REDIRECTURI
		},
		'twitter': {
		    'consumerKey': process.env.MAT_TWITTER_CONSUMER_KEY,
		    'consumerSecret': process.env.MAT_TWITTER_CONSUMER_SECRET,
		    'callbackURL': process.env.MAT_TWITTER_CALLBACK_URL
		}
    }
};