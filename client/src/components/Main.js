import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard/MovieCard'


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

  return (
    <div>
      <p>This is main!</p>
      <MovieCard movies={movies}/>
    </div>
  )
}
