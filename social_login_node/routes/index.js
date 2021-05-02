const util = require('../middleware/utilities');
const config = require('../config');

var express = require('express');
var router = express.Router();

router.get('/', index);

function index (request, response) {
    response.render('index', {
        title: 'This.Index'
    });
}

module.exports = router;


