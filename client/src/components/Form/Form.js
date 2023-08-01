import React from 'react'

export default function Form({handleChange, handleAddMovie}) {
  return (
    <div>
      <form onSubmit={handleAddMovie}>
        <input placeholder='movie name' onChange={handleChange} name='name'></input>
        <input placeholder='img url' onChange={handleChange} name='img_url'></input>
        <input placeholder='director' onChange={handleChange} name='director'></input>
        <input placeholder='year' onChange={handleChange} name='year'></input>
        <button type='submit'>Add Movie</button>
      </form>
    </div>
  )
}
