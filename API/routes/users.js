var express = require('express');
var router = express.Router();

var Users = require('../controllers/Users');


/* GET users listing. */
router.post('/', Users.create);

router.get('/:id', Users.get);

router.put('/:id', Users.update);

module.exports = router;
