import React from 'react'
import './MovieCard.css'

export default function MovieCard({movies}) {
  return (
    <div>
      {movies.map(movie => {
        return (
          <div key={movie.id}>
            <div className='flex--container'>
              <h3>{movie.name}</h3>
              <img src={movie.img_url}></img>
              <p>{movie.director}, {movie.year}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
