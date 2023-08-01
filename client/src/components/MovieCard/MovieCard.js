import React from 'react'
import './MovieCards.css'

export default function MovieCard({movies, handleDelete}) {

  return (
    <div>
        {movies.map(movie => {
            return (
                <div key={movie._id}>
                    <div>
                        <p onClick={() => handleDelete(movie._id)}>X</p>
                        <h3>{movie.name}</h3>
                        <img src={movie.img_url} /> 
                        <p>{movie.director}, {movie.year}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
