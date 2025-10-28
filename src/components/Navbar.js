import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert('👋 Logged out!');
    } catch (error) {
      alert('Failed to log out');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/CORELINE.png" alt="Coreline" height="70" className="me-2" />
          <span className="fw-bold fs-3 text-warning"></span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                to="/cart"
              >
                Cart ({getCartCount()})
              </Link>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/auth' ? 'active' : ''}`}
                  to="/auth"
                >
                  <b>Login / Signup</b>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
