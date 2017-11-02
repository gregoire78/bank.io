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

            userModel.firstname = user.firstname;
            userModel.lastname = user.lastname;
            userModel.email = user.email;
            userModel.password = hash;
            userModel.address.city = user.city;
            userModel.address.street = user.street;
            userModel.address.postal_code = user.postalCode;
            userModel.isdn = user.isdn;

            userModel.save(function (err) {
                if (err) return next(err);
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
                isdn: user.isdn,
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
        var errors = validationResult(req);

        /*if (req.body.email) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (user._id.toString() !== id.toString()) {
                    error = `email ${req.body.email} existe déjà`;
                }
            })
        }*/
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(422).json('rien a mettre à jour')
        }


        User.findByIdAndUpdate(id, req.body, {new: true}, function (err, user) {
            res.json({'updated': user})
        });
    }
};