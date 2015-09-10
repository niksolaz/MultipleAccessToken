// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var path 		= require('path');
var fs 			= require('fs');
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
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

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
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
    callbackURL: config.oauth.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    	process.nextTick(function () {
   		return done(null, profile);
    });
  }
));
passport.use(new TwitterStrategy({
	 consumerKey: config.oauth.twitter.consumerKey,
	 consumerSecret: config.oauth.twitter.consumerSecret,
	 callbackURL: config.oauth.twitter.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
 		process.nextTick(function () {
   		return done(null, profile);
 	});
  }
));

//Routes
app.get('/', function(req,res){
	res.render('index',{title:'MAT',message:'Hello!'});
});
app.get('/account', ensureAuthenticated, function(req, res){
res.render('account', { user: req.user });
});
app.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req, res){
});
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/' }),
	function(req, res) {
	 res.redirect('/account');
});
app.get('/auth/twitter',
	passport.authenticate('twitter'),
	function(req, res){
});
app.get('/auth/twitter/callback',
	passport.authenticate('twitter', { failureRedirect: '/' }),
	function(req, res) {
	 res.redirect('/account');
});
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


app.listen(port);
console.log('Magic happens at http://localhost:'+ port);

// test authentication
function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}