// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport = require('passport')
				, FacebookStrategy = require('passport-facebook').Strategy
				,TwitterStrategy = require('passport-twitter').Strategy;

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
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
		usarname:'admin',
		mail:'example@gmail.com',
		password:'admin'
		//admin:true
	});
	//save sample user
	sampleUser.save(function(err){
		if(err) throw err;

		console.log('User saved!!!!');
		res.json({success: true});
	});
});

//API Routes

var apiRoutes = express.Router();

apiRoutes.get('/',function(req,res){
	res.json({ message: 'Welcome to the API' });
});

apiRoutes.get('/users',function(req,res){
	User.find({},function(err,user){
		res.json(users);
	});
});

app.use('/api', apiRoutes);


app.listen(port);
console.log('Magic happens at http://localhost:'+ port);