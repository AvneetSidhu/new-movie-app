const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    info: {
        type: Object, 
        required: true
    },
    date:{
        type: String, 
        required: true
    }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;