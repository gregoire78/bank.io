require('../models/Users');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ValidationError = mongoose.Error.ValidationError,
    ValidatorError  = mongoose.Error.ValidatorError;

var bcrypt = require('bcrypt');

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
                    console.log('Error Inserting New Data', err);
                    if (err.name == 'ValidationError') {
                        Object.entries(err.errors).forEach(function(val, key) {
                            error.push({field: val[0], message: val[1].message});
                            console.log(val);
                        }, this);
                        return res.json(error)
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
        User.findById(req.params.id, function (err, user) {
            if (!user) {
                return res.status(406).json('id érroné ou manquant');
            }

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
        var id = req.params.id;

        /*if (req.body.email) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (user._id.toString() !== id.toString()) {
                    error = `email ${req.body.email} existe déjà`;
                }
            })
        }*/
        if (Object.keys(req.body).length === 0) {
            return res.status(422).json('rien a mettre à jour')
        }


        User.findByIdAndUpdate(id, req.body, {new: true}, function (err, user) {
            res.json({'updated': user})
        });
    }
};