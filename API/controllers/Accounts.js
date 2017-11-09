require('../models/Accounts');
var mongoose = require('mongoose'),
    Account = mongoose.model('Account');

var bcrypt = require('bcrypt');

module.exports = Accounts = {
    create: function(req, res, next){

        var accountModel = new Account({
            name: req.body.name,
            user: req.decoded.id
        });
        
        accountModel.save(function (err) {
            if (err) {
                var error = [];
                console.log(err)
                if (err.name == 'ValidationError') {
                    Object.entries(err.errors).forEach(function(val, key) {
                        error.push({field: val[0], message: val[1].message});
                    }, this);
                    return res.status(500).json(error)
                }
                if (err.name == 'MongoError' && err.code === 11000) {
                    return next(new Error('field must be unique'))
                }
            };
            res.json(accountModel);
        });
    },

    push: function(req, res, next){
        Account.findOneAndUpdate({ _id:req.query.id, user: req.decoded.id }, { $push : { mouvements: { price: req.body.price, title: req.body.title } } }, {new: true}, function (err, result) {
            if(result){
                return res.json(result)
            }
            return res.status(500).json({ success: false, message: 'Failed to save.' });
        });
    },

    getAccounts: function(req, res, next){
        var projection = (req.query.mvt === 'true') ? { mouvements: true , user: true, name: true} : {mouvements: false};
        Account.findOne({_id: req.query.id, user: req.decoded.id}, projection, function(err, result){
            if(result){
                return res.json(result)
            }
            return res.json({ success: false, message: 'Failed to get account.' });
        })
    },

    getAccountsForUser: function(req, res, next){
        Account.find({user: req.decoded.id}, function(err, result){
            if(result){
                return res.json(result)
            }
            return res.json({ success: false, message: 'Failed to get' });
        })
    }
};