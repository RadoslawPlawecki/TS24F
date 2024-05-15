import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import { Navigate, Route, Routes } from 'react-router-dom';
import DisplayBooks from './books/DisplayBooks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/books" element={<DisplayBooks />} />
    </Routes>
  );
}

export default App;
