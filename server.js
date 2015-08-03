// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose');
mongoose.set('debug', true)					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// routes ======================================================================
require('./app/routes.js')(app);



//Want to create predeftodos and save them in database if they do not exist
//Want to update each todolist with predeftodos once a week

/*var CronJob = require('cron').CronJob;
var job = new CronJob(new Date(), function() {
  /* runs once at the specified date. */
  /*}, function () {
    /* This function is executed when the job stops */
  /*},
  true, /* Start the job right now */
  //timeZone /* Time zone of this job. */
//);
//var time = false;
//var Predeftodolist = require('./app/models/todolist');

//Predeftodolist.remove().exec();
/*if(time){

//Try to retrieve predeftodo, if they do not exist - create array of predeftodos?
bathroomtodos = new Predeftodolist();

FBFriendModel.remove().exec();
bathroomtodos.update({duedate: new Date(), weekly: true, text: "Noe badete", text: "Enda mer badete", text: "Mest badete"});
bathroomtodos.save(function (err) {
  if (!err) console.log('Success!');
  	console.log(bathroomtodos);
});
};*/

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
