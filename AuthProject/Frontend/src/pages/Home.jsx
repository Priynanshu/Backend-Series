import React from 'react'
import Hero from './Hero'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <div className="pt-16">
        <Hero />
      </div>
    </div>
  )
}

export default Home