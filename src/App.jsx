import { useState } from 'react'

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './components/Dashboard';
import BinarySearchVisualizer from './components/visualizer/BinarySearchVisualizer';
import SearchHistory from './components/history/SearchHistory';
import SavedArrays from './components/arrays/SavedArrays';


function App() {
  return (
     <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/visualizer" element={<BinarySearchVisualizer />} />
          <Route path="/history" element={<SearchHistory />} />
          <Route path="/arrays" element={<SavedArrays />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
