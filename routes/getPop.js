const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')
router.post('/', function(req, res) {
    res.send('post handler for get popular route');
});

router.get('/',auth,async(req,res) => {
    const key = 'fbffa47f0e90d6fd133b0d6205b10e22'
    const apiCall = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    axios.get(apiCall)
    .then((response) => {
        const toReturn = []
        for(let i = 0; i < 10; i++){
            toReturn.push(response.data.results[i])
        }

        res.json({movies:toReturn})
    })
});

module.exports = router