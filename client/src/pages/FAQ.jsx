import { useState, useEffect } from 'react'
import './FAQ.css'
import Spinner from '../components/Spinner'

const FAQ = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // FAQ data will be fetched from API in the contact/FAQ implementation phase
    // For now, using placeholder data
    const placeholderFAQs = [
      {
        id: 1,
        question: "What is LEO Satellite Hub?",
        answer: "LEO Satellite Hub is an affordable space research platform designed specifically for educational institutions to conduct meaningful space research without traditional barriers."
      },
      {
        id: 2,
        question: "How much does it cost?",
        answer: "Our pricing is designed to be affordable for educational institutions. Contact us for specific pricing based on your institution's needs and requirements."
      },
      {
        id: 3,
        question: "What technical expertise is required?",
        answer: "While some technical knowledge is helpful, our platform is designed to be accessible to educators and students with varying levels of technical background."
      },
      {
        id: 4,
        question: "How long does setup take?",
        answer: "Setup time varies depending on your specific requirements and the complexity of your research goals. Our team will work with you to ensure a smooth implementation."
      },
      {
        id: 5,
        question: "What kind of research can we conduct?",
        answer: "Our modular platform supports various types of space research including atmospheric studies, communication experiments, sensor data collection, and more."
      }
    ]
    
    setFaqs(placeholderFAQs)
    setLoading(false)
  }, [])

  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  if (loading) {
    return (
      <div className="faq-page">
        <div className="container">
          <div className="faq-loading">
            <Spinner size="lg" />
            <p>Loading FAQs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="faq-page">
      <div className="container">
        <header className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about LEO Satellite Hub
          </p>
        </header>
        
        <section className="faq-content">
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle">
                    {openFAQ === faq.id ? '−' : '+'}
                  </span>
                </button>
                
                {openFAQ === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <section className="faq-contact">
          <h2>Still Have Questions?</h2>
          <p>
            If you don't see your question answered here, please don't hesitate 
            to contact us directly. We're here to help!
          </p>
          <a href="/contact" className="faq-contact-link">
            Contact Us
          </a>
        </section>
      </div>
    </div>
  )
}

export default FAQ
