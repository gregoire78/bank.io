var mongoose = require('mongoose'), // Nous appelons le module mongoose
	Schema = mongoose.Schema; // Nous créons un schéma mongoose

var UserSchema = new Schema({
	lastname: {type: String},
	firstname: {type: String},
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: {type: String},
    isdn: {type: String},
	address: {
		city: {type: String},
		street: {type: String},
		postal_code: {type: Number}
	}
});

var User = mongoose.model('User', UserSchema, 'users');
exports.model = User;