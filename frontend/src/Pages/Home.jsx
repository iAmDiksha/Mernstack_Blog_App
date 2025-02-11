import React from 'react'
import '../CSS/home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container'>
        <header>
            <div className='title'>
                <h1>Share & Discover: A Collaborative Blog Platform</h1>
                <p>A platform designed for both writers and readers to connect, share experiences, and broaden horizons. Discover the joy of collaboration in every post!</p>
            </div>
            <Link to="/blogs"><button>Explore Now</button></Link>
        </header>
    </div>
  )
}

export default Home
