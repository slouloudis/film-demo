const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

Movie = require('./models/Movies')
const app = express()

app.use(cors())
// students would have used bodypaser
app.use(express.json())
dotenv.config()

const PORT = process.env.PORT || 4242;

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('DB connected!'))

// root endpoint
app.get('/', (req,res) => res.status(200).send(`Whoa, you've made it!`))

// CRUD : READ

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find(req.query)
    res.status(200).json(movies)
  } catch (err) {
    console.log(err)
    res.status(404).json(err)
  }
})

app.listen(PORT, () => console.log(`ଘ(੭*ˊᵕˋ)੭* ̀ˋ ɪɴᴛᴇʀɴᴇᴛ on port: ${PORT}`))