var express = require('express');
var router = express.Router();
var {check, validationResult} = require('express-validator/check');

var Users = require('../controllers/Users');
require('../models/Users');
var mongoose = require('mongoose'),
	User = mongoose.model('User');

var validatorConf = [
	check('email')
		.exists().withMessage('email est requis')
		.isEmail().withMessage('email est mauvais')
		.trim()
		.custom(value => {
			return User.findOne({email: value}).exec()
				.then(user => (user === null))
		}).withMessage('Email est déjà utilisé'),
	check('password', 'passwords est requis et doit contenir au moins un nombre').matches(/\d/).trim(),
	check('lastname').exists().withMessage('lastname est requis').trim(),
	check('firstname').exists().withMessage('firstname est requis').trim(),
	check('city').exists().trim(),
	check('street').exists().trim(),
	check('postalCode').toInt().isLength({min: 5}).withMessage('postalcode est requis').trim(),
	check('isdn').exists().withMessage('le numéro isdn est requis (téléphone)').trim()
];


/* GET users listing. */
router.post('/', validatorConf, Users.create);

router.get('/:id', Users.get);

var validatorp = [
	check('email')
		.exists().withMessage('email est requis')
		.isEmail().withMessage('email est mauvais')
		.optional({nullable:true})
		.trim(),
	check('password', 'passwords est requis et doit contenir au moins un nombre').matches(/\d/).optional({nullable:true}).trim(),
	check('lastname').trim(),
	check('firstname').trim(),
	check('city').trim(),
	check('street').trim(),
	check('postalCode').toInt().isLength({min: 5}).withMessage('postalcode mauvais').optional({nullable:true}).trim(),
	check('isdn').trim()
];

router.put('/:id', validatorp, Users.update);

module.exports = router;
