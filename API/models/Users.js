var mongoose = require('mongoose'), // Nous appelons le module mongoose
	Schema = mongoose.Schema; // Nous créons un schéma mongoose
var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
	lastname: {type: String, required: "{PATH} est manquant"},
	firstname: {type: String, required: "{PATH} est manquant"},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: '{PATH} est manquant',
		validate: [(value)=>validator.isEmail(value), '{PATH} est invalide']
	},
	password: {type: String},
	msisdn: {type: String},
	creation_date:{type: Date, default: Date.now},
	address: {
		city: {type: String},
		street: {type: String},
		postal_code: {type: Number}
	}
});

/*function isValidEmail (email) {
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(email);
}*/

//shema custom message for unique
UserSchema.plugin(uniqueValidator, { message: '{PATH} existe déjà' });
var User = mongoose.model('User', UserSchema, 'users');

exports.model = User;