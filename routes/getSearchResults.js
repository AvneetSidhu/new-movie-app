const { default: axios } = require('axios');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const auth = require('../middleware/auth')

router.post('/', function (req, res) {
    res.send('post handler for get search route');
});

router.get('/', auth, async (req, res) => {
    const id = req.headers.id
    const key = 'fbffa47f0e90d6fd133b0d6205b10e22'
    const query = req.headers.query
    const apiCall = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`

    if (req.headers.query.replace(/\s/gm, '').length > 0) { 
        await axios.get(apiCall)
            .then((response) => {
                const toReturn = []
                for (let i = 0; i < 20 && i < response.data.results.length; i++) {
                    toReturn.push(response.data.results[i])
                }

                res.json({ movies: toReturn })
            }).catch(err => console.log(err))
    }
    else {
        res.json({movies: []})
    }

});

module.exports = router