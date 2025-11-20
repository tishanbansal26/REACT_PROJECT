import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);

      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }

      // Success message
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Navigation happens automatically via useEffect
    } catch (error) {
      // Firebase error handling
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please log in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #f1c40f 0%, #ffc107 100%)', padding: '2rem', textAlign: 'center' }}>
                <img src="/CORELINE.png" alt="Coreline" height="80" style={{ marginBottom: '1rem' }} />
                <h2 style={{ color: '#000', margin: '0', fontWeight: 'bold' }}>
                  {isLogin ? 'Welcome Back' : 'Join CORELINE'}
                </h2>
                <p style={{ color: '#333', margin: '0.5rem 0 0 0' }}>
                  {isLogin ? 'Log in to your account' : 'Create your account'}
                </p>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger" role="alert" style={{ borderRadius: '8px' }}>
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      <i className="bi bi-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      style={{ borderRadius: '8px', padding: '0.75rem' }}
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                      <i className="bi bi-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      style={{ borderRadius: '8px', padding: '0.75rem' }}
                      disabled={loading}
                    />
                    {!isLogin && (
                      <small className="text-muted">At least 6 characters</small>
                    )}
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label fw-bold">
                        <i className="bi bi-lock me-2"></i>Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        style={{ borderRadius: '8px', padding: '0.75rem' }}
                        disabled={loading}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn w-100 fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #f1c40f 0%, #ffc107 100%)',
                      color: '#000',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      transition: 'transform 0.2s ease'
                    }}
                    disabled={loading}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {isLogin ? 'Logging in...' : 'Creating account...'}
                      </>
                    ) : (
                      isLogin ? 'Login' : 'Sign Up'
                    )}
                  </button>
                </form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="text-muted mb-0">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  </p>
                  <button
                    className="btn btn-link fw-bold p-0"
                    style={{ color: '#f1c40f', textDecoration: 'none', fontSize: '1.05rem' }}
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                      setEmail('');
                      setPassword('');
                      setConfirmPassword('');
                    }}
                    disabled={loading}
                  >
                    {isLogin ? 'Create Account' : 'Log In Here'}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div style={{ background: '#f8f9fa', padding: '1rem', textAlign: 'center', borderTop: '1px solid #ddd' }}>
                <small className="text-muted">
                  <i className="bi bi-shield-check me-2"></i>Your data is secure with Firebase
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
