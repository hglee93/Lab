const util = require('../middleware/utilities')
var express = require('express');
var router = express.Router();

function stock (request, response) {
    console.log('stock CALL');
    response.json({
        'result': 'true',
        'status': '200',
        'route': 'stock'
    })
}

router.get('/', [util.requireAuthentication], stock);

module.exports = router;