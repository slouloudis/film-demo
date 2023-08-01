import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard/MovieCard'
import Form from './Form/Form'


export default function Main() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    const res = await axios.get('http://localhost:4242/movies')
    console.log(res.data)
    setMovies(res.data)
  }

  const [formData, setFormData] = useState({
    name: '',
    img_url: '',
    director: '',
    year:'',
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
    console.log(formData)
  }

  const handleAddMovie = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:4242/movies', formData)
    console.log(res.data)
    setMovies([...movies, res.data])
  }

  // Create

  return (
    <div>
      <p>This is main!</p>
      <Form handleChange={handleChange} handleAddMovie={handleAddMovie}/>
      <MovieCard movies={movies}/>
    </div>
  )
}
