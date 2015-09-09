// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    oauthID: String,
    facebookId: String,
    twitterId:String,
    username: String,
    name: String,
    mail: String, 
    password: String, 
    admin: Boolean
}));