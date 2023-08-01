import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard/MovieCard'
import Form from './Form/Form'



export default function Main() {
    const [formData, setFormData] = useState({
        name: '',
        img_url: '',
        director: '',
        year: ''
    })

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

    // Dealing with FORM DATA
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
        console.log(formData)
    }

    // CREATE
    const handleAddMovie = async event => {
        event.preventDefault()
        const res = await axios.post('http://localhost:4242/movies', formData)
        setMovies([...movies, res.data])
    }

    // delete Movie
    const handleDelete = async (id) => {
        console.log('clicked')
        const res = await axios.delete(`http://localhost:4242/movies/${id}`)
        console.log(res)
        getMovies()
    }

    // talk about HTTP Request structure -> 

  return (
    <div>
        <Form handleChange={handleChange} handleAddMovie={handleAddMovie}/>
        <h3>This is my Main!</h3>
        <MovieCard movies={movies} handleDelete={handleDelete}/>
    </div>
  )
}
