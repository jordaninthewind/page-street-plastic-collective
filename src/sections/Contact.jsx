import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows={4} required />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact; 