// import all our stuff
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Movie = require('./models/Movies')
const bp = require('body-parser')


const app = express(); 
app.use(cors())
// the same as using body-parser
app.use(bp.json())
//app.use(express.json({strict: false}))
//app.use(express.urlencoded())

// connect to mongoDB database
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('DB Connected'))

const PORT = process.env.PORT || 4242


// set up basic endpoint
app.get('/', (request, response) => {
    response.status(200).json({welcome: "You've made it!"})
})

// CRUD: READ:

app.get('/movies', async (request,response) => {
    try {
        const movies = await Movie.find(request.query)
        response.status(200).json(movies)
    } catch (err) {
        console.log(err)
        response.status(404).json(err)
    }
})

// CRUD : Create 
app.post('/movies', async(request, response) => {
    try {
        const newMovie = await Movie.create(request.body)
        response.status(200).json(newMovie)
    } catch (error) {
        response.status(500).json(error)
    }
})

// CRUD: DELETE

app.delete('/movies/:id' , async (request, response) => {
    console.log(request)
    try {
        const id = request.params.id;
        console.log(id)
        const deletedMovie = await Movie.findByIdAndDelete(id)
        response.status(200).json(deletedMovie)
    } catch (err) {
        response.status(500).json(err)
    }
})
// listening to port 

app.listen(PORT, () => console.log(`summoning a server on ヽ(｀Д´)⊃━☆ﾟ. * ･ ｡ﾟ  PORT: ${PORT}`))