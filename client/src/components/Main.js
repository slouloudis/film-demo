import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard/MovieCard'
import Form from './Form/Form'



export default function Main() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies()
    },[])


    // READ
    async function getMovies() {
        let API = 'http://localhost:4242/movies'
        const result = await axios.get(API)
        console.log(result.data)
        setMovies(result.data)
    }

    // CREATE
    const handleAddMovie = async newMovieFormData => {
        const res = await axios.post('http://localhost:4242/movies', newMovieFormData)
        setMovies([...movies, res.data])
    }

    // delete Movie
    const handleDelete = async (id) => {
        console.log('clicked')
        const res = await axios.delete(`http://localhost:4242/movies/${id}`)
        console.log(res)
        getMovies()
    }

    // UPDATE

    const handleUpdateMovie = async (movie) => {
        await axios.put(`http://localhost:4242/movies/${movie._id}`, movie)
        getMovies();
    }

    // talk about HTTP Request structure -> 

  return (
    <div>
        <Form onSubmitFunc={handleAddMovie}/>
        <h3>This is my Main!</h3>
        <MovieCard movies={movies} handleDelete={handleDelete} handleUpdateMovie={handleUpdateMovie}/>
    </div>
  )
}
