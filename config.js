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
		}
    }
};