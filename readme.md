
# NOTES-CRUD

Overview of Today. 

We're going to finish our CRUD app by adding the ability to update the information of our card. 

(Talk through what we did yesterday. Walk through the form logic again ect.)

## Server side. 

Lets add another endpoint 
```javascript
app.put('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).send();
    } catch (err) {
        res.send(err)
    }
  });
```

First, lets try to understand this part `app.put('/movies/:id', async (req, res) => {...})` method is an Express route handler for handling HTTP PUT requests made to the '/movies/:id' path. 
The `:id` is a route parameter, a placeholder for the actual ID of the movie we want to update. 

When a put request is made to this endpoint, the anonymous async function provided as the second argument is invoked. This function takes two arguments 'req' (short for request) and 'res' (short for response). The names req/request and res/response are arbitrary. We could name them anything we want -> But they will always represent the request and response objects. 

The 'req' object is an instance of 'http.IncomingMessage` (don't worry about this too much lol)` and it has many useful properties and methods. 

==Some properties we've been using are req.params , req.body and req.query.== 


- `req.body` is an object that contains the body of the HTTP request. It's typically used with POST or PUT requests where data is sent to the server in the body of the request.

Assume you're updating a movie's details. The client might send a PUT request with this body:

```javascript 
{
  "title": "Updated Movie Title",
  "img_url": "Foo",
  "director": "Bar",
  "year": 2023
}
```

This would arrive in our Express application as `req.body`, which we can use directly to update the movie in our database. Thus, in our `Movie.findByIdAndUpdate(req.params.id, req.body)` call, `req.body` is effectively replacing with `{ "title": "Updated Movie Title", "genre": "Drama", "year": 2023 }`.


- `req.params` is an object that contains properties mapped to the named route parameters. For example, if you have the route `/movies/:id`, then the `id` in `:id` is a named route parameter, and you can access its value using `req.params.id`. If a GET request is made to `/movies/123`, then `req.params` would be:
```javascript
{
  id: '123'
}
```

Here, '123' is the actual ID of the movie, which is used to find and update the movie in the database. So, in the context of your given Express route, when you do `Movie.findByIdAndUpdate(req.params.id, req.body)`, you're really doing something like `Movie.findByIdAndUpdate('123', req.body)` if '123' is the ID that was passed in the URL.

Now, lets look at the code inside our async function :

```javascript
await Movie.findByIdAndUpdate(req.params.id, req.body)
```

Movie is a mongoose model representing movies stores in our MongoDB Database. 

The `findByIdAndUpdate()` function is a Mongoose function that finds a document by its ID and updates it with the new values. It takes two arguments: the ID of the document to update (here, it's the movie ID we got from `req.params.id`), and an object with the new data for the document (here, it's the parsed JSON body of the request).

Finally, we send our HTTP status code, and a 204 is a status code that means "No Content", indicating that the request was successful but there's no representation to return (i.e., the response is intentionally empty). Someone using our API later won't try and use the data we're returning when we don't intend for them to use it. Our client will handle updating the movies displayed so they match our database. 

We still need to use the send method so we can actually send a response back, even if its nothing. If we just do res.status(204), our request wont ever actually finish, and our getMovies() function later one wont run and update our page. 

```javascript
app.put('/movies/:id', async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body);
  res.status(204).send();
});
```

Alternatively, we could still return the updatedMovie if you want to. 
We're saying - 200-OK, and here's some json to send back. In my case, I'm never going to use that data, so I won't return it, but there are many use cases were you would want to - like in our GET/READ endpoint. 

```javascript
const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body)
res.status(200).json(updateMovie)
```

## Front End 

Let's start by refactoring our code a little. I'm going to move some of the logic we wrote earlier back into our Form component. 

-> Let's create a new function called handleUpdateMovie.js

```javascript
const handleUpdateMovie.js = async (movie) => {
	await axios.put(`http://localhost4242/movies/${movie._id}`, movie)
	getMovies();
}
```

- like with our delete, we're using the movies ID to send the put request to the correct endpoint
- We're also passing the movie object -> this had the data of the card we've clicked on. Our server will use this later.

Now, we're faced with a problem. We need some kind of form to update our movie with. But we already have one that is adding our movies - plus, it has all the same parameters we need for the update. Lets try and make the component reusable. 

To start with, lets stick another Form component in the MovieCard.js file. We want a new form for each of our movies. We're now getting a new form for each of the movies on our page, but right now all they would do is add another movie. 

So what we really want to do is pass a different onSubmit function to the form depending on where is is being called - IE the ADD form in our Main.js vs the Update form in our MovieCard.js

----------------------

I'm going to start by cleaning up some of our code - right now, we have our form being built outside in Main.js. Lets move our formData useState, and our handleChange function into the form, where it makes more sense for them to be. 

- Remember to import useState 
- we can remove importing the handleChange function as a prop, seeing as we've moved it inside the component. 

```javascript
import React, {useState} from 'react'

export default function Form({handleAddMovie}) {
  const [formData, setFormData] = useState({
    name: '',
    img_url: '',
    director: '',
    year:'',
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
    console.log(formData)
  }


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
```


Now, if we run our page, we're doing to get an error because our handleAddMovie was relying on the formData. And we still havn't used our handleUpdateMovie function. Instead of passing a function directly -
```javascript
// lets update our Form component in Main.js from this - 
<Form handleAddMovie={handleAddMovie}/>
// to this: 
<Form onSubmitFunc={handleAddMovie}/>
```

And then update the destructor to this 
```javascript
export default function Form({onSubmitFunc})
```

I'm then going to write another 'helper' function called submit that will handle our function invocations for whichever value was passed to the onSubmitFunc prop. 

```javascript
  // use this to handle different functions using whatever was passed to the prop
  const submit = event => {
    event.preventDefault()
    onSubmitFunc(formData)
  }
```

And then update our form so onSubmit calls the submit function

```javascript
<form onSubmit={submit}>
```

Then we need to update our handleAddMovie function from this 

```javascript
  const handleAddMovie = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:4242/movies', formData)
    console.log(res.data)
    setMovies([...movies, res.data])
  }
```

To this - 
```javascript
  const handleAddMovie = async (newMovieFormData) => {
    const res = await axios.post('http://localhost:4242/movies', newMovieFormData)
    console.log(res.data)
    setMovies([...movies, res.data])
  }
```

We no longer need to preventDefault, because our submit function is doing that. newMovieFormData, here, represents our formData that is passed when we invoke the function in our submit function. 

Lets update some things in our MovieCard.js

```javascript
MovieCard({movies, handleDelete, handleUpdateMovie})
// AND
<Form onSubmit={handleUpdateMovie}/>
```

And in Main.js
```javascript
<MovieCard movies={movies} handleDelete={handleDelete} handleUpdateMovie={handleUpdateMovie}/>
```

If we try to run this now, we're going to get a 404 error, because our handleUpdateMovie function is expecting to have the movies ID. Thankfully, we can use our form to set the value to be the movie we're updating!

1. In our MovieCard.js update the Form component like this `<Form onSubmit={handleUpdateMovie} movie={movie}/>` to pass the movie as a prop. The 'movie' is coming from our .map
2. Destructur this in our form component `Form({onSubmitFunc , movie})`

3. This next part is going to be weird looking. We need to change how our form useState works, so if a movie has been provided - like in our MovieCard.js, it will set our form to be that data. We're going to use something called the nullish coalescing operator. 
```javascript
  const [formData, setFormData] = useState(movie ?? {
    name: '',
    img_url: '',
    director: '',
    year: '',
  })
```

The initial value of `formData` depends on the `movie` prop. If the `movie` prop is present and defined, `formData` will be initialized with the `movie` object. However, if the `movie` prop is undefined or null, `formData` will be set to a new object, containing properties for `name`, `img_url`, `director`, and `year`, all initialized with empty strings. This behaviour is governed by the nullish coalescing operator (`??`), which selects the first operand if it is neither null nor undefined, else it chooses the second operand.

If a movie prop is passed, we now have access to the properties of the movie that invoked the Form.js component, as it's being set in our formData

We should update our form JSX so it looks like this -> 

```javascript
    <div>
      <form onSubmit={submit}>
        <input placeholder='movie name' onChange={handleChange} name='name' value={formData.name}></input>
        <input placeholder='img url' onChange={handleChange} name='img_url' value={formData.img_url}></input>
        <input placeholder='director' onChange={handleChange} name='director' value={formData.director}></input>
        <input placeholder='year' onChange={handleChange} name='year' value={formData.year}></input>
        <button type='submit'>Add Movie</button>
      </form>
    </div>
```

If look at our react code now, all the forms under the movies should show the correct details for that movie now. 

To be fancy, lets add a ternary operator to our button. 

```javascript
<button type='submit'>{movie ? 'Update' : 'Add Movie'}</button>
```

And our app is now working! :)

We've finished all the crud operations! Well done. 


## React router quick demo -> 

### install react-router dom

`npm install react-router-dom`


In my components folder, I'm going to create a new component called LandingPage.js

```javascript
import React from 'react'

export default function LandingPage() {
  return (
    <div>
      <h2>This is my landing page</h2>
      <button>Go to the collection</button>
    </div>
  )
}
```

Then update our App.js to look like this: 
```javascript
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/collection' element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

now if we vist localhost:3000/ we will get the landing page,
and if we visit localhost:3000/collection, we will get the main component. 

Finally, lets add a button to go to our /collection page

```javascript
import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <h2>This is my landing page</h2>
      <button><Link to='/collection'>Go to movies</Link></button>
    </div>
  )
}
```







