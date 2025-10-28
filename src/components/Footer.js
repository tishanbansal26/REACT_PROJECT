import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            <img src="/CORELINE.png" alt="Coreline Logo" height="70" className="mb-3" />
            <p>
              CORELINE is where style meets comfort. We design premium quality T-shirts
              crafted for confidence, durability, and everyday wear.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-light text-decoration-none">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-warning">Customer</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/cart" className="text-light text-decoration-none">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-light text-decoration-none">
                  Checkout
                </Link>
              </li>
              <li>
                <Link to="#" className="text-light text-decoration-none">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-warning">Get in Touch</h5>
            <p className="mb-1">
              <i className="bi bi-geo-alt-fill text-warning"></i> Opp. More Supermarket, Mansa
              151505
            </p>
            <p className="mb-1">
              <i className="bi bi-telephone-fill text-warning"></i> +91 96036 10000
            </p>
            <p className="mb-1">
              <i className="bi bi-envelope-fill text-warning"></i> support@coreline.com
            </p>
            <div className="mt-2">
              <a href="#" className="text-light me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="bi bi-twitter-x fs-4"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0">&copy; 2025 CORELINE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
