import React from 'react'
import './MovieCards.css'
import Form from '../Form/Form'

export default function MovieCard({movies, handleDelete, handleUpdateMovie}) {

  return (
    <div>
        {movies.map(movie => {
            return (
                <div key={movie._id}>
                    <div>
                            {/* we're using two functions here -> anon callback, that callback invokes the handle delete. We're passing the movie id as our arugment to the handleDelete function */}
                        <p onClick={() => handleDelete(movie._id)}>X</p>
                        <h3>{movie.name}</h3>
                        <img src={movie.img_url} /> 
                        <p>{movie.director}, {movie.year}</p>
                    </div>
                    <Form onSubmitFunc={handleUpdateMovie} movie={movie}/> 
                </div>
            )
        })}
    </div>
  )
}
