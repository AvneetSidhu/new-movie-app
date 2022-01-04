const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')
const Movie = require('../models/movieSchema') 

router.post('/',auth ,function(req, res) {
    res.send("endpoint for post get watchlist")

});

router.get('/',auth,async(req,res) => {
    const movies= []
 
    const movieObjects = await Movie.find({email: req.user})
    movieObjects.forEach(element => {
        movies.push(element)
    })
 
    res.json({movies: movies})
});

module.exports = router