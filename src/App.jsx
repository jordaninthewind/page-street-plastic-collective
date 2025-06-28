import { CssBaseline } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'

import { Layout } from './components'
import { About, Contact, Home, Models, Projects } from './sections'

import './App.css'

function App() {
  return (
    <Layout>
      <CssBaseline />
      <div className="app-container">
        <Home />
        <About />
        <Projects />
        <Models />
        <Contact />
      </div>
      <Analytics />
    </Layout>
  )
}

export default App
