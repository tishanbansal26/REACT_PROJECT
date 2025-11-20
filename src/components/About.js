import React from 'react';

const About = () => {
  const heroImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';
  const storyImage = 'https://images.unsplash.com/photo-1606759615996-aa88304c4b1f?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">About CORELINE</h1>
              <p className="lead mb-4">
                Where style meets comfort. We design premium quality apparel
                crafted for confidence, durability, and everyday wear.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">5K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Unique Designs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src={heroImage}
                alt="Fashion Workshop"
                className="about-hero-image"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/CORELINE.png'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src={storyImage}
                alt="Our Workshop"
                className="about-story-image"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/CORELINE.png'; }}
              />
            </div>
            <div className="col-lg-6">
              <div className="story-content">
                <h2 className="section-title">Our Story</h2>
                <p className="mb-4">
                  Founded with a passion for fashion and quality, CORELINE has been serving
                  customers with the finest collection of apparel that combines contemporary
                  design with ultimate comfort.
                </p>
                <p className="mb-4">
                  Our commitment to excellence extends from the careful selection of materials
                  to the precision in our manufacturing process, ensuring that every piece
                  that bears the CORELINE name meets our high standards.
                </p>
                <div className="mission-box">
                  <h3>Our Mission</h3>
                  <p>
                    To provide fashion-forward individuals with high-quality, comfortable, and
                    stylish clothing that makes them feel confident in every moment of their day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-card">
            <h2 className="section-title text-center mb-4">Visit Our Store</h2>
            <div className="contact-info">
              <div className="contact-item">
                <i className="bi bi-geo-alt-fill"></i>
                <p>Opp. More Supermarket, Mansa 151505</p>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <p>+91 96036 10000</p>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <p>support@coreline.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation for upload message */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
