import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              {/* Public Route: Auth page (accessible to everyone) */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected Routes: require login */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute
                    element={
                      <>
                        <Navbar />
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/shop" element={<Shop />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          {/* Catch-all for unknown routes */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                        <Footer />
                      </>
                    }
                  />
                }
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
