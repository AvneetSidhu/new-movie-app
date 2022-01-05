const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')
router.post('/', function (req, res) {
    res.send('post handler for get popular route');
});

router.get('/', auth, async (req, res) => {

    const id = req.headers.id
    const key = 'fbffa47f0e90d6fd133b0d6205b10e22'
    const apiCall = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
    axios.get(apiCall)
        .then((response) => {
            const toReturn = response.data
            //console.log(toReturn)
            res.json({ movie: toReturn })
        })
});

module.exports = router