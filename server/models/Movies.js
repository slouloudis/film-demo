const mongoose = require('mongoose')

const { Schema } = mongoose

const movieSchema = new Schema({
    name: String,
    img_url: String,
    director: String,
    year: Number
})

const Movie = mongoose.model('Movie', movieSchema)
// movies

module.exports = Movie