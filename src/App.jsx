// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserDetail from './components/UserDetail';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser'
import './App.css';

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
