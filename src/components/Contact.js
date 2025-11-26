import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Save contact form to Firebase Firestore
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      setSuccessMessage('✅ Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('❌ Error sending message. Please try again later.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Send us your thoughts, questions, or feedback!</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form-card">
              <h2 className="form-title">Send us a Message</h2>

              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccessMessage('')}
                  ></button>
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {errorMessage}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setErrorMessage('')}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 (123) 456-7890"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="order">Order Related</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    '✉️ Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="col-lg-4">
            {/* Address Card */}
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h4>Address</h4>
              <p>Opp. More Supermarket<br />Mansa 151505<br />Punjab, India</p>
            </div>

            {/* Phone Card */}
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <h4>Phone</h4>
              <p>
                <a href="tel:+919603610000">+91 96036 10000</a><br />
                <a href="tel:+919646716000">+91 96467 16000</a><br />
                <small>Mon - Sat, 10am - 6pm</small>
              </p>
            </div>

            {/* Email Card */}
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <h4>Email</h4>
              <p>
                <a href="mailto:support@coreline.com">support@coreline.com</a><br />
                <small>We reply within 24 hours</small>
              </p>
            </div>

            {/* Social Links Card */}
            <div className="info-card social-card">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="info-banner">
              <h5>⏱️ Quick Response Time</h5>
              <p>We value your time! Our team responds to all inquiries within 24 hours. For urgent matters, please call us directly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
