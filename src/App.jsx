import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <div className="app-container">
        {/* Home Section */}
        <section id="home" className="hero-section">
          <h1>Welcome to Page Street Plastic Collective</h1>
          <p>Your partner in sustainable plastic solutions</p>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <h2>About Us</h2>
          <p>
            Page Street Plastic Collective is dedicated to reducing plastic waste and promoting sustainable practices in our community. Our mission is to educate, innovate, and collaborate for a cleaner future.
          </p>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <h2>Our Services</h2>
          <ul>
            <li>Community plastic recycling programs</li>
            <li>Workshops and educational events</li>
            <li>Consulting for sustainable packaging</li>
            <li>Collaborative art and upcycling projects</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows={4} required />
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>
    </Layout>
  )
}

export default App
