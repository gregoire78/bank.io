require('../models/Users');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ValidationError = mongoose.Error.ValidationError,
    ValidatorError  = mongoose.Error.ValidatorError;

var bcrypt = require('bcrypt');
var Jwt = require('jsonwebtoken');

module.exports = Users = {
    create: function (req, res, next) {

        var user = req.body;

        if(!user.password){
            return res.json('rien');
        }
        bcrypt.hash(user.password, 10).then(function (hash) {

            var userModel = new User({
                firstname : user.firstname,
                lastname : user.lastname,
                email: user.email,
                password : hash,
                address:{
                    city: user.city,
                    street: user.street,
                    postal_code: user.postal_code
                },
                msisdn: user.msisdn
            });

            userModel.save(function (err) {
                if (err) {
                    var error = [];
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
                res.json('Successfully register a new user');
            });
        });
    },

    get: function (req, res, next) {
        User.findById(req.decoded.id, function (err, user) {
            var userModel = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                msisdn: user.msisdn,
                address: {
                    city: user.address.city,
                    street: user.address.street,
                    postal_code: user.address.postal_code
                }
            };
            res.json(userModel);
        })
    },

    update: function (req, res, next) {
        var id = req.decoded.id;

        /*if (req.body.email) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (user._id.toString() !== id.toString()) {
                    error = `email ${req.body.email} existe déjà`;
                }
            })
        }*/
        if (Object.keys(req.body).length === 0) {
            return res.status(406).json('rien a mettre à jour')
        }
        console.log(req.body)
      
        User.findByIdAndUpdate(id, req.body, {runValidators : true, new: true, context: 'query'}, function (err, user) {
            if (err) {
                var error = [];
                if (err.name == 'ValidationError') {
                    Object.entries(err.errors).forEach(function(val, key) {
                        error.push({field: val[0], message: val[1].message});
                    }, this);
                    return res.status(500).json(error)
                };
            };
            res.json({'updated': user})
        });
    },

    authenticate: function (req, res, next) {
        var errorBody=[];
        if (!req.body.email) errorBody.push({field: 'email', message: 'paramètre email manquants'});
        if (!req.body.password) errorBody.push({field: 'password', message: 'paramètre paswword manquants'});
        if (errorBody.length){
            return res.status(406).json(errorBody)
        }
        
        User.findOne({email: req.body.email}, function(err, user){
            if(user){
                bcrypt.compare(req.body.password, user.password).then(function(data) {
                    if(data === true){
                        var tokenData = {
                            email: user.email,
                            id: user._id
                        };
                        var result = Jwt.sign(tokenData, 'cresus');
                        
                        return res.json({token: result})
                    } else {
                        return res.status(404).json({field: 'password', message: 'user not found'})
                    }
                });
            } else {
                return res.status(404).json({field: 'email', message: 'user not found'})
            }
        })
    }
};