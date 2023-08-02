import React, {useState} from 'react'

export default function Form({onSubmitFunc , movie}) {
  const [formData, setFormData] = useState(movie ?? {
    name: '',
    img_url: '',
    director: '',
    year: '',
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
    console.log(formData)
  }

  // use this to handle different functions using whatever was passed to the prop
  const submit = event => {
    event.preventDefault()
    onSubmitFunc(formData)
  }


  return (
    <div>
      <form onSubmit={submit}>
        <input placeholder='movie name' onChange={handleChange} name='name' value={formData.name}></input>
        <input placeholder='img url' onChange={handleChange} name='img_url' value={formData.img_url}></input>
        <input placeholder='director' onChange={handleChange} name='director' value={formData.director}></input>
        <input placeholder='year' onChange={handleChange} name='year' value={formData.year}></input>
        <button type='submit'>{movie ? 'Update' : 'Add Movie'}</button>
      </form>
    </div>
  )
}

// ```javascript
// ```