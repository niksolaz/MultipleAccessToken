// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport = require('passport')
				, LocalStrategy = require('passport-local').Strategy
				, FacebookStrategy = require('passport-facebook').Strategy
				,TwitterStrategy = require('passport-twitter').Strategy;

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var oauth = require('./oauth.js'); //get our oauth file 
var User   = require('./app/models/user'); // get our mongoose model
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//create sample user
app.get('/setup',function(req,res){

	var sampleUser= new User({
		username:'Nik Nolte',
		mail:'example@gmail.com',
		password:'password1',
		admin:true
	});
	console.log(sampleUser);
	//save sample user
	sampleUser.save(function(err,data){
		if(err) throw err;

		console.log('User saved!!!!');
		res.json({ success: true,
				   data: sampleUser
				});
	});
});

//login and autentication facebook

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: oauth.facebook.clientID,
    clientSecret: oauth.facebook.clientSecret,
    callbackURL: oauth.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'facebook.id':profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
//API Routes
// get an instance of the router for api routes
var apiRoutes = express.Router();
// route to show a random message (GET http://localhost:8080/api/)

apiRoutes.get('/', function(req, res){
	res.render('login', { user: req.user });
});

apiRoutes.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req, res){
});

apiRoutes.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/' }),
	function(req, res) {
	 res.redirect('/account');
});
apiRoutes.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


app.use('/api', apiRoutes);


app.listen(port);
console.log('Magic happens at http://localhost:'+ port);