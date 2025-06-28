import React from 'react'
import Layout from './components/Layout'
import { Home, About, Services, Contact } from './sections'
import './App.css'

function App() {
  return (
    <Layout>
      <div className="app-container">
        <Home />
        <About />
        <Services />
        <Contact />
      </div>
    </Layout>
  )
}

export default App
