import React, {useState, useEffect} from 'react'
//import {BrowserRouter, Route, Switch} from 'react-router-dom'
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


  const handleAddMovie = async (newMovieFormData) => {
    const res = await axios.post('http://localhost:4242/movies', newMovieFormData)
    console.log(res.data)
    setMovies([...movies, res.data])
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4242/movies/${id}`)
    getMovies()
}

  // update 

  const handleUpdateMovie = async (movie) => {
    await axios.put(`http://localhost:4242/movies/${movie._id}`, movie)
    getMovies();
  }

  return (
    <div>
      <p>This is main!</p>
      <Form onSubmitFunc={handleAddMovie}/>
      <MovieCard movies={movies} handleDelete={handleDelete} handleUpdateMovie={handleUpdateMovie}/>
    </div>
  )
}
