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
