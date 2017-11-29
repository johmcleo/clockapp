var ClockMod = require('../models/todo');
module.require('./passportroutes.js');


function getClocks(res){
	ClockMod.find(function(err, clocks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(clocks); // return all labs in JSON format
		});
};

function getLabsbyarch(res,labarch){
	Lab.find({labarch: labarch,labstatus: 'Booked'}, function(err, labs) {
			if (err)
				res.send(err)
			res.json(labs); 
		});
};

function getLabsallbyarch(res,labarch,labuser){
	Lab.find({labarch: labarch,labstatus: 'Available'}, function(err, labs) {
			if (err)
				res.send(err)
			console.log(labs)
			res.json(labs); 
		});
};

function getClockbyomc(res,omc){
	ClockMod.find({omc: omc}, function(err, clocks) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(clocks); // return all todos in JSON format
		});
};

function getClockbyomcemail(res,omc,emailaddr){
	ClockMod.find({omc: omc}, function(err, clocks) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)
		res.json(clocks); // return all clocks in JSON format
	});
		
};

function getClockbyemail(res,emailaddr){
	ClockMod.find( { $or:[{email: emailaddr,omc: omc}]}, function(err, clocks) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (!clocks.length) {
			res.send(err)
			return
			  // return all clocks in JSON format
		}
		if (clocks[0].email = emailaddr) {
			console.log(clocks[0].email)
		 res.json(clocks)
		}
	});

};
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all labs
	app.get('/api/clocks', function(req, res) {

		// use mongoose to get all labs in the database
		getClocks(res);
	});

	app.get('/api/clocks/:omc', function(req, res) {
            omc = req.params.omc
			getClockbyomc(res,omc);
	});

	app.get('/api/clocks/:omc/:emailaddr', function(req, res) {
		omc = req.params.omc
		emailaddr = req.params.emailaddr
		getClockbyemail(res,emailaddr);		
	});

app.get('/api/labs/arch/:labarch', function(req, res) {
			labarch = req.params.labarch
			getLabsbyarch(res,labarch);
		});

app.get('/api/labs/arch/all/:labarch/:labuser', function(req, res) {
			labarch = req.params.labarch
			labuser = req.params.labuser
			getLabsallbyarch(res,labarch,labuser);
		});

	// api ---------------------------------------------------------------------
	// get all labs
	app.get('/api/uniquelabs', function(req, res) {

		// use mongoose to get all labs in the database
		getuniqueLabs(res);
	});

// create todo and send back all todos after creation
app.post('/api/labs', function(req, res) {
		// create a lab, information comes from AJAX request from Angular
		Lab.create({
			labname : req.body.labname,
			labtype : req.body.labtype,
			labarch : req.body.labarch,
			labstatus : req.body.labstatus,
			labuser : req.body.labuser,
			goldurl : req.body.goldurl,
			goldclassname : req.body.goldclassname,
			dcloudid : req.body.dcloudid,
			dclouduser : req.body.dclouduser,
			dcloudpass : req.body.dcloudpass,
            dcloudid: req.body.dcloudid,
            dclouduser: req.body.dclouduser,
            dcloudpass: req.body.dcloudpass,
            dcloudasa: req.body.dcloudasa,
            dcloudpubip: req.body.dcloudpubip,
            guacurl: req.body.guacurl,
			labguide: req.body.labguide,	
			done : false
		}, function(err, Lab) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getLabs(res);
		});

	});
	// create todo and send back all todos after creation
	app.post('/api/booklab', function(req, res) {
    var labname = req.body.labname;
	var labuser = req.body.labuser;
	var labstat = 'Booked';
Lab.findOneAndUpdate({labname: labname, labstatus: 'Available'},{labstatus : labstat ,labuser:labuser},function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
	getLabs(res);
});
			
		});
	// delete a lab
	app.delete('/api/labs/:lab_id', function(req, res) {
		Lab.remove({
			_id : req.params.lab_id
		}, function(err, Lab) {
			if (err)
				res.send(err);

			getLabs(res);
		});
	});

	
};