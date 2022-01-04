const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')

router.post('/',auth ,function(req, res) {
    res.send("endpoint for post request")

});

router.get('/',auth,async(req,res) => {
    res.send("endpoint for get request")

});

module.exports = router