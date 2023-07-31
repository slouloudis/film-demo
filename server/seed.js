const mongoose = require('mongoose')
require('dotenv').config();

const Movie = require('./models/Movies')

mongoose.connect(process.env.DATABASE_URL)

async function seed() {
  await Movie.create({
    name: 'Primer',
    img_url: 'https://m.media-amazon.com/images/M/MV5BNjc3OWVjMTItYjc0Yi00NmFlLTk2YTgtYmU0MzcxMjBkNTYxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    director: 'Shane Carruth',
    year: 2004
  })
  console.log('created a new movie!')
  mongoose.disconnect();
}

seed();
