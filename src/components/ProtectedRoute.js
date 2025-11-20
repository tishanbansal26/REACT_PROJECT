import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { currentUser, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  // If logged in, render the component
  return element;
};

export default ProtectedRoute;
