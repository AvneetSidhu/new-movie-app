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
    const tokenToSend = req.headers.token

    const movieIDs= []
    const toReturn = []
    const movieObjects = await Movie.find({email: req.user})
    movieObjects.forEach(element => {
        movieIDs.push(element.movieID)
    })
    movieIDs.forEach(Mid => {
        axios.get("/get-movie-by-id",{headers:{token: tokenToSend, id:Mid}})
        .then(data => console.log(data))
    })
    console.log(toReturn)
    res.json({movies: toReturn})
});

module.exports = router