import React, {useState} from 'react'

export default function Form({handleChange, handleAddMovie}) {

  return (
    <div>
      <form onSubmit={handleAddMovie}>
        <input name='name' placeholder='Movie Title' onChange={handleChange}></input>
        <input name='img_url' placeholder='Img URL'onChange={handleChange}></input>
        <input name='director' placeholder='Director'onChange={handleChange}></input>
        <input name='year' placeholder='Year'onChange={handleChange}></input>
        <button type='submit'>Add Movie</button>
      </form>
    </div>
  )
}
