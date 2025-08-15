import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import SchemaSetup from './components/Setup/SchemaSetup';
import DashboardRouter from './components/Dashboard/DashboardRouter';
import LandingPage from './components/Landing/LandingPage';

// Component to handle authenticated routes
function AuthenticatedApp() {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={!currentUser ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/dashboard" />} />
      <Route path="/setup" element={<SchemaSetup />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/"} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AuthenticatedApp />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
