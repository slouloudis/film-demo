// create our Movie schema. 

const mongoose = require('mongoose')

// what is this called? Destructring
const { Schema } = mongoose;

const movieSchema = new Schema({
  name: String,
  img_url: String,
  director: String,
  year: Number
})

//const Movie = mongoose.model('Movie', movieSchema) is creating a new Mongoose model named 'Movie', which is connected to the 'movies' collection in your MongoDB database, and represents documents structured according to movieSchema. This model can then be exported and used elsewhere in your application to interact with the 'movies' collection in your database.

//Creates a new instance of a model: The first argument to the function is a string that names the collection your model is for. Mongoose automatically looks for the plural, lower-cased version of your model name. In your case, the model is named 'Movie', so Mongoose will look for 'movies' collection in the database.

//Compiles a schema into a model: The second argument is a schema, which is an object that defines the shape of your documents within that collection. It provides the structure of the data you want to store, including field names and data types. In your case, a Movie schema has fields like name, img_url, director, and year.
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie