require('../models/Users');
var mongoose = require('mongoose'),
	User = mongoose.model('User');
var {check, validationResult} = require('express-validator/check');
var {matchedData, sanitize} = require('express-validator/filter');
var bcrypt = require('bcrypt');

module.exports = Users = {
	create: function (req, res, next) {
		var errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.mapped()});
		}

		var user = matchedData(req);

		bcrypt.hash(user.password, 10).then(function (hash) {

			var userModel = new User();

			userModel.firstName = user.firstname;
			userModel.lastName = user.lastname;
			userModel.email = user.email;
			userModel.password = hash;
			userModel.address.city = user.address.city;
			userModel.address.street = user.address.street;
			userModel.address.postal_code = user.address.postalCode;

			userModel.save(function (err) {
				if (err) return next(err);
				res.json('Successfully register a new user');
			});
		});
	}
};