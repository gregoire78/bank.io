var mongoose = require('mongoose'), // Nous appelons le module mongoose
Schema = mongoose.Schema; // Nous créons un schéma mongoose

var AccountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    name: {type: String, required: true},
    mouvements:[
        {
            price: {type: Number}, 
            title: {type: String},
            date: {type: Date, default: Date.now}
        }
    ]
});

var Account = mongoose.model('Account', AccountSchema, 'accounts');
exports.model = Account;