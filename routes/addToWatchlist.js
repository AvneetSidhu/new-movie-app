const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')
const Movie = require('../models/movieSchema')

router.post('/',auth, async function(req, res) {

    const movie = new Movie ({
        id: req.body.movie.id,
        email: req.user,
        info: req.body.movie,
        date: Date.now().toString()
    })
    
    await movie.save()
    console.log("movie saved");
    res.status(200).json({msg:"movie has been saved"})
});

router.get('/',auth,async(req,res) => {
    res.send("endpoint for get request")

});

module.exports = router
