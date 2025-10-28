import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>

          <div className="mt-5 text-center">
            <h4>Get in Touch</h4>
            <p>
              <i className="bi bi-geo-alt-fill text-warning"></i> Opp. More Supermarket, Mansa 151505<br />
              <i className="bi bi-telephone-fill text-warning"></i> +91 96036 10000<br />
              <i className="bi bi-envelope-fill text-warning"></i> support@coreline.com
            </p>
            <div className="mt-3">
              <a href="#" className="text-dark me-3"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-dark me-3"><i className="bi bi-instagram fs-4"></i></a>
              <a href="#" className="text-dark me-3"><i className="bi bi-twitter-x fs-4"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
