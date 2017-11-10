var express = require('express');
var router = express.Router();

var Users = require('../controllers/Users');
var Jwt = require('jsonwebtoken');

require('../models/Users');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var tokenAuth = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['Authorization'] || (req.get('authorization') ? req.get('authorization').split('Bearer ')[1] : false);
    if (token) {
        Jwt.verify(token, 'cresus', function(err, decoded) {
            if (err) {
                return res.satus(401).json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}

/* GET users listing. */
router.post('/', Users.create);

router.get('/', tokenAuth, Users.get);

router.patch('/', tokenAuth, Users.update);

router.post('/authenticate', Users.authenticate);

module.exports = router;
