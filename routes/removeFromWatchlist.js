const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')
const Movie = require('../models/movieSchema')

router.post('/',auth, async function(req, res) {
    const user = req.user
    //console.log(req.body)
    //console.log(user)
    await Movie.deleteOne({info:req.body.movie, email: user})
    res.status(200).json({msg:"movie has been saved"})
});

router.get('/',auth,async(req,res) => {
    res.send("endpoint for get request")

});

module.exports = router