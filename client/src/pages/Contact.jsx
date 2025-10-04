import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission will be implemented with axios integration in the contact/FAQ implementation phase
    console.log('Form submitted:', formData)
  }

  return (
    <div className="contact-page">
      <div className="container">
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Get in touch with our team for questions about LEO Satellite Hub
          </p>
        </header>
        
        <div className="contact-content">
          <section className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Institution/Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </section>
          
          <section className="contact-info-section">
            <h2>Get in Touch</h2>
            <div>
              <div className="contact-item">
                <h3>Email</h3>
                <p>info@leosatellithub.com</p>
              </div>
              
              <div className="contact-item">
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
              </div>
              
              <div className="contact-item">
                <h3>Address</h3>
                <p>
                  123 Space Avenue<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact
