var express = require('express');
var router = express.Router();
var {check, validationResult} = require('express-validator/check');
var {matchedData, sanitize} = require('express-validator/filter');

var Users = require('../controllers/Users');
require('../models/Users');
var mongoose = require('mongoose'),
	User = mongoose.model('User');

/* GET users listing. */
router.post('/', [
	check('email')
		.exists().withMessage('email est requis')
		.isEmail().withMessage('email est mauvais')
		.trim()
		.custom(value => {
			return User.findOne({email: value}).exec()
				.then(user => (user === null))
		}).withMessage('Email est déjà utilisé'),
	check('password', 'passwords est requis et doit contenir au moins un nombre').matches(/\d/).trim(),
	check('lastname').exists().withMessage('lastName est requis').trim(),
	check('firstname').exists().withMessage('firstName est requis').trim(),
	check('address.city').exists().trim(),
	check('address.street').exists().trim(),
	check('address.postalCode').toInt().isLength({min: 5}).withMessage('postalcode est requis').trim(),

], Users.create);

module.exports = router;
